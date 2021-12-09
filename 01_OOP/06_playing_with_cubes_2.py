# https://www.codewars.com/kata/55c0ac142326fdf18d0000af/python

import unittest


class Cube():
    # This cube needs help
    # Define a constructor which takes one integer, or handles no args
    def __init__(self, side: int = 0) -> None:
        """
        Args:
            side (int, optional): number of sides. Defaults to 0.
        If number of sides will be negative, it will be converted to positive number.
        """
        if not isinstance(side, int):
            raise TypeError("Cube side should be an integer")
        self._side = abs(side)

    def get_side(self) -> int:
        """Return the side of the Cube"""
        return self._side

    def set_side(self, new_side) -> None:
        """Set the value of the Cube's side."""
        self._side = abs(new_side)


class TestCube(unittest.TestCase):
    def test_cube_without_arguments(self):
        self.assertEqual(Cube().get_side(), 0)

    def test_cube_positive_argument(self):
        self.assertEqual(Cube(10).get_side(), 10)

    def test_cube_negative_argument(self):
        self.assertEqual(Cube(-10).get_side(), 10)


if __name__ == "__main__":
    unittest.main()
