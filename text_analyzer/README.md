# Text Analyzer

text_analyzer.py  
Python script that can analyze text and get back some data about it as a result.

## Install

1. Run `./scripts/install.sh` to install requirements and dependencies (it will be installed globally)

## Uninstall

1. Run `./scripts/uninstall.sh` to remove requirements, dependencies and script itself

## Usage

- Shows a list of commands when called with the flag -h (--help):
  ```bash
  textanalyzer -h
  ```
- Analyzes local txt file(s) and prints the output to the console when called with the flag -f (--file):
  ```bash
  textanalyzer -f mytext.txt mytext1.txt mytext2.txt mytext3.txt
  ```
- Analyzes txt file from web and prints the output to the console when called with the flag -r (--resource):
  ```bash
  textanalyzer -r <url>
  ```
- Reads previous results from database when called with the flag -v (--view):
  ```bash
  textanalyzer -v mytext.txt
  ``` 

## Development and Testing

1. Build docker image for testing `sudo docker-compose build`
2. Run terminal in test docker container:
   ```bash
   docker-compose run test sh
   ```
3. Run unit tests inside the container:
   ```bash
   pytest
   ```
4. To see coverage:
   ```bash
   pytest --cov-report html --cov=text_analyzer
   ```
   or
   ```bash
   pytest --cov-report term-missing --cov=text_analyzer
   ```
5. To uninstall dev environment simply delete .venv folder
