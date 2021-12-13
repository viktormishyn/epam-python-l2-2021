from typing import Dict

from task_list.task import Task


class Project:

    def __init__(self, name: str) -> None:
        self.name = name
        self.last_id: int = 0
        self.tasks: Dict[str, Task] = {}

    def add_task(self, id_: int, description: str) -> None:
        self.tasks[id_] = Task(id_, description, False)
