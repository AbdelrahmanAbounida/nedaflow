from fastapi.routing import APIRouter 


router = APIRouter(prefix="/flow", tags=["Flow"])


@router.post("/build")
async def build_flow(self):
    """
        TODO::
            - Build the flow
            take the data as nodes and edges and here we will build the flow
            retur the result first as regular json and then stream it and then start using 
            task queue 
    """
    pass 
