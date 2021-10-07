# https://www.codewars.com/kata/54fe05c4762e2e3047000add/python

class Ship:

    def __init__(self, draft: int, crew: int) -> None:
        """
        Args:
            draft (int): total weight of the ship
            crew (int): the count of crew on board
        """
        self.draft = draft
        self.crew = crew

    def is_worth_it(self) -> bool:
        """is_worth_it calculates the weight of the ship without crew and
        decides whether it is worthy to loot (if more than 20) or not.
        """
        return (self.draft - self.crew * 1.5) > 20
