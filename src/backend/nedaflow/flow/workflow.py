from nedaflow.services.events.managers.workflow import WorkflowEvents
from nedaflow.flow.nodes.base import VertexState
from nedaflow.flow.vertex import Vertex
from nedaflow.flow.edge import Edge
from nedaflow.schema import BuildWorkflow
import time 
import uuid 
from loguru import logger 
from typing import Any,Optional, Self
from functools import lru_cache, cached_property
import asyncio

from nedaflow.services import BasePubSub, TaskQueueService,BaseEventManager

class WorkflowEngine:
    """Engine for managing and executing workflows"""

    def __init__(self,*,
                 flow_id:str, 
                 vertexes: list[Vertex], 
                 edges: list[Edge],
                 task_queue_service: TaskQueueService,
                 pubsub_service: BasePubSub = None ,
                 event_manager: BaseEventManager[WorkflowEvents]
                 # TODO:: add cache , event emitter, workflow service (crud), event emitter
                 ):

        self.id = flow_id
        self._vertexes = vertexes
        self._edges = edges

        # Execution state
        self._is_prepared = False # check if the flow is perpared like edges assigned to vertexes
        self.is_valid = False
        self.is_running = False
        self.start_execution_time: float = None
        self.end_execution_status: float = None

        # Execution Control 
        self._lock = asyncio.Lock()
        self.cancel_event = asyncio.Event()
        self.running_vertexls = set()
        self.completed_vertexs = set()
        self.failed_vertexs = set()

        # injected Services 
        self.pubsub_service = pubsub_service
        self.task_queue_service = task_queue_service # use flow_id as job_id
        self.event_manager = event_manager

        self._prepare_graph()
        self.task_queue_service.create_task_queue(job_id=self.id, queue_type="asyncio")

        # TODO:: use Workflow service to load the flow data from database 
        # TODO:: use cache service to cache the build data 
        # TODO:: use EventEmitter to emit events at specicfic points like after building is done 
        # TODO:: pubsub service also could be required here to update the building progress as stream 
    

    @property
    def vertexes(self):
        return self._vertexes
    
    @vertexes.setter
    def vertexes(self, vertexes):
        self._vertexes = vertexes

    @property
    def edges(self):
        return self._edges
    
    @edges.setter
    def edges(self, edges):
        self._edges = edges

    @classmethod
    def from_payload(cls,payload: BuildWorkflow) -> Self:
        workflow = cls(flow_id=payload.flow_id,vertexes=[], edges=[])
        vertexes = [Vertex(**vertex.model_dump(), workflow=workflow) for vertex in payload.vertexes]
        edges = [Edge(**edge.model_dump()) for edge in payload.edges]
        workflow.vertexes = vertexes
        workflow.edges = edges
        return workflow
    
    def _prepare_graph(self) -> None:
        """Prepare the graph for execution

        - validate the graph
        - remove dead edges, non-connected vertexes, and add missing edges
        - add edges to nodes where each node will have inputs and output edges
        """
        if self._is_prepared:
            return  
        # update Vertexes with depenedencies
        for edge in self._edges: # Source > Edge > Target
            source_vertex = self.get_vertex(edge.source_id)
            target_vertex = self.get_vertex(edge.target_id)

            if not source_vertex or not target_vertex:
                self._edges.remove(edge)
                continue

            source_vertex.add_output_vertex(target_vertex)
            target_vertex.add_input_vertex(source_vertex)

        self._is_prepared = True 
        
        self.validate()
        self.is_valid = True
    
    @lru_cache
    def get_root_vertexes(self) -> list[Vertex]:
        """ Get List of vertexes that have no input edges"""
        if not self._is_prepared:
            raise ValueError("Workflow is not prepared yet. call prepare_graph() first")
        
        return [vertex for vertex in self._vertexes if not vertex.inputs]
        
    def validate(self):
        """Validate the entire workflow

        1. check that no cyclic dependencies exist
        2. Check that no 2 streams exist (ex in case of chats u cant have 2 chats nodes)
        """
        if self.is_valid:
            return
        
        if not self._is_prepared:
            raise ValueError("Workflow is not prepared yet. call prepare_graph() first")
        # check cycles in the graph 
        if not self.get_root_nodes():
            raise ValueError("Cyclic Workflow is not allowed")

        # check that no 2 streams exist
        streams = ()
        for vertex in self._vertexes:
            if vertex.data.is_stream:
                streams += (vertex.data.name,)
        if len(streams) > 1:
            raise ValueError("Only 1 stream per workflow is allowed")
        
    def execute_node(self):
        pass 

    def _get_execution_order(self) -> list[str]:
        """Calculate the execution order for vertexs, respecting dependencies"""
        dependencies = {vertex.id: set() for vertex in self._vertexes}

        for edge in self._edges:
            if edge.target_id in dependencies:
                dependencies[edge.target_id].add(edge.source_id)

        visited = set()
        temp_marked = set()
        order = []

        def visit(vertex_id):
            if vertex_id in temp_marked:
                raise ValueError(f"Cyclic dependency detected involving vertex {vertex_id}")

            if vertex_id not in visited:
                temp_marked.add(vertex_id)
                for dep in dependencies.get(vertex_id, []):
                    visit(dep)
                temp_marked.remove(vertex_id)
                visited.add(vertex_id)
                order.append(vertex_id)

        for vertex_id in dependencies:
            if vertex_id not in visited:
                visit(vertex_id)

        return list(reversed(order))

    async def run_workflow(self, input_data: Optional[dict[str, dict[str, Any]]] = None) -> dict[str, dict[str, Any]]:
        """Execute a workflow asynchronously
            - first we should clean the workflow vertexs and organize them 
            - go through vertexs and check which one has all input edges are ready with data then build it and update 
            its output edges with data
            - stream the building result as u go 
            - we will be mainly focus on chat for now which has a stream result once all vertexs are built 
            start streaming chat with the user messages 
        """
        if self.is_running:
            raise RuntimeError("Workflow is already running")
        
        # 1- Validate Workflow 
        if not self.is_valid:
            self.validate()
        
        self.is_running = True
        self.execution_id = str(uuid.uuid4())
        start_time = time.time()
        input_data = input_data or {}

        # 2- get first nodes to run (vertexes that have no input edges)
        root_vertexes = self.get_root_vertexes()
        if not root_vertexes:
            raise ValueError("Workflow does not have any vertexes to run")

        # 3- Start Running process using the TaskQueue 
        ## We will be following event driven such that each edge got data from a vertex
        ## it will add a new vertex task to the task queue till all vertexes are done

        if not self.task_queue_service:
            raise ValueError("Workflow does not have a task queue service")

        # TODO:: See how to design Task Queue 
        inital_tasks = [asyncio.create_task(vertex.build()) for vertex in root_vertexes]

        await self.task_queue_service.run(inital_tasks)
        self.is_running = False

        end_time = time.time()
        self.last_execution_time = end_time - start_time

        
        # try:
        #     # Validate workflow
        #     errors = self.validate()
        #     if errors:
        #         error_msg = f"Workflow validation failed: {', '.join(errors)}"
        #         logger.error(f"[{self.id}] {error_msg}")
        #         self.last_execution_status = "failed"
        #         return {}
            
        #     # Reset vertex states
        #     for vertex in self._vertexes:
        #         vertex.state = VertexState.PENDING
        #         vertex.execution_time = 0.0
            
        #     # Get execution order
        #     execution_order = self._get_execution_order()
        #     logger.info(f"[{self.id}] Execution order: {execution_order}")

            
        #     # Execute vertexs in order 
        #     vertex_outputs = {}
            
        #     for vertex_id in execution_order:
        #         vertex = self.get_vertex(vertex_id)

        #         if not vertex:
        #             logger.warning(f"[{self.id}] Vertex {vertex_id} not found in workflow")
        #             continue
                
        #         # Collect inputs for this vertex
        #         vertex_inputs = {}
                
        #         # Include any direct inputs provided
        #         if vertex_id in input_data:
        #             vertex_inputs.update(input_data[vertex_id])
                
        #         # Include inputs from edgeected vertexs
        #         for edge in self._edges:
        #             if edge.target_id == vertex_id:
        #                 source_vertex = self.get_vertex(edge.source_id)
                        
        #                 # Skip if source vertex failed
        #                 if source_vertex.state == VertexState.FAILED:
        #                     source_vertex.state = VertexState.SKIPPED
        #                     source_vertex.error_message = f"Skipped due to failure in upstream vertex {edge.source_id}"
        #                     break
                        
        #                 # Get output value from source vertex
        #                 if edge.source_id in vertex_outputs:
        #                     vertex_inputs[edge.id] = vertex_outputs[edge.source_id]
                
        #         # Skip if vertex was marked to be skipped
        #         if vertex and vertex.state == VertexState.SKIPPED:
        #             continue
                
        #         # Execute the vertex
        #         logger.info(f"[{self.id}] Executing vertex: {vertex_id} ")
        #         outputs = await vertex.build(vertex_inputs, self.id, self.execution_id)
                
        #         # Store outputs
        #         vertex_outputs[vertex_id] = outputs
                
        #         # Stop execution if a vertex failed
        #         if vertex.state == VertexState.FAILED:
        #             logger.error(f"[{self.id}] Workflow execution stopped due to vertex failure: {vertex_id}")
        #             self.last_execution_status = "failed"
        #             return vertex_outputs
            
        #     logger.info(f"[{self.id}] Workflow execution completed successfully")
        #     self.last_execution_status = "completed"
        #     return vertex_outputs
            
        # except Exception as e:
        #     logger.exception(f"[{self.id}] Workflow execution failed")
        #     self.last_execution_status = "failed"
        #     return {}
            
        # finally:
        #     self.is_running = False
        #     self.last_execution_time = time.time() - start_time

    def cancel(self):
        self.is_running = False
        self.cancel_event.set()
    
    def to_dict(self) -> dict[str, Any]:
        """Convert workflow to dictionary for serialization"""
        return {
            "id": self.id,
            "vertexes": {vertex.id: vertex.to_dict() for vertex in self._vertexes},
            "edges": [edge.to_dict() for edge in self._edges],
            "is_running": self.is_running,
            "execution_id": self.execution_id,
            "last_execution_time": self.last_execution_time,
            "last_execution_status": self.last_execution_status
        }

    def get_vertex(self,vertex_id: str) -> Vertex:
        """Get a vertex by its ID"""
        return next(filter(lambda v: v.id == vertex_id, self._vertexes), None)

    def add_vertex(self, vertex: Vertex) -> str:
        """Add a vertex to the workflow"""
        self._vertexes.append(vertex)
        return vertex.id
    
    def remove_vertex(self, vertex_id: str) -> bool:
        """Remove a vertex from the workflow"""
        vertex = self.get_vertex(vertex_id)
        if vertex:
            self._vertexes.remove(vertex)
            return True
        return False
    