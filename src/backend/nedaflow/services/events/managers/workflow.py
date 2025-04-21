from nedaflow.services.task.service import TaskQueueService
from nedaflow.services.events.main import EventManager
from loguru import logger
from enum import Enum
from typing import TYPE_CHECKING

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

class WorkflowEvents(str,Enum):
    VERTEX_BUILT = "vertex_built"
    VERTEX_FAILED = "vertex_failed"
    WORKFLOW_COMPLETED = "workflow_completed"


def on_vertex_built(*,vertex: "Vertex", task_queue_service: TaskQueueService, **kwargs) -> None:
    """will call its on successors which depend on it and check if they are ready to be added to the taskqueue"""
    
    # check the vertex successors which are ready for execution
    ready_successors = [v for v in vertex.successors if v.is_ready_for_execution() ]

    for ready_successor in ready_successors:
        task_queue_service.add_task(ready_successor.workflow.id, ready_successor.build()) # TODO::: see how to pass data to build if needed


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

