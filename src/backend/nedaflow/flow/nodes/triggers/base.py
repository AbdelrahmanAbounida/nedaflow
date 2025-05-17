from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum
from abc import abstractmethod, ABC

class BaseTriggerNode(BaseNode):
    type: ComponentTypeEnum = ComponentTypeEnum.TRIGGER

    # @abstractmethod
    def trigger(self):
        """ Main Trigger Medthod that will be called as webhook"""
        # 1- check Trigger Type (private or public)
        # 2- check auth for private trigger
        # 3- 
        raise NotImplementedError