from functools import cached_property
from nedaflow.schema import VertexPosition
from nedaflow.flow.nodes.base import BaseNode, VertexState
from nedaflow.flow.types import WorkflowEvents, QueueServiceEvent
from typing import Optional, Self, TYPE_CHECKING, Any
from nedaflow.flow.edge  import Edge
from loguru import logger 
import asyncio
import random
from asyncio import iscoroutinefunction


if TYPE_CHECKING:
    from nedaflow.flow.workflow import WorkflowEngine

class Vertex:
    """
    This is the Main Flow node (just call it vertex to differentiate with our main nodes)
    
    Vertex >> is the actual node that u are using in the frontend which has name, id, .. 
    Node >> is the main component data inside the vertex which contain information like the node params, execute function ,..

    so in abstract Vertex is a wrapper around the node or u can say it is an engine to do more operations on the node
    
    """
    def __init__(self, *,
                #  position: Optional[VertexPosition] = None,
                workflow: "WorkflowEngine",
                name: Optional[str] = None,
                position: VertexPosition,
                node: BaseNode, # TODO:: See how to validate with node coming from ui
                id:Optional[str]=None,
                type: Optional[str]=None,
                params: Optional[dict] = None ,
                **kwargs) -> None:
        self.id = id 
        self.node = node # exeact node interface that we use in the backend 
        self.type = type
        self.params = params
        self.error_message: str = None
        self.workflow = workflow

        # Building Context 
        self._is_built = False
        self.state = VertexState.PENDING
        self.execution_time: float = None

        # Lets focus on edges not vertexes
        self._input_edges: list[Edge] = []
        self._output_edges : list[Edge] = []

    @property
    def inputs(self):
        return self._input_edges
    
    @property
    def outputs(self):
        return self._output_edges
    
    @inputs.setter
    def inputs(self, edges:list[Edge]):
        # self._input_edges.append(edge)
        # self._input_edges.update(edges)
        self._input_edges = edges

    @outputs.setter
    def outputs(self,  edges:list[Edge]):
        # self._output_edges.append(edge)
        # self._output_edges.update(edges)
        self._output_edges = edges

    async def build(self, *args, **kwargs):
        await asyncio.sleep(3)

        # 1- Load list of connected dependencies and inputs from other nodes 
        dependencies = self.get_dependencies() 
        inputs = self.get_inputs()
        
        # 2- call node execution 
        node_is_executable = not self.node.is_dep
        res = None 
        # TODO:: try and except 
        if node_is_executable:
            if self.node.execute and iscoroutinefunction(self.node.execute):
                res = await self.node.execute(dependencies,inputs,*args, **kwargs)
            elif self.node.execute:
                res = self.node.execute(dependencies,inputs, *args, **kwargs)
            else:
                logger.warning("No execute function found in the node")
        else:
            if self.node.supply_data and iscoroutinefunction(self.node.supply_data):
                res = await self.node.supply_data(dependencies,inputs,*args, **kwargs)
            elif self.node.supply_data:
                res = self.node.supply_data(dependencies,inputs,*args, **kwargs)
            else:
                logger.warning("No supply_data function found in the node")

        # 3- updated outer edges with the execution result
        logger.warning(f"res: {res}")
        for edge in self._output_edges:
            edge.data = res # TODO:: check how this res would be passed in case of llm , stream, ...
        
        self._is_built = True
        logger.success(f"Vertex built: {self.node.name}")
        await self.workflow.event_manager.emit(WorkflowEvents.VERTEX_BUILT, vertex=self, task_queue_service=self.workflow.task_queue_service) # TODO:: has enum for events 

    def to_dict(self):
        return {
            "id": self.id,
            "data": self.node.to_dict(),
            "type": self.type
        }
    
    def get_dependencies(self) -> dict[str, Any]:
        """ Get the dependencies map of a vertex by its id

        Go through the vertex edges and Load data if the edge source is a dependency
        """
        if not self.workflow._is_prepared:
            raise ValueError("Workflow is not prepared yet. Call prepare_graph() first.")
        
        vertex = self.workflow.get_vertex(self.id)
        dependency_names = [dep.name for dep in vertex.node.dependencies]
        input_edges = vertex.inputs
        dependencies_map = {}
        for edge in input_edges:
            source_vertex = self.workflow.get_vertex(edge.source_id)
            if source_vertex.node.is_dep:
                for dep_name in dependency_names:
                    if dep_name not in dependencies_map:
                        dependencies_map[dep_name] = edge.data
                        break  
        
        return dependencies_map
    
    def get_inputs(self) -> dict[str, Any]:
        """ get list of inputs to a vertex
        
        similar to get_dependencies but for inputs , will load these data from the inputs edges

        """
        if not self.workflow._is_prepared:
            raise ValueError("Workflow is not prepared yet. Call prepare_graph() first.")
        
        # TODO:: name of inputs could be loaded from vertex settings or check if it is dict load it from dict key
        
        vertex = self.workflow.get_vertex(self.id)
        input_names = [inpt.name for inpt in vertex.node.inputs]
        input_edges = vertex.inputs
        inputs_map = {}
        for edge in input_edges:
            source_vertex = self.workflow.get_vertex(edge.source_id)
            if not source_vertex.node.is_dep:
                for inpt_name in input_names:
                    if inpt_name not in inputs_map:
                        inputs_map[inpt_name] = edge.data
                        break
        return inputs_map


    @cached_property
    def successors(self) -> list["Vertex"]:
        out_edges = self._output_edges
        out_vertexes = []
        for edge in out_edges:
            vertex_id = edge.target_id
            if v := self.workflow.get_vertex(vertex_id):
                out_vertexes.append(v)
        
        print(f"out_edges: {out_edges}")
        print(f"out_vertexes: {out_vertexes}")
        return out_vertexes

    @cached_property
    def predecessors(self) -> list[Self]:
        in_edges = self._input_edges
        in_vertexes = []
        for edge in in_edges:
            vertex_id = edge.source_id
            if v := self.workflow.get_vertex(vertex_id):
                in_vertexes.append(v)
        return in_vertexes
    
    def is_ready_for_execution(self) -> bool:
        """
        Check if the vertex is ready for execution which is True if all its input edges are built
        """
        if self._is_built:
            return False 
        # return all([edge.data is not None for edge in self._input_edges])
        for edge in self._input_edges:
            if not edge.source_vertex._is_built:
                return False
        return True

    def add_input_edges(self, edges: list[Edge]):
        for edge in edges:
            self._input_edges.append(edge)

    def add_output_edges(self, edges: list[Edge]):
        for edge in edges:
            self._output_edges.append(edge)