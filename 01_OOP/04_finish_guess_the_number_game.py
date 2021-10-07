# https://www.codewars.com/kata/568018a64f35f0c613000054/python

class Guesser:
    def __init__(self, number: int, lives: int) -> None:
        """
        Args:
            number (int): number to guess
            lives (int): maximum number of guesses
        """
        self.number = number
        self.lives = lives

    def guess(self, n: int) -> bool:
        """guess method returns True or False depending on 
        player guessed the number correctly or not
        Args:
            n (int): number proposed by player
        Raises:
            Exception: If there are no more guesses available (self.lives == 0)
        Returns:
            bool: True if number is correct else False
        """
        if self.lives == 0:
            raise Exception("Number of guesses exceeded!")
        elif self.number == n:
            print("Congratulations, the number is correct!")
            return True
        self.lives -= 1
        print("Sorry, the number is incorrect. Try again...")
        return False
