from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum

class BaseEmbeddingNode(BaseNode):
    type: ComponentTypeEnum = ComponentTypeEnum.EMBEDDING