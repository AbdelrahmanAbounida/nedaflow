from nedaflow.flow.types import DependencyType
from nedaflow.flow.nodes.io.io import Input, Output
from pydantic import BaseModel , ConfigDict,VERSION as PYDANTIC_VERSION
from abc import abstractmethod, ABC 
from typing import Optional, Any
from uuid import UUID
from dataclasses import dataclass
from enum import Enum 

# TODO:: think about how to store it in the database 


class VertexState(Enum):
    PENDING = "PENDING"
    RUNNING = "RUNNING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"
    CANCELLED = "CANCELLED"
    SKIPPED = "SKIPPED"


class BaseNode(ABC,BaseModel): # BaseModel
    """Abstract class for any flow Node

    Node refers to any tool/Node u need in your AI flow 
    ex: prompt, input message, search tool, api call, agent,....
    """
    name: Optional[str] = None
    "Name of the Node"

    display_name: str | None = None
    """The display name of the Node. Defaults to None."""
    
    description: Optional[str]  = None
    "Description of the Node"

    icon: str | None = None
    "The icon of the Node. It should be an emoji or svg image"

    # TODO:: change type str to fixed enum
    type: Optional[str] = None
    "The type of the Node. like trigger, ai , webhook, tool ..."

    # Mainly this is what we need 
    inputs: list[Input] = [] 
    """ List of inputs for the Node"""

    outputs: list[Output] = []
    """ List of outputs from the Node"""

    options: list[Any] = []
    "List of options for the Node >> Node Settings"

    is_stream: Optional[bool] = False 
    """Decide if the Node is a stream such in case of chat"""

    dependencies: list[DependencyType] = []
    "List of dependencies for the Node, ex LLM for chain"

    is_dep: bool = False
    "Decide if the Node is a dependency or not"

    beta: Optional[bool] = False
    "Decide if the Node is beta or not"

    code: Optional[str]  = None
    "Code that represents the Node"

    if int(PYDANTIC_VERSION.split(".")[0]) >= 2:
        model_config = {"extra": "allow"}

    # model_config = ConfigDict(
    #     ignored_types=(
    #         Optional,
    #         str,  
    #     )
    # )

    # TODO:: check those fields 
    # user_id: Optional[UUID|str] = Field(description="The id of the Node owner if exist",default=None)
    # base_classes: list[str] 
    # documentation: Optional[str] = None 
    # edited: Optional[bool] = False 
    # frozen: Optional[bool] = False
    # pinned: Optional[bool] = False 
    # tool_mode: Optional[bool] = False
    # template: dict  # Check how to define this type and why we will need it 

    # TODO:: Think how to prettify inputs and outputs 
    def to_dict(self):
        return self.model_dump()

    
    # TODO:: make it abstract
    def execute():
        """Main execute function for the Node"""   
        # raise NotImplementedError("execute function is not implemented")