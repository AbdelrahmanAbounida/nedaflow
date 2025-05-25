from pydantic import BaseModel
from typing import Any , TYPE_CHECKING
from functools import cached_property
if TYPE_CHECKING:
    from nedaflow.flow.workflow import WorkflowEngine

class Edge:
    """Represents a connection between two nodes"""

    # TOODO:: update to match reactflow 

    def __init__(self,id:str, source: str, target: str,workflow: "WorkflowEngine", data: Any=None) -> None:
        self.id = id
        self.source_id = source
        self.target_id = target
        self.data: Any = None # this will hold the data after building process of the connected source Noode are done
        self.workflow = workflow
    
    def __repr__(self) -> str:
        return f"Edge(source_id={self.source_id}, target_id={self.target_id})"
    
    @property
    def is_ready(self) -> bool:
        return self.data is not None

    @cached_property
    def source_vertex(self):
        return self.workflow.get_vertex(self.source_id)

    @cached_property
    def target_vertex(self):
        return self.workflow.get_vertex(self.target_id)
    
    def to_dict(self):
        return {
            "id": self.id,
            "source_id": self.source_id,
            "target_id": self.target_id,
            "data": self.data
        }
    