# https://www.codewars.com/kata/53f1015fa9fe02cbda00111a/python

import random
import unittest


class Ghost:

    def __init__(self) -> None:
        """__init__ will set `color` attribute randomly choosing 
        from set of colors
        """
        self.colors = ["white", "yellow", "purple", "red"]
        self.color = random.choice(self.colors)


class TestGhost(unittest.TestCase):

    def setUp(self):
        self.colors = ["white", "yellow", "purple", "red"]

    def test_init(self):
        self.assertIn(Ghost().color, self.colors)


if __name__ == "__main__":
    unittest.main()
