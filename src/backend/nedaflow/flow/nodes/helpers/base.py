from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum


class BaseHelperNode(BaseNode):
    type: ComponentTypeEnum = ComponentTypeEnum.HELPER