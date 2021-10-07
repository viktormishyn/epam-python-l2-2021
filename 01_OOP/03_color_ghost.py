# https://www.codewars.com/kata/53f1015fa9fe02cbda00111a

import random


class Ghost(object):

    colors = ["white", "yellow", "purple", "red"]

    def __init__(self) -> None:
        """__init__ will set `color` attribute randomly choosing 
        from the list of colors (class variable)
        """
        cls = self.__class__
        self.color = random.choice(cls.colors)
