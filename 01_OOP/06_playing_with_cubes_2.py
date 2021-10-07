# https://www.codewars.com/kata/55c0ac142326fdf18d0000af/python


class Cube(object):
    # This cube needs help
    # Define a constructor which takes one integer, or handles no args
    def __init__(self, side: int = 0) -> None:
        """
        Args:
            side (int, optional): number of sides. Defaults to 0.
        If number of sides will be negative, it will be converted to positive number.
        """
        self._side = abs(side)

    def get_side(self) -> int:
        """Return the side of the Cube"""
        return self._side

    def set_side(self, new_side) -> None:
        """Set the value of the Cube's side."""
        self._side = abs(new_side)
