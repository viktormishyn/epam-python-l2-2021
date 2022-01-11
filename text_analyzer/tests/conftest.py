import pytest
import sqlite3
import os

MOCK_DB = 'test_textanalyzer_results.db'


@pytest.fixture
def mock_db(monkeypatch, mocker):
    mocker.patch("text_analyzer.sqlite3.connect",
                 return_value=sqlite3.connect(MOCK_DB))
    yield
    os.remove(MOCK_DB)
