# https://www.codewars.com/kata/547274e24481cfc469000416/python

import unittest
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


class TestGod(unittest.TestCase):
    def test_god_function(self):
        self.assertEqual(len(God()), 2)
        self.assertIsInstance(God()[0], Man)
        self.assertIsInstance(God()[1], Woman)


if __name__ == "__main__":
    unittest.main()
