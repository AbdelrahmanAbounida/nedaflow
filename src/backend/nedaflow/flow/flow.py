"""
    This will be the main class responsible for handling the building process of each graph nodes, edges 
"""
import concurrent.futures
import threading 
import asyncio 

# 1- start with asyncio 

class EventManager:
    def __init__(self):
        self.evet_queue: asyncio.Queue = asyncio.Queue(maxsize=100)
        self.loop: asyncio.BaseEventLoop = asyncio.get_event_loop()
        self.running: bool = False
        self.workers: list[threading.Thread] = []
        self.executor: concurrent.futures.ThreadPoolExecutor = concurrent.futures.ThreadPoolExecutor()
    

# Todo:
## 1- Think about graph theory in general 
## 2- think about mapping between reactflow and python (could be seperate lib)
## 3- think about rxpy
## 4- think about airflow as alternative 
## 5- think about networkx


class Flow:...
