from nedaflow.services.task.base import BaseTaskQueue
import asyncio 


class AsyncioTaskQueue(BaseTaskQueue):
    """
    Asyncio Task Queue

    This will be mainly used for running tasks concurrently for building graph vertexes
    """
    def __init__(self):
        self._queue = asyncio.Queue()
    
    async def enqueue(self, task):
        await self._queue.put(task)
    
    async def run_tasks(self):
        """
        Run all tasks in the queue
        """
        # TODO:: recheck this task and hanele cacncel event, Lock, TaskGroup and  Semaphore if required 
        while self._queue.qsize() > 0:
            task = await self._queue.get()
            await task