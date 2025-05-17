from nedaflow.flow.nodes.base import BaseNode, ComponentTypeEnum

class BaseVectorStoreNode(BaseNode):
    type: ComponentTypeEnum = ComponentTypeEnum.VECTOR_STORE