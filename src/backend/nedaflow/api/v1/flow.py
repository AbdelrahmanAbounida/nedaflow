from nedaflow.flow.types import WorkflowEvents
from nedaflow.schema import BuildWorkflow, WorkflowBuildResponse
from nedaflow.flow.utils import  get_class_instance_by_name
from nedaflow.flow import Vertex, Edge, WorkflowEngine
from nedaflow.api.deps import TaskQueueServiceDep
from fastapi.responses import StreamingResponse
from nedaflow.schema import Input, Output
from fastapi import APIRouter , Path
from typing import Annotated
from loguru import logger
import json 
import asyncio


router = APIRouter(prefix="/flow", tags=["Flow"])


@router.post("/build", response_model=WorkflowBuildResponse)
async def build_flow( body: BuildWorkflow,
                     task_queue_service: TaskQueueServiceDep
                     ):
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
    # TODO:: how to get specific node type , import its class and feed it to vertex
    # So lateron u can call execute , trigger or other methods on it 

    # TODO:: use Model Registery instead of dynamic importlib
    # vertexes = [Vertex(**vertex.model_dump(), workflow=flow_execution_engine) for vertex in body.vertexes]
    vertexes: list[Vertex] = []
    for vertex in body.vertexes:
        data = vertex.data.component
        node_instance = get_class_instance_by_name(data.class_name, data.category)
        node = node_instance.model_validate(data.model_dump()) # class_name and category should be removed 
        vertexes.append(Vertex(**vertex.model_dump(), node=node, workflow=flow_execution_engine))
    
    logger.warning(f"vertexes: {[vertex.node.name for vertex in vertexes]}")
    edges = [Edge(**edge.model_dump(), workflow=flow_execution_engine) for edge in body.edges]

    # define node input and output edges 
    for vertex in vertexes[:]:
        vertex.inputs = [edge for edge in edges if edge.target_id == vertex.id]
        vertex.outputs = [edge for edge in edges if edge.source_id == vertex.id]

        # if vertex has no edges connected in or out remove it 
        if not vertex.inputs and not vertex.outputs:
            logger.warning(f"Vertex {vertex.node.name} has no edges connected in or out")
            vertexes.remove(vertex)

    flow_execution_engine.add_vertexes(vertexes)
    flow_execution_engine.add_edges(edges)

    execution_id  = await flow_execution_engine.run_workflow(input_data={}) # Start building the flow  

    # How to use the workflow task_queue to stream the results (building status per vertex)
    # Later the flow could have chat 

    return WorkflowBuildResponse(execution_id=execution_id)


# Fixed server-side streaming code
from fastapi import Path
from fastapi.responses import StreamingResponse
import json
import asyncio
from typing import Annotated

@router.get("/build/stream/{execution_id}")
async def stream_flow(execution_id: Annotated[str, Path(title="Execution ID")], task_queue_service: TaskQueueServiceDep):
    logger.warning("Stream route HIT ✅")
    
    # Add proper headers for SSE
    headers = {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*",  # Adjust as needed for CORS
    }
    
    return StreamingResponse(
        event_generator(task_queue_service, execution_id),
        media_type="text/event-stream",
        headers=headers
    )

async def event_generator(task_queue_service: TaskQueueServiceDep, execution_id: str):
    queue = task_queue_service.get_task_queue(execution_id)
    print(f"queue: {queue}")
    
    try:
        while True:
            try:
                # Add timeout to prevent hanging
                event = await asyncio.wait_for(queue.get_event(), timeout=30.0)
                logger.debug(f"**************** event: {event}")
                
                if not event or event.get("type") == "workflow_completed":
                    logger.warning("Heyyyyyyyyy ✅ End of stream")
                    # Send completion event
                    yield f"{json.dumps({'type': 'stream_completed'})}\n\n"
                    break

                # Ensure proper formatting with double newline
                event_data = json.dumps(event)
                yield f"{event_data}\n\n"
                
                # Optional: Add small delay to prevent overwhelming the client
                # await asyncio.sleep(0.01)
                
            except asyncio.TimeoutError:
                # Send heartbeat to keep connection alive
                yield f"data: {json.dumps({'type': 'heartbeat'})}\n\n"
                continue
                
    except Exception as e:
        logger.error(f"Error in event generator: {e}")
        # Send error event
        yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"
    finally:
        logger.info("Event generator finished")

# Remove the custom StreamingFlowResponse class - use FastAPI's built-in StreamingResponse
# TODO:: clear the queue once done 
# TODO:: design schema to contain info about building progress / stream response
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