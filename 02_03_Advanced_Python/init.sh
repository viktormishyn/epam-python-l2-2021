# install and activate virtual env
python3 -m venv .venv
source .venv/bin/activate

# install dependencies
pip install -r requirements_dev.txt

# install nltk dependencies
# python -c "import nltk; nltk.download()"
python3 -m nltk.downloader -d ./.venv/nltk_data punkt
