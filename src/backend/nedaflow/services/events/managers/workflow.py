from nedaflow.flow.types import WorkflowEvents, QueueServiceEvent
from nedaflow.services.task.service import TaskQueueService
from nedaflow.services.events.main import EventManager
from loguru import logger
from enum import Enum
from typing import TYPE_CHECKING
import asyncio

if TYPE_CHECKING:
    from nedaflow.flow.workflow import WorkflowEngine
    from nedaflow.flow.vertex import Vertex


"""
Workflow event manger for tasks like 
- Vertex Built 
- Vertex Failed
- Workflow Completed
...
"""



async def on_vertex_built(*,vertex: "Vertex", task_queue_service: TaskQueueService, **kwargs) -> None:
    """will call its on successors which depend on it and check if they are ready to be added to the taskqueue"""

    queue = task_queue_service.get_task_queue(vertex.workflow.execution_id)

    logger.success(f" >>>>>>>>>> Vertex {vertex.node.name} built")
    await queue.emit_event({"type": "vertex_built", "vertex": vertex.to_dict()})
    # await queue.emit_event(QueueServiceEvent(type=WorkflowEvents.VERTEX_BUILT, data=vertex.to_dict()))

    logger.warning(f"Vertex {vertex.node.name} built. Calling its successors")
    # check the vertex successors which are ready for execution
    ready_successors = [v for v in vertex.successors if v.is_ready_for_execution()]

    if not ready_successors:
        non_built_workkflow_vertexes = [v for v in vertex.workflow.vertexes if not v._is_built]
        if not non_built_workkflow_vertexes:
            logger.success(">>>>>>>> Workflow completed")
            await queue.emit_event({"type": "workflow_completed", "data": vertex.workflow.to_dict()})
            # await queue.emit_event(QueueServiceEvent(type=WorkflowEvents.WORKFLOW_COMPLETED, data=vertex.workflow.to_dict()))
            return

    for ready_successor in ready_successors:
        await task_queue_service.run_tasks(vertex.workflow.execution_id, [ready_successor.build()])

def on_vertex_failed(*,vertex: "Vertex", task_queue_service: TaskQueueService) -> None:
    logger.error(f"Vertex {vertex.id} failed")

def on_workflow_completed(*,workflow: "WorkflowEngine") -> None:
    logger.info("Workflow completed")

def setup_workflow_event_manager() -> EventManager[WorkflowEvents]:
    event_manager = EventManager[WorkflowEvents]()
    event_manager.on(WorkflowEvents.VERTEX_BUILT, on_vertex_built)
    event_manager.on(WorkflowEvents.VERTEX_FAILED, on_vertex_failed)
    event_manager.on(WorkflowEvents.WORKFLOW_COMPLETED, on_workflow_completed)
    return event_manager

