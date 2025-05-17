from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum


class BaseLogicNode(BaseNode):
    type: ComponentTypeEnum = ComponentTypeEnum.LOGIC