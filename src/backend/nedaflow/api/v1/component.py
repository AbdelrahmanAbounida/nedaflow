from nedaflow.flow.utils import get_all_nedaflow_nodes
from fastapi.routing import APIRouter


router = APIRouter(tags=["FlowComponent"],prefix="/component")



@router.get("/all-types", description="get list of current provided components + the custom components the user created")
async def get_all_flow_nodes_types():
    """
        TODO::
            - Schema definintion 
    """ 
    # all_components[category_name].append(instance.to_dict() | {"code": get_file_content(file_path)})
    all_components = {}

    all_nedaflow_nodes = get_all_nedaflow_nodes()
    # change from dict[str, NodeRegisteryItem] to dict[str, list[BaseNode]]

    for category, nodes in all_nedaflow_nodes.items():
        all_components[category] = [node.instance().model_dump() | {"class_name": node.instance_name} | {"category": category} for node in nodes]
    return all_components


