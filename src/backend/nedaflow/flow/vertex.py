from functools import cached_property
from nedaflow.schema import VertexPosition
from nedaflow.flow.nodes.base import BaseNode, VertexState
from nedaflow.services.events.managers.workflow import WorkflowEvents
from nedaflow.flow.edge  import Edge
from typing import Optional, Self, TYPE_CHECKING
from loguru import logger 
import asyncio
import random


if TYPE_CHECKING:
    from nedaflow.flow.workflow import WorkflowEngine

class Vertex:
    """
    This is the Main Flow node (just call it vertex to differentiate with our main nodes)
    
    Vertex >> is the actual node that u are using in the frontend which has name, id, .. 
    Node >> is the main component data inside the vertex which contain information like the node params, execute function ,..
    """
    def __init__(self, *,
                #  position: Optional[VertexPosition] = None,
                workflow: "WorkflowEngine",
                name: Optional[str] = None,
                position: VertexPosition,
                data: BaseNode, # TODO:: See how to validate with node coming from ui
                id:Optional[str]=None,
                type: Optional[str]=None,
                params: Optional[dict] = None ,
                **kwargs) -> None:
        self.id = id 
        self.data = data
        self.type = type
        self.params = params
        self.error_message: str = None
        self.workflow = workflow

        # Building Context 
        self._is_built = False
        self.state = VertexState.PENDING
        self.execution_time: float = None

        # Lets focus on edges not vertexes
        # self._input_vertexes: set[Vertex] = set()
        # self._output_vertexes: set[Vertex] = set()
        self._input_edges: set[Edge] = set()
        self._output_edges : set[Edge] = set()

    @property
    def inputs(self):
        return self._input_edges
    
    @property
    def outputs(self):
        return self._output_edges
    
    @inputs.setter
    def inputs(self, edge:Edge):
        self._input_edges.add(edge)

    @outputs.setter
    def outputs(self,  edge:Edge):
        self._output_edges.add(edge)

    async def build(self, *args, **kwargs):
        await asyncio.sleep(random.randint(1,3))
        logger.success(f"Building Vertex: {self.id}  {self.execution_time}")
        self.workflow.event_manager.emit(WorkflowEvents.VERTEX_BUILT, vertex=self, task_queue_service=self.workflow.task_queue_service) # TODO:: has enum for events 
        
        # TODO:: See how to execute as data for now is dict not node
        # res = await self.data.execute(*args, **kwargs) # TODO:: How to pass the params, settings 
        res = {"vertex_id": self.id}
        for edge in self._output_edges:
            edge.data = res # TODO:: check how this res whould be passed in case of llm , stream, ...

    def to_dict(self):
        return {
            "id": self.id,
            "data": self.data.to_dict(),
            "type": self.type
        }
    
    @cached_property
    def successors(self) -> list[Self]:
        out_edges = self._output_edges
        out_vertexes = []
        for edge in out_edges:
            vertex_id = edge.target_id
            if v := self.workflow.get_vertex(vertex_id):
                out_vertexes.append(v)
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
        return all([edge.data for edge in self._input_edges])

    def add_input_edges(self, edges: list[Edge]):
        for edge in edges:
            self._input_edges.add(edge)

    def add_output_edges(self, edges: list[Edge]):
        for edge in edges:
            self._output_edges.add(edge)