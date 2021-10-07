# https://www.codewars.com/kata/53f0f358b9cb376eca001079

class Ball(object):
    def __init__(self, ball_type: str = "regular") -> None:
        """
        Args:
            ball_type (str, optional): Ball type. Defaults to "regular".
        """
        self.ball_type = ball_type
