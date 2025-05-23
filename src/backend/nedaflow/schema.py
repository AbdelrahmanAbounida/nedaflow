# TODO:: define schemas here 

from nedaflow.flow.nodes.base import Input, Output
from pydantic import BaseModel 
from typing import Optional, Any

class UINode(BaseModel):
    class_name: str # this is extra
    category: str # this is extra 
    name: str
    display_name: str
    description: str
    icon: str
    type: str
    inputs: list[Input]
    outputs: list[Output]
    options: list[str]
    is_stream: bool
    dependencies: list[Any] # This should be enum to use later to validate if dependencies exist 
    is_dep: bool
    beta: bool
    code: str
    library: str
    minimized: bool

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
    component: UINode
    
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
    