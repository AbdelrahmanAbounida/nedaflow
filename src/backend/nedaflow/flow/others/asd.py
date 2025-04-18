import asyncio 
from loguru import logger 

async def task(*, task_name: str, delay:int = 2, raise_error: bool = False):
    logger.info(f"Running Task: {task_name}")
    if raise_error:
        raise Exception("Task failed")
    await asyncio.sleep(delay)
    logger.info(f"Finished Task: {task_name}")
    logger.success("*******************************")



async def main():
    ...
    # 1- Synchronization Primitives (Lock, Semaphore, Event, Condition, Barrier)
    # 2- Queues 
    # 3- Futures 
    # 4- Event Loop 

    # Then start with eventManager/Emitter , Pubsub with asyncio , Backend Task, Reactive Programming , Streaming
    ...

if __name__ == "__main__":
     asyncio.run(main())


