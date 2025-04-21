from pydantic import BaseModel
from typing import Any 

class Edge:
    """Represents a connection between two nodes"""

    # TOODO:: update to match reactflow 

    def __init__(self,id:str, source: str, target: str) -> None:
        self.data  = None # this will hold the data after building process are done 
        self.id = id
        self.source_id = source
        self.target_id = target
        self.data: Any = None # this will hold the data after building process of the connected source Noode are done
    
    def __repr__(self) -> str:
        return f"Edge(source_id={self.source_id}, target_id={self.target_id})"
    
    @property
    def is_ready(self) -> bool:
        return self.data is not None
    
    def to_dict(self):
        return {
            "source_id": self.source_id,
            "target_id": self.target_id
        }
    