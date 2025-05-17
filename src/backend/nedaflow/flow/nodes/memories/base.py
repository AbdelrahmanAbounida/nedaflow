from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum


class BaseMemoryNode(BaseNode):
    type: ComponentTypeEnum = ComponentTypeEnum.MEMORY