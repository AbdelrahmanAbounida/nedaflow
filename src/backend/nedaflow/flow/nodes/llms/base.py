from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum
from abc import abstractmethod, ABC
from nedaflow.flow.nodes.io.io import Output, Input, Input

class BaseLLM(BaseNode, ABC):
    """
    Base class for all LLMs
    """
    type: ComponentTypeEnum = ComponentTypeEnum.LLM
    is_dep: bool = True 
    options: list = [] # TODO:: add custom options types per llms 
    is_dep: bool = True
    inputs: list[Input]= [
    ]
    outputs: list = [
    ]
    # @abstractmethod
    # def run(self):
    #     pass 
