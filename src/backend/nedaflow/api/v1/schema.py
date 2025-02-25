# TODO:: define schemas here 
from pydantic import BaseModel 


# Base Sidebar entity 
class NedaFlowSidebarEntity(BaseModel):
    name: str 
    icon: str 