# https://www.codewars.com/kata/54fe05c4762e2e3047000add/python

import unittest


class Ship:

    def __init__(self, draft: int, crew: int) -> None:
        """
        Args:
            draft (int): total weight of the ship
            crew (int): the count of crew on board
        """
        if not isinstance(draft, int) or not isinstance(crew, int):
            raise TypeError("`draft` and `crew` should be integer values")
        self.draft = draft
        self.crew = crew

    def is_worth_it(self) -> bool:
        """is_worth_it calculates the weight of the ship without crew and
        decides whether it is worthy to loot (if more than 20) or not.
        """
        return (self.draft - self.crew * 1.5) > 20


class TestShip(unittest.TestCase):
    def test_is_worth_it(self):
        ship_worth = Ship(50, 10)
        self.assertTrue(ship_worth.is_worth_it())

        ship_not_worth = Ship(50, 30)
        self.assertFalse(ship_not_worth.is_worth_it())

    def test_type_check(self):
        with self.assertRaises(TypeError):
            Ship('string_value', 111)


if __name__ == "__main__":
    unittest.main()
