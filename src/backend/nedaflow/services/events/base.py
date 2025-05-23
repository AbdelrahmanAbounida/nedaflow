from abc import ABC , abstractmethod
from typing import Callable, Any 
from typing import Generic, TypeVar

Event = TypeVar('Event', bound=str)

class BaseEventManager(ABC, Generic[Event]):
    """Base class to handle events 

    Later we will have different Event Managers for different use cases like
    - asyncio 
    - celery
    - pubsub
    
    """
    # TODO:: Check some libs designs like pyee, pyventus, circuits and python eventemitter

    @abstractmethod
    async def emit(self, event_name: Event, *args, **kwargs):
        ...
    
    @abstractmethod
    def on(self, event_name: Event, callback: Callable[..., Any]):
        ...