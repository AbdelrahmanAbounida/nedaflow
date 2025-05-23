from abc import ABC , abstractmethod
from typing import Callable , Any
from collections.abc import Iterable , Awaitable

class BaseTaskQueue(ABC):

    @abstractmethod
    def run_task(self, fn: Callable[..., Any], *args, **kwargs):
        ...
    
    @abstractmethod
    def run_tasks(self):
        ...

    async def add_tasks(self, tasks: list[Iterable[Awaitable]] = []) -> None:
        ...
