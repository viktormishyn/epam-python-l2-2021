from unittest import TestCase
from text_analyzer import *


class TestTextAnalyzer(TestCase):
    def setUp(self):
        text = "Test paragraph. Madam somehow deified redivider! \
            How many sentences does it contain? It contains 4 sentences"
        self.test_text = Text('test_file', text)

    def test_number_of_characters(self):
        # without whitespaces
        self.assertEqual(self.test_text.number_of_characters, 93)

    def test_number_of_words(self):
        self.assertEqual(self.test_text.number_of_words, 16)

    def test_number_of_sentences(self):
        self.assertEqual(self.test_text.number_of_sentences, 4)

    def test_frequency_of_characters(self):
        # without whitespaces
        t = Text("test_text", "aaab bbbc ccc c")
        result = t.frequency_of_characters
        expected = {'a': 3, 'b': 4, 'c': 5}
        self.assertDictEqual(result, expected)

    def test_distribution_of_characters(self):
        t = Text("test_text", "abbbbbbbbb")
        result = t.distribution_of_characters
        expected = {'a': '10.00 %', 'b': '90.00 %'}
        self.assertDictEqual(result, expected)

    def test_average_word_length(self):
        result = self.test_text.average_word_length
        expected = 5.62
        self.assertEqual(result, expected)

    def test_average_number_of_words_in_sentence(self):
        result = self.test_text.average_number_of_words_in_sentence
        expected = 4
        self.assertEqual(result, expected)

    def test_most_used_words(self):
        # convert dict into a list of tuples
        result = [(k, v) for k, v in self.test_text.most_used_words.items()]
        self.assertEqual(result[0], ('sentences', 2))
        self.assertEqual(result[1], ('it', 2))

    def test_longest_words(self):
        # convert dict into a list of tuples
        result = [(k, v) for k, v in self.test_text.longest_words.items()]
        self.assertEqual(result[0], ('paragraph', 9))

    def test_shortest_words(self):
        # convert dict into a list of tuples
        result = [(k, v) for k, v in self.test_text.shortest_words.items()]
        self.assertEqual(result[1], ('it', 2))

    def test_longest_sentences(self):
        # convert dict into a list of tuples
        result = [item for item in self.test_text.longest_sentences]
        print(result)
        self.assertEqual(result[0], ('How many sentences does it contain?'))

    def test_shortest_sentences(self):
        # convert dict into a list of tuples
        result = [item for item in self.test_text.shortest_sentences]
        self.assertEqual(result[0], ('Test paragraph.'))

    def test_palindrome_words_num(self):
        result = self.test_text.palindrome_words_num
        expected = 3
        self.assertEqual(result, expected)

    def test_longest_palindromes(self):
        result = self.test_text.longest_palindromes
        expected = ["redivider", "deified", "madam"]
        self.assertEqual(result, expected)

    def test_define_is_palindrome(self):
        palindrome_text = Text("test_text", """
        Are we not pure? “No, sir!” 
        Panama’s moody Noriega brags. 
        “It is garbage!” 
        Irony dooms a man — a prisoner up to new era.
        """)
        result = palindrome_text.is_palindrome
        expected = True
        self.assertTrue(result, expected)
