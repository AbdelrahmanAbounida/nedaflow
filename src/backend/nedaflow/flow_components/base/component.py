from nedaflow.flow_components.base.io import Input, Output
from pydantic import BaseModel , ConfigDict
from abc import abstractmethod, ABC 
from typing import Optional
from uuid import UUID
import json 

# TODO:: think about how to store it in the database 

class BaseComponent(ABC,BaseModel): # BaseModel
    """Abstract class for any flow component

    Component refers to any tool/component u need in your AI flow 
    ex: prompt, input message, search tool, api call, agent,....
    """
    name: Optional[str]
    "Name of the component"

    display_name: str | None = None
    """The display name of the component. Defaults to None."""
    
    description: Optional[str] 
    "Description of the component"

    icon: str | None
    "The icon of the component. It should be an emoji or svg image"

    inputs: list[Input] = []
    outputs: list[Output] = []
    beta: Optional[bool] = False
    "Decide if the component is beta or not"

    code: Optional[str] 
    "Code that represents the component"

    # model_config = ConfigDict(
    #     ignored_types=(
    #         Optional,
    #         str,  
    #     )
    # )

    # TODO:: check those fields 
    # user_id: Optional[UUID|str] = Field(description="The id of the component owner if exist",default=None)
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
