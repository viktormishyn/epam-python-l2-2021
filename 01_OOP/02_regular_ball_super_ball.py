# https://www.codewars.com/kata/53f0f358b9cb376eca001079/python

import unittest


class Ball:
    def __init__(self, ball_type: str = "regular") -> None:
        """
        Args:
            ball_type (str, optional): Ball type. Defaults to "regular".
        """
        self.ball_type = ball_type


class TestBall(unittest.TestCase):
    def test_init_with_argument(self):
        self.assertEqual(Ball("ball_name").ball_type, "ball_name")

    def test_init_without_arguments(self):
        self.assertEqual(Ball().ball_type, "regular")


if __name__ == "__main__":
    unittest.main()
