from nedaflow.utils.directory_reader import fetch_native_langflow_nodes
from fastapi.routing import APIRouter


router = APIRouter(tags=["FlowComponent"],prefix="/component")



@router.get("/all-types", description="get list of current provided components + the custom components the user created")
async def get_all_flow_nodes_types():
    """
        TODO::
            - Loop throught the components folder files read each folder as category and each file as a component 
            - DirectoryReader Class for that 
            - 
    """ 
    all_components = fetch_native_langflow_nodes()
    return all_components
