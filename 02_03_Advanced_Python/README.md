# Text Analyzer

text_analyzer.py  
Python script that can analyze text and get back some data about it as a result.

## Install

1. Run `install.sh` to install requirements and dependencies (it will be installed globally)

## Uninstall

1. Run `uninstall.sh` to remove requirements, dependencies and script itself

## Usage

- to print the output to the console:
  ```bash
  textanalyzer input/path/txt
  ```
- to generate json file with report:
  ```bash
  textanalyzer input/path/txt > output/path/json
  ```

## Development and Testing

1. To reate virtualenv and install dev requirements run `install_dev.sh`
2. Activate virtual env:
   ```bash
   source .venv/bin/activate
   ```
3. Run unit tests:
   ```bash
   pytest
   ```
4. To see coverage:
   ```bash
   pytest --cov
   ```
5. To uninstall dev environment simply delete .venv folder
