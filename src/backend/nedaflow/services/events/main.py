from nedaflow.services.events.base import BaseEventManager
from typing import Callable , Any 
from typing import Generic, TypeVar
from collections import defaultdict

EventName = TypeVar('EventName', bound=str)

class EventManager(BaseEventManager[EventName]):
    
    def __init__(self):
        self._events: defaultdict[EventName, list[Callable[..., Any]]] = defaultdict(list)

    def emit(self, event_name: EventName, *args, **kwargs):
        """Call all the callbacks registered for the event"""
        for cb in self._events.get(event_name, []):
            cb(*args, **kwargs)

    def on(self, event_name: EventName, callback: Callable[..., Any]):
        """register callback for event"""
        if event_name not in self._events:
            self._events[event_name] = []
        self._events[event_name].append(callback)

        



# TODO:: do we need pubsub here 
# TODO:: subscribe list of events like when vertex build, failed, stream ,.,, >> may be we need pubsub here too
# TODO:: add new task to taskqueue with the ready to build vertexes and update the workflow state like the running/ built vertexes
# TODO:: may be we need an event in case of chat / stream node built 


# Workflow event manager 
