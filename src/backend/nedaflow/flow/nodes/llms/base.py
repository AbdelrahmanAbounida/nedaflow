from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum
from abc import abstractmethod, ABC


class BaseLLM(BaseNode, ABC):
    """
    Base class for all LLMs
    """
    type: ComponentTypeEnum = ComponentTypeEnum.LLM
    is_dep: bool = True 
    options: list = [] # TODO:: add custom options types per llms 
    is_dep: bool = True
    inputs: list = [
    ]
    outputs: list = [
    ]
    # @abstractmethod
    # def run(self):
    #     pass 