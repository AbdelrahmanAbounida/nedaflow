# TODO:: define schemas here 
from pydantic import BaseModel 
from typing import Optional, Any


# Base Sidebar entity 
class NedaFlowSidebarEntity(BaseModel):
    name: str 
    icon: str 


class VertexPosition(BaseModel):
    x: int
    y: int

class VertexProps(BaseModel):
    type: Optional[str] = None
    position: VertexPosition
    id: str 
    name: Optional[str] = None
    data: Any

class EdgeProps(BaseModel):
    id: str
    source_id: str
    target_id: str


class BuildWorkflow(BaseModel):
    flow_id: str 
    name: Optional[str] = None 
    vertexes: list[VertexProps]
    edges: list[EdgeProps]
