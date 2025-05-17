from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum


class BaseTool(BaseNode):
    type: ComponentTypeEnum = ComponentTypeEnum.TOOL