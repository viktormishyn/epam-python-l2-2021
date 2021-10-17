# Text Analyzer

text_analyzer.py  
Python script that can analyze text and get back some data about it as a result.

## Setup

1. Run `init.sh` to create virtual environment with dependencies
2. Activate virtual environment:
    ```bash
    source .venv/bin/activate
    ```

## Usage

- to print the output to the console:
  ```bash
  python3 text_analyzer.py input/path/txt
  ``` 
- to generate json file with report:
  ```bash
  python3 text_analyzer.py input/path/txt > output/path/json
  ```

## Testing

1. Install dev requirements:
   ```bash
   pip install -r requirements_dev.txt
   ```
2. Run unit tests:
   ```bash
   pytest
   ```
3. To see coverage:
   ```bash
   pytest --cov
   ```
