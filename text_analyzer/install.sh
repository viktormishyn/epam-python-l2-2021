# install dependencies globally
printf "\nInstalling requirements..."
pip install -r requirements.txt

# install nltk dependencies globally
printf "\nInstalling nltk dependencies..."
python3 -c "import nltk; nltk.download('punkt')"

# copy script to ~/bin/
printf "\nCopying textanalyzer to ~/bin/\n"
cp ./text_analyzer.py ~/bin/textanalyzer

printf "\nTextanalyzer installed!"
