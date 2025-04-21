from nedaflow.flow.workflow import WorkflowEngine
from nedaflow.services.task.service import TaskQueueService
from typing import Annotated
from fastapi import Depends

workflow_engine = None 
task_queue_service = None


def get_task_queue_service():
    global task_queue_service
    if not task_queue_service:
        task_queue_service = TaskQueueService()
    return task_queue_service



# TOOD:: No need to inject it for now as it work per flow >> Later we should decouple it from the running flow
# def get_workflow_engine():
#     global workflow_engine
#     if not workflow_engine:
#         workflow_engine = WorkflowEngine(task_queue_service=task_queue_service)
#     return workflow_engine


# WorkflowEngineDep = Annotated[WorkflowEngine, Depends(get_workflow_engine)]
TaskQueueServiceDep = Annotated[TaskQueueService, Depends(get_task_queue_service)]
