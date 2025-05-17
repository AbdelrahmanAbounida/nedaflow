from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum
from abc import abstractmethod, ABC

class BaseTriggerNode(BaseNode):
    type: ComponentTypeEnum = ComponentTypeEnum.TRIGGER

    # @abstractmethod
    def trigger(self):
        """ Main Trigger Medthod that will be called as webhook"""
        raise NotImplementedError