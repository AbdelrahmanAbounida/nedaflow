from abc import abstractmethod, ABC 
from pydantic import BaseModel 


class BaseNode(ABC, BaseModel):
    """Abstract class for any flow component

    Component refers to any tool/component u need in your AI flow 
    ex: prompt, input message, search tool, api call, agent,....
    """
