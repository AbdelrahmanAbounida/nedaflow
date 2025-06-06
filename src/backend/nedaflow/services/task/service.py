
from nedaflow.services import BaseTaskQueue, AsyncioTaskQueue
from collections.abc import Iterable, Awaitable
from typing import Literal
from loguru import logger 


# TODO:: clean this design and make it simpler with redis 
class TaskQueueService:
    """This will be like an orchastrator for the task queues 

    it will launch a new task Queue for each workflow , start / cancel and clean up the queue
    """

    def __init__(self) -> None:
        self._task_queues: dict[str, BaseTaskQueue] = {} # execution id -> task queue
    

    def create_task_queue(self,*,job_id:str,queue_type: Literal["asyncio", "celery"] = "asyncio" ) -> BaseTaskQueue:
        """
        Create a new task queue
        
        to handle different types of task queues but will be mainly used to build and execute a workflow
        """
        if queue_type == "asyncio":
            self._task_queues[job_id] = AsyncioTaskQueue()
            logger.success(f"Task queue for job {job_id} created")
            return self._task_queues[job_id] 
        else:
            raise NotImplementedError
        
    async def add_task(self,job_id:str, task:Iterable[Awaitable]):
        task_queue = self.get_task_queue(job_id)
        if task_queue:
            await task_queue.add_tasks([task])
        else:
            logger.warning(f"Task queue for job {job_id} not found")
    
    async def run_tasks(self,job_id:str, tasks: list[Iterable[Awaitable]] = ()):
        task_queue = self.get_task_queue(job_id)
        if task_queue:
            await task_queue.run_tasks(tasks)
    
    
    def get_task_queue(self, job_id: str) -> BaseTaskQueue:
        if not job_id in self._task_queues:
            # logger.warning(f"_task_queues: {self._task_queues}")
            raise KeyError(f"Task queue for job {job_id} not found") # TODO:: see how to initaite the task queue with this 
        return self._task_queues[job_id]      

    def stream_task_queue(self, job_id: str) -> BaseTaskQueue:
        pass  