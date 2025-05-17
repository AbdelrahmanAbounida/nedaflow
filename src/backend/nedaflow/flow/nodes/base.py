from nedaflow.flow.types import DependencyType
from nedaflow.flow.nodes.io.io import Input, Output
from pydantic import BaseModel , ConfigDict,VERSION as PYDANTIC_VERSION
from abc import abstractmethod, ABC 
from typing import Optional, Any, Literal, ClassVar
from uuid import UUID
from dataclasses import dataclass
from loguru import logger
from enum import Enum 

# TODO:: think about how to store it in the database 


class VertexState(str, Enum):
    PENDING = "PENDING"
    RUNNING = "RUNNING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"
    CANCELLED = "CANCELLED"
    SKIPPED = "SKIPPED"

class ComponentTypeEnum(str,Enum):
    """ List of Nodes categories 'UI Sidebar'"""
    INPUT = "INPUT"
    OUTPUT = "OUTPUT"
    PROMPT = "PROMPT"
    DATA = "DATA"
    PROCESSING = "PROCESSING"
    LLM = "LLM"
    CHAIN = "CHAIN"
    VECTOR_STORE = "VECTOR_STORE"
    EMBEDDING = "EMBEDDING"
    AGENT = "AGENT"
    MEMORY = "MEMORY"
    TOOL = "TOOL"
    LOGIC = "LOGIC"
    HELPER = "HELPER"
    BUNDLE = "BUNDLE"
    TRIGGER = "TRIGGER"


LibraryType = Literal["Langchain", "LamaIndex", "CrewAI", "Dspy"]



@dataclass
class NodeRegisteryItem:
    instance: "BaseNode"
    instance_name: str 
    category: str

class BaseNode(ABC,BaseModel): # BaseModel
    """Abstract class for any flow Node

    Node refers to any tool/Node u need in your AI flow 
    ex: prompt, input message, search tool, api call, agent,....
    """

    nodes_registry: ClassVar[dict[str,list[NodeRegisteryItem]]] = {} # className , instance 
    """List of all subclasses of BaseNode as a registery """

    name: Optional[str] = None
    "Name of the Node"

    display_name: str | None = None
    """The display name of the Node. Defaults to None."""
    
    description: Optional[str]  = None
    "Description of the Node"

    icon: str | None = None
    "The icon of the Node. It should be an emoji or svg image"

    # TODO:: change type str to fixed enum
    type: Optional[ComponentTypeEnum] = None
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

    library: Optional[LibraryType] = "Langchain"
    """ The main Library used by this Node to design the execute method"""

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


    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        logger.info(f"registering new node {cls.__name__}")
        # cls.nodes_registry.append(cls)
        class_name = cls.__name__ # make sure it is unique 
        category_name = cls.__module__.split(".")[-2]

        if "base" in class_name.lower():
            return

        if category_name in BaseNode.nodes_registry and class_name in BaseNode.nodes_registry[category_name]:
            logger.error(f"Node with name {class_name} already exists in category {category_name}")
            raise ValueError(f"Node with name {class_name} already exists")
        
        if category_name not in BaseNode.nodes_registry:
            BaseNode.nodes_registry[category_name] = []
        BaseNode.nodes_registry[category_name].append(NodeRegisteryItem(instance=cls,instance_name=class_name,category=category_name))
        

    # TODO:: Think how to prettify inputs and outputs 
    def to_dict(self):
        return self.model_dump()
    
    def supply_data(self):
        """ provide the node as input / provider for anthor nodes ex: LLM, Tool,.."""

    def execute(self):
        """Main execution function for the Node in case the node is runnable ex: Chain , Agent,.."""   
        
        # 1- Get input data 

        # 2- Get custom Settings defined from the ui 

        # 3- Check required providers / tools needed to execute the node 

        # 4- return the response

        # Question:: if this is stream response how to handle it / return it for custom node execution