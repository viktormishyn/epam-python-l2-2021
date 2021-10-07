# https://www.codewars.com/kata/547274e24481cfc469000416/python

from typing import List


class Human:
    def __init__(self, name: str) -> None:
        self.name = name


class Man(Human):
    def __init__(self, name: str) -> None:
        super().__init__(name)
        self.sex = "M"


class Woman(Human):
    def __init__(self, name: str) -> None:
        super().__init__(name)
        self.sex = "F"


def God() -> List[Human]:
    adam = Man("Adam")
    eva = Woman("Eva")
    return [adam, eva]
