from nedaflow.flow_nodes.base import BaseNode
from abc import abstractmethod, ABC


class BaseLLM(BaseNode, ABC):
    """
    Base class for all LLMs
    """
    is_dep: bool = True 
    options: list = [] # TODO:: add custom options types per llms 
    inputs: list = [
    ]
    outputs: list = [
    ]
    # @abstractmethod
    # def run(self):
    #     pass 