from collections.abc import Iterable, Awaitable
from nedaflow.services.task.base import BaseTaskQueue
from typing import Any
import asyncio 
from loguru import logger 

class AsyncioTaskQueue(BaseTaskQueue):
    """
    Asyncio Task Queue

    This will be mainly used for running tasks concurrently for building graph vertexes
    """
    def __init__(self):
        self._queue = asyncio.Queue()
        self._event_queue = asyncio.Queue()   # For streaming building progress and results to the ui 
    
    async def emit_event(self, event: dict):
        await self._event_queue.put(event)
    
    async def get_event(self):
        return await self._event_queue.get()

    async def enqueue(self, task):
        await self._queue.put(task)
    
    async def add_tasks(self, tasks: list[Iterable[Awaitable]] = []) -> None:
        for task in tasks:
            await self._queue.put(task)
    
    async def run_task(self, fn, *args, **kwargs):
        await self.add_tasks([fn(*args, **kwargs)])
        await self.run_tasks()
    
    async def run_tasks(self, tasks: list[Iterable[Awaitable]] = ()) -> None:
        """
        Run all tasks in the queue
        """
        # TODO:: recheck this task and hanele cacncel event, Lock, TaskGroup and  Semaphore if required 

        await self.add_tasks(tasks)
       
        task_list = []
        while not self._queue.empty():
            task = await self._queue.get()

            if asyncio.iscoroutine(task):
                task = asyncio.create_task(task)
            # if not async func 
            elif not isinstance(task, Awaitable):
                task = asyncio.create_task(asyncio.to_thread(task))

            task_list.append(task)

        if task_list:
            res = await asyncio.gather(*task_list, return_exceptions=True)

            for r in res:
                if isinstance(r, Exception):
                    logger.error(f"Task Failed > {r}")
                    # raise r