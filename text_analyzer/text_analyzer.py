#!/usr/bin/python3

import sys
import re
import itertools
import timeit
import json
import argparse
import multiprocessing as mp
import requests
import logging

from typing import List, Dict
from unicodedata import category
from nltk.tokenize import sent_tokenize, word_tokenize
from collections import Counter
from datetime import datetime as dt

# utf-8 punctuation
PUNCTUATION = ''.join([chr(i) for i in range(sys.maxunicode)
                       if category(chr(i)).startswith("P") and chr(i) != '-'])


class Word():
    def __init__(self, token) -> None:
        self.text = token
        self.length = len(token)
        self.is_palindrome = True if (
            self.length > 2 and self.text == self.text[::-1]) else False


class Sentence():
    def __init__(self, text) -> None:
        self.raw_text = text

        # prepare the text for tokenization - clean from punctuation and lower case
        self.clean_text = self.raw_text.translate(
            str.maketrans("", "", PUNCTUATION)).lower()

        # tokenize words
        self.words = [Word(token) for token in word_tokenize(
            self.clean_text) if token != "-"]

        # length of the sentence (amount of words)
        self.length = len(self.words)


class Text():
    def __init__(self, filename, text) -> None:
        # substitute all whitespaces with " "
        self.filename = filename
        self.text = re.sub(r"\s+", " ", text)

        # list of Sentence objects
        self.sentences = [Sentence(i) for i in sent_tokenize(self.text)]
        # list of Word objects
        self.words = self.set_words()

        # number of all haracters(including punctuation, but excluding whitespaces)
        self.number_of_characters = len(self.text) - self.text.count(' ')
        # number of tokenized words (without punctuation, ignoring case)
        self.number_of_words = sum(len(s.words) for s in self.sentences)
        # number of sentences in the text
        self.number_of_sentences = len(self.sentences)

        # list of palindromes in the text
        self.palindromes = [
            word.text for word in self.words if word.is_palindrome]
        # is the whole text palindrome?
        self.is_palindrome = self.define_is_palindrome()

    def set_words(self) -> List[str]:
        """Returns list of Word objects"""
        list_of_words = list(itertools.chain.from_iterable(
            [s.words for s in self.sentences]))
        return list_of_words

    def define_is_palindrome(self) -> bool:
        """Compares words from beginning and from the end of the list word by word"""
        words = self.words
        text = ''.join(word.text for word in words)
        mid = len(text)//2
        for i in range(mid):
            if text[i] != text[-(i+1)]:
                return False
        return True

    @property
    def frequency_of_characters(self) -> Dict[str, int]:
        """Frequency of all characters in the text
        (including punctuation, but excluding whitespaces)"""
        return dict(Counter(self.text.replace(' ', '')).most_common())

    @property
    def distribution_of_characters(self) -> Dict[str, str]:
        """Distribution of characters as a percentage of total
        (including punctuation, but excluding whitespaces)"""
        distribution_of_characters = {
            k: f"{(v/self.number_of_characters*100):.2f} %"for k, v in self.frequency_of_characters.items()}
        return distribution_of_characters

    @property
    def average_word_length(self) -> float:
        """Average word length (excluding punctuation)"""
        word_lengths = [word.length for word in self.words]
        avg = sum(word_lengths)/len(word_lengths)
        return round(avg, 2)

    @property
    def average_number_of_words_in_sentence(self) -> float:
        """The average number of words in a sentence"""
        words_in_sentences = [len(s.words) for s in self.sentences]
        avg = sum(words_in_sentences)/len(words_in_sentences)
        return round(avg, 2)

    @property
    def most_used_words(self) -> Dict[str, int]:
        """Top 10 most used words"""
        return dict(Counter([word.text for word in self.words]).most_common(10))

    def top_words_by_length(self, reverse: bool) -> Dict[str, int]:
        """pick top 10 unique words by length
        (reverse=True for longest words, reverse=False for shortest words)"""
        words = sorted(self.words, key=lambda w: w.length, reverse=reverse)
        top_words = {}
        count = 0
        for word in words:
            if count == 10:
                break
            if word.text not in top_words.keys():
                top_words[word.text] = word.length
                count += 1
        return top_words

    @property
    def longest_words(self) -> List[str]:
        """Top 10 longest words"""
        return list(self.top_words_by_length(reverse=True).keys())

    @property
    def shortest_words(self) -> List[str]:
        """Top 10 shortest words"""
        return list(self.top_words_by_length(reverse=False).keys())

    @property
    def longest_sentences(self) -> Dict[str, int]:
        """Top 10 longest sentences (based on amount of words)"""
        sentences = sorted(
            self.sentences, key=lambda s: s.length, reverse=True)[:10]
        return [s.raw_text for s in sentences]

    @property
    def shortest_sentences(self) -> Dict[str, int]:
        """Top 10 shortest sentences (based on amount of words)"""
        sentences = sorted(
            self.sentences, key=lambda s: s.length, reverse=False)[:10]
        return [s.raw_text for s in sentences]

    @property
    def palindrome_words_num(self) -> int:
        """Number of palindrome words (3 characters and more) in the text"""
        return len(self.palindromes)

    @property
    def longest_palindromes(self) -> List[str]:
        "Top 10 longest palindromes"
        return sorted(set(self.palindromes), key=lambda p: len(p), reverse=True)[:10]


def generate_report(filename, text, queue) -> Dict[str, any]:
    start = timeit.timeit()
    t = Text(filename, text)
    result = {
        "filename": t.filename,
        "numberOfCharacters": t.number_of_characters,
        "numberOfWords": t.number_of_words,
        "numberOfSentences": t.number_of_sentences,
        "frequencyOfCharacters": t.frequency_of_characters,
        "distributionOfCharacters": t.distribution_of_characters,
        "avgWordLength": t.average_word_length,
        "avgNumberOfWordsInSentence": t.average_number_of_words_in_sentence,
        "topMostUsedWords": t.most_used_words,
        "topLongestWords": t.longest_words,
        "topShortestWords": t.shortest_words,
        "topLongestSentences": t.longest_sentences,
        "topShortestSentences": t.shortest_sentences,
        "numberOfPalindromes": t.palindrome_words_num,
        "topLongestPalindromes": t.longest_palindromes,
        "isTextPalindrome": t.is_palindrome,
        "reportGeneratedAt": f"{dt.now()}",
        "timeOfExecution": f"{timeit.timeit() - start} ms"
    }
    queue.put(result)
    return result
    # print(json.dumps(result, indent=4))


def parse_args():
    description = "Python script that can analyze text \
        and get back some data about it as a result"
    parser = argparse.ArgumentParser(description=description)
    group = parser.add_mutually_exclusive_group()
    group.add_argument('-f', '--file', nargs='+',
                       metavar='', help="Specify txt file(s)")
    group.add_argument('-r', '--resource', nargs='+',
                       metavar='', help="Specify txt file url(s)")
    args = parser.parse_args()
    return args


def textanalyzer_logger(resource_type='-', resource_name='-'):
    logger = logging.LoggerAdapter(
        logging.getLogger(__name__), {"resource_type": resource_type, "resource_name": resource_name})
    FORMAT = "%(asctime)s|%(resource_type)s|%(resource_name)s|[%(levelname)s]|%(message)s"
    logging.basicConfig(filename="textanalyzer.log",
                        format=FORMAT, level=logging.INFO, datefmt='%d/%m/%Y %H:%M:%S')
    return logger


def perform_processing(args, resource_type):
    processes = []
    queue = mp.Queue()
    try:
        for filename in args:
            process_document(filename, resource_type, processes, queue)

        for process in processes:
            process.join()

        # print combined result as json
        combine_results(queue)

    except:
        textanalyzer_logger().error("Processing failed...")


def process_document(resource_name, resource_type, processes, queue):
    # skip processing if not txt file
    if resource_name.split('.')[-1] != 'txt':
        textanalyzer_logger(
            '--file', resource_name).warning("Invalid resource. Should be .txt document")
        return
    # start processing
    if resource_type == '--file':
        with open(resource_name) as f:
            p = mp.Process(target=generate_report, args=[
                resource_name, f.read(), queue])
    elif resource_type == '--resource':
        text = requests.get(resource_name).text
        p = mp.Process(target=generate_report, args=[
                       resource_name, text, queue])
    p.start()
    # append process to the list of processes
    processes.append(p)

    # log processing
    textanalyzer_logger(
        resource_type, resource_name).info("Processing...")


def combine_results(queue):
    # Add result objects from the queue to the list
    queue.put(None)
    combined_result = list(iter(queue.get, None))
    print(json.dumps(combined_result, indent=4))
    textanalyzer_logger().info("Processing completed...")


if __name__ == "__main__":
    args = parse_args()
    if args.file:
        perform_processing(args.file, '--file')

    elif args.resource:
        perform_processing(args.resource, '--resource')
