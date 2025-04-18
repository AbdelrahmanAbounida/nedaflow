from abc import ABC, abstractmethod
from typing import Callable, Any


class BasePubSub(ABC):
    """
    Base class for pubsub service for dataflow streaming and progress updates in the UI
    """

    @abstractmethod
    def publish(self, topic: str, message: str):
        ...
    
    @abstractmethod
    def subscribe(self, topic: str, callback: Callable[..., Any]):
        ...

    @abstractmethod
    def stop(self):
        ...