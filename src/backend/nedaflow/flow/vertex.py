from abc import ABC, abstractmethod
from nedaflow.schema import VertexPosition
from nedaflow.flow.nodes.base import BaseNode, VertexState
from nedaflow.flow.edge  import Edge
from typing import Optional, Self
from loguru import logger 
import asyncio
import random

class Vertex:
    """
    This is the Main Flow node (just call it vertex to differentiate with our main nodes)
    
    Vertex >> is the actual node that u are using in the frontend which has name, id, .. 
    Node >> is the main component data inside the vertex which contain information like the node params, execute function ,..
    """
    def __init__(self, *,
                #  position: Optional[VertexPosition] = None,
                 name: Optional[str] = None,
                 data: BaseNode,
                 id:Optional[str]=None,
                 type: Optional[str]=None,
                  params: Optional[dict] = None ,
                  **kwargs) -> None:
        self.id = id 
        self.data = data
        self.type = type
        self.params = params
        self.error_message: str = None

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
        logger.success(f"Building Vertex: {self.id}")
        ...
        # TODO:: use the self.data function and execute it using the input edges data  

    def to_dict(self):
        return {
            "id": self.id,
            "data": self.data.to_dict(),
            "type": self.type
        }

    def add_input_vertex(self, vertex: Self):
        self._input_vertexes.add(vertex)

    def add_output_vertex(self, vertex: Self):
        self._output_vertexes.add(vertex)
    
