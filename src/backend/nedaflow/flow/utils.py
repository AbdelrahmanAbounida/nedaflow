from nedaflow.flow.nodes.base import BaseNode, NodeRegisteryItem
from functools import lru_cache


NODES_REGISTRY = {}

@lru_cache
def get_all_nedaflow_nodes() -> dict[str,list[NodeRegisteryItem]]:
    """ Load all nodes in a registery """
    global NODES_REGISTRY
    all_nodes = BaseNode.nodes_registry
    return all_nodes