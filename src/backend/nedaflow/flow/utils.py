from nedaflow.flow.nodes.base import BaseNode, NodeRegisteryItem
from nedaflow.schema import UINode
from functools import lru_cache


NODES_REGISTRY = {}

@lru_cache
def get_all_nedaflow_nodes() -> dict[str,list[NodeRegisteryItem]]:
    """ Load all nodes in a registery """
    global NODES_REGISTRY
    if NODES_REGISTRY:
        return NODES_REGISTRY
    NODES_REGISTRY = BaseNode.nodes_registry
    return NODES_REGISTRY


@lru_cache
def get_class_instance_by_name(class_name:str, category: str) -> BaseNode | None:
    global NODES_REGISTRY
    if not  NODES_REGISTRY:
        NODES_REGISTRY = get_all_nedaflow_nodes()
    
    if category not in NODES_REGISTRY:
        return None
    for node in NODES_REGISTRY[category]:
        if node.instance_name == class_name:
            return node.instance
    return None


# def get_backend_node_by_name(class_name:str, category: str, data: UINode) -> BaseNode | None:
#     """Create Backend Node instance using data got from ui node 

#     both class_name and category will be used to search node registery and get the accompanying node class
#     Args:
#         class_name (str): BaseClass of the UI Node 
#         category (str): category of the UI node
#         data (UINode): ui node data
#     """
#     global NODES_REGISTRY
#     if not  NODES_REGISTRY:
#         NODES_REGISTRY = get_all_nedaflow_nodes()
    
#     if category not in NODES_REGISTRY:
#         return None
#     for node in NODES_REGISTRY[category]:
#         if node.instance_name == class_name:
#             node: BaseNode = node.instance(**data.model_dump())
#             node.inputs = [ Inputs]
#     return None