from fastapi.routing import APIRouter 
from pydantic import BaseModel
from fastapi import Body
from typing import Annotated, Optional


class Node(BaseModel):
    type: Optional[str] = None
    position: tuple[int,int]
    id: str 
    name: str

class Edge(BaseModel):
    source: str
    target: str


class BuildWorkflow(BaseModel):
    name: str 
    nodes: list[Node]
    edges: list[Edge]



router = APIRouter(prefix="/flow", tags=["Flow"])


@router.post("/build")
async def build_flow( body: BuildWorkflow)  :
    """
        TODO::
           1. See How to traverse the flow nodes and edges and build it 
           5. See How to do stream response like redirect to anthor streaming endpoint with job id 
           6. How to implement task queue with redis / celery / pubsub 
           7. when to return in stream and how to verify the flow data 
    """
    # we gonna start with 2 triggers one is chat and one is webhook
    return body 
