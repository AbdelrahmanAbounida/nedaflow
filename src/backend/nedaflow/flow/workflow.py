from nedaflow.services import BasePubSub, TaskQueueService,BaseEventManager
from nedaflow.services.events.managers.workflow import WorkflowEvents
from nedaflow.services.events.managers.workflow import setup_workflow_event_manager
from functools import lru_cache
from nedaflow.flow.vertex import Vertex
from nedaflow.flow.edge import Edge
from nedaflow.schema import BuildWorkflow
from typing import Any,Optional, Self
from loguru import logger 
import asyncio
import time 
import uuid 


# TODO:: Create seperate Execution engine as service that will handle the workflow execution 
# TODO:: Create a workflow service that will handle the workflow crud operations 

class WorkflowEngine:
    """Workflow Execution Engine for managing and executing workflows"""

    def __init__(self,
                *,
                task_queue_service: TaskQueueService,
                vertexes: list[Vertex] = [], 
                edges: list[Edge] = [],
                flow_id:Optional[str]=None, 
                pubsub_service: BasePubSub = None ,
                event_manager: BaseEventManager[WorkflowEvents] = None
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
        self.execution_id = str(uuid.uuid4())
        self._lock = asyncio.Lock()
        self.cancel_event = asyncio.Event()
        self.running_vertexls = set()
        self.completed_vertexs = set()
        self.failed_vertexs = set()

        # injected Services 
        self.pubsub_service = pubsub_service
        self.task_queue_service = task_queue_service # use flow_id as job_id

        self.event_manager = event_manager or setup_workflow_event_manager()

        self._prepare_graph()
        self.task_queue_service.create_task_queue(job_id=self.execution_id, queue_type="asyncio")

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

    # TODO:: stop this till we decouple the execution engine from the workflow
    # @classmethod
    # def from_payload(cls,payload: BuildWorkflow) -> "WorkflowEngine":
    #     workflow = cls(flow_id=payload.flow_id,vertexes=[], edges=[])
    #     workflow.task_queue_service.create_task_queue(job_id=payload.flow_id, queue_type="asyncio")

    #     # TODO:: How to inject services here and prepare flow 
        
    #     vertexes = [Vertex(**vertex.model_dump(), workflow=workflow) for vertex in payload.vertexes]
    #     edges = [Edge(**edge.model_dump()) for edge in payload.edges]
    #     workflow.vertexes = vertexes
    #     workflow.edges = edges
    #     return workflow
    
    def _prepare_graph(self) -> None:
        """Prepare the graph for execution

        - validate the graph
        - remove dead edges, non-connected vertexes, and add missing edges
        - add edges to vertexes where each vertex will have inputs and output edges
        """
        if self._is_prepared:
            return  
        # update Vertexes with depenedencies
        for edge in self._edges: # Source > Edge > Target

            source_vertex = self.get_vertex(edge.source_id)
            target_vertex = self.get_vertex(edge.target_id)

            if not source_vertex or not target_vertex: # not possible :)
                self._edges.remove(edge)
                continue

            source_vertex.add_input_edges([edge])
            target_vertex.add_output_edges([edge])

        # remove vertexes with no edges connected to them
        for vertex in self._vertexes:
            # Remove Vertex with no connection ?? TODO:: do we need this 
            if not vertex.predecessors or not vertex.successors:
                self.remove_vertex(vertex_id=vertex.id)      

        self._is_prepared = True 
        logger.success("Workflow Prepared successfully")

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
        2. Check that no 2 streams exist (ex in case of chats u cant have 2 chats vertexes)
        """
        if self.is_valid:
            logger.info("Workflow is already validated")
            return

        if not self._vertexes or not self._edges:
            logger.warning("Workflow is empty. Skip validation for now")
            return
        
        if not self._is_prepared:
            raise ValueError("Workflow is not prepared yet. call prepare_graph() first")
        # check cycles in the graph 
        if not (v := self._get_execution_order()):
            raise ValueError("Cyclic Workflow is not allowed")

        # check that no 2 streams exist
        streams = ()
        for vertex in self._vertexes:
            if vertex.data.is_stream:
                streams += (vertex.data.name,)
        if len(streams) > 1:
            raise ValueError("Only 1 stream per workflow is allowed")
        
        logger.success("Workflow Validated successfully")

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

    async def run_workflow(self, input_data: Optional[dict[str, dict[str, Any]]] = None) -> str :
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
        start_time = time.time()
        input_data = input_data or {}

        # 2- get first vertexes to run (vertexes that have no input edges)
        root_vertexes = self.get_root_vertexes()
        if not root_vertexes:
            raise ValueError("Workflow does not have any vertexes to run")

        # 3- Start Running process using the TaskQueue 
        ## We will be following event driven such that each edge got data from a vertex
        ## it will add a new vertex task to the task queue till all vertexes are done

        if not self.task_queue_service:
            raise ValueError("Workflow does not have a task queue service")

        # TODO:: See how to design Task Queue  >> pass job_id to vertex 
        # so that it can update the task queue status while working 
        inital_tasks = [asyncio.create_task(vertex.build()) for vertex in root_vertexes]

        await self.task_queue_service.run_tasks(job_id=self.execution_id, tasks=inital_tasks)
        self.is_running = False

        end_time = time.time()
        self.last_execution_time = end_time - start_time
        return self.execution_id # use it to stream building status from the task queue service 
    
        ## TODO:: build simple function to test pubsub, with eventmanager and taskqueue 
        ## use the execution id to return back the res will be vertex by vertex
        ## for ex in case of chat will be chat response streams and so on
        ## remember chat is nothing but a trigger for ex when u click build (this is manuall and no 
        ## chat message provided for that llm chain wont return a message)

      

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
        self.validate()
        return vertex.id
    
    def add_vertexes(self, vertexes: list[Vertex]):
        self._vertexes.extend(vertexes)
        self.validate()
    
    def add_edges(self, edge: Edge):
        self._edges.extend(edge)
        self.validate()
    
    def remove_vertex(self, vertex_id: str) -> bool:
        """Remove a vertex from the workflow"""
        vertex = self.get_vertex(vertex_id)
        if vertex:
            self._vertexes.remove(vertex)
            return True
        return False