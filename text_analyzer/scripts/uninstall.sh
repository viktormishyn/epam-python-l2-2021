printf "\nUninstalling requirements..."
pip uninstall -y -r requirements.txt

printf "\nUninstalling nltk dependencies..."
rm -rf ~/nltk_data

# remove script from ~/bin/
printf "\nRemoving textanalyzer from ~/bin/\n"
rm ~/bin/textanalyzer
printf "\nRemoving ~/textanalyzer_results.db\n"
rm ~/textanalyzer_results.db

printf "\nTextanalyzer uninstalled!"
