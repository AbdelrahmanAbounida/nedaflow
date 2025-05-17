# TODO:: define schemas here 
from nedaflow.flow.nodes.base import BaseNode
from pydantic import BaseModel 
from typing import Optional, Any


# Base Sidebar entity 
class NedaFlowSidebarEntity(BaseModel):
    name: str 
    icon: str 


class VertexPosition(BaseModel):
    x: float
    y: float


class VertexData(BaseModel):
    id: str 
    showNode: bool
    component: BaseNode
    
class VertexProps(BaseModel):
    type: Optional[str] = None
    position: VertexPosition
    id: str 
    name: Optional[str] = None
    data: VertexData # should be Node interface 

class EdgeProps(BaseModel):
    id: str
    source: str
    target: str


class BuildWorkflow(BaseModel):
    flow_id: str 
    name: Optional[str] = None 
    vertexes: list[VertexProps]
    edges: list[EdgeProps]


class WorkflowBuildResponse(BaseModel):
    execution_id: str 
    