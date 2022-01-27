FROM python:3.8-alpine

RUN mkdir /text_analyzer/

COPY . /text_analyzer/
WORKDIR /text_analyzer/

RUN pip install --upgrade pip
RUN pip install -r requirements_dev.txt
RUN python3 -c "import nltk; nltk.download('punkt')"

CMD "pytest"
