from nedaflow.schema import BuildWorkflow, WorkflowBuildResponse
from nedaflow.flow import Vertex, Edge, WorkflowEngine
from nedaflow.api.deps import TaskQueueServiceDep
from fastapi.responses import StreamingResponse
from fastapi import APIRouter , Path
from typing import Annotated
import json 

router = APIRouter(prefix="/flow", tags=["Flow"])


@router.post("/build", response_model=WorkflowBuildResponse)
async def build_flow( body: BuildWorkflow,
                     task_queue_service: TaskQueueServiceDep
                     )  :
    
    """
        TODO::
           1. See How to traverse the flow nodes and edges and build it 
           5. See How to do stream response like redirect to anthor streaming endpoint with job id 
           6. How to implement task queue with redis / celery / pubsub 
           7. when to return in stream and how to verify the flow data 
    """
    # we gonna start with 2 triggers one is chat and one is webhook
    # then add anthor endpoint for chat and test chat 

    # TODO:: use task backend service to build the flow 
    # TODO:: Clean this design 
    # logger.info(body)
    flow_execution_engine = WorkflowEngine(
        flow_id=body.flow_id,
        vertexes=[],
        edges=[],
        task_queue_service=task_queue_service
    )
    data = body.vertexes[0].data.component
    # TODO:: how to get specific node type , import its class and feed it to vertex
    # So lateron u can call execute , trigger or other methods on it 

    # TODO:: use Model Registery instead of dynamic importlib
    vertexes = [Vertex(**vertex.model_dump(), workflow=flow_execution_engine) for vertex in body.vertexes]

    edges = [Edge(**edge.model_dump()) for edge in body.edges]
    flow_execution_engine.add_vertexes(vertexes)
    flow_execution_engine.add_edges(edges)

    execution_id  = await flow_execution_engine.run_workflow(input_data={}) # Start building the flow  

    # How to use the workflow task_queue to stream the results (building status per vertex)
    # Later the flow could have chat 

    return WorkflowBuildResponse(execution_id=execution_id)


@router.get("/stream/{execution_id}")
async def stream_flow(execution_id: Annotated[str, Path(title="Execution ID")], task_queue_service: TaskQueueServiceDep):
    return event_generator(task_queue_service, execution_id)


async def event_generator(task_queue_service:TaskQueueServiceDep, execution_id:str):

    queue = await task_queue_service.get_task_queue(execution_id)
    def _event_generator():
        while True:
            event =  queue.get() # this could be building progress , stream chunk
            if event is None:  # Sentinel for end of stream
                break
            # SSE format: "data: <json>\n\n"
            yield f"data: {json.dumps(event)}\n\n"
     # TODO:: design schema to contain info about building progress / stream response
    return StreamingFlowResponse(_event_generator(), content_type="text/event-stream", )


class StreamingFlowResponse(StreamingResponse):
    pass 

    # Build Status resp 
    # {
    # "event": "node_update",
    

    ## Your output could be 
    # 1- stream (chat case)
    # 2- fixed data (string, dict, ...) could be regular end (remember generally the output will be stick to each vertex)
    # 3- nothing in case of we should send api request , ....


    ## rememebr this is just for building (attaching output data to vertexes) and validating the workflows

    # 1- return execusion id (taskqueue id)
    # 2- add anthor stream endpoint to get the res from the taskqueue (with pubsub service)
    # "data": {
    #     "node_id": "node-1",
    #     "status": "running",
    #     "output": null
    # }
    # }

    ## This info will contain info like building process and if it is a message it will be displayed in the chat interface



# How to map the data from loaded flow payload to Node Type and then path to vertex