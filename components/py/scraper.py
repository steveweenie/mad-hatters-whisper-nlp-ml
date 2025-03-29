from bs4 import BeautifulSoup
import pandas as pd
import requests
import re

url = "https://www.alice-in-wonderland.net/resources/chapters-script/disney-movie-script/"

r = requests.get(url)
#with open() as html_file:
#    r = html_file.read()


soup = BeautifulSoup(r.content, 'html.parser')
lines = soup.find_all('p')

pattern = r'^[A-Z][a-z A-Z]+:'

quotes = []

for line in lines: #remove lines not starting with "Name:"
    if re.match(pattern, line.text):
        name, dialogue = line.text.split(':', 1)
        quotes.append({"Character": name.strip(), "Dialogue": dialogue.strip()})

df = pd.DataFrame(quotes)

# CLEANING STRINGS
df["Dialogue"] = df["Dialogue"].replace("", pd.NA)
df.dropna(subset=["Dialogue"], inplace=True)
df["Dialogue"] = df["Dialogue"].str.lower()
df["Dialogue"] = df["Dialogue"].str.replace(r'[^\w\s!?]', '', regex=True) #remove everything not word or whitespace or ! or ?

df.to_csv('data.csv', index=False)
