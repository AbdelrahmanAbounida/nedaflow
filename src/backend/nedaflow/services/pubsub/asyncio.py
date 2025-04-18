from nedaflow.services.pubsub.base import BasePubSub
from typing import Callable, Any

class AsyncioPubSub(BasePubSub):
    """
    Asyncio based Pubsub System
    """
    def __init__(self):
        self._subscribers = {}

    def publish(self, topic: str, message: str):
        ...
    
    def subscribe(self, topic: str, callback: Callable[..., Any]):
        ...
    
    def stop(self):
        ...