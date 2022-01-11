# install and activate virtual env
printf "\nCreating virtual env..."
python3 -m venv .venv
source .venv/bin/activate

# install dev dependencies
printf "\nInstalling requirements..."
pip install -r requirements_dev.txt
# pip install -r requirements.txt

# install nltk dependencies to .venv
printf "\nInstalling nltk dependencies..."
python3 -m nltk.downloader -d ./.venv/nltk_data punkt
