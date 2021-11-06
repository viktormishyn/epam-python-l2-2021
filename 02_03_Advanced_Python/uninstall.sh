printf "\nUninstalling requirements..."
pip uninstall -r requirements.txt

printf "\nUninstalling nltk dependencies..."
rm -rf ~/nltk_data

# remove script from ~/bin/
printf "\nRemoving textanalyzer from ~/bin/\n"
sudo rm ~/bin/textanalyzer

printf "\nTextanalyzer uninstalled!"
