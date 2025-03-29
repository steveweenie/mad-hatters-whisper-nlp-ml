import pandas as pd
from sklearn.svm import LinearSVC
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
import joblib


def initialize_models():
    df = pd.read_csv('data.csv')
    char_counts = df["Character"].value_counts()
    df = df[df["Character"].isin(char_counts[char_counts > 1].index)]
    
    x = df["Dialogue"]
    y = df["Character"]
    

    vectorizer = TfidfVectorizer(ngram_range=(1,2))
    X_tfidf = vectorizer.fit_transform(x)
    
    svm_model = LinearSVC()
    nb_model = MultinomialNB()
    lr_model = LogisticRegression(max_iter=2000)
    
    svm_model.fit(X_tfidf, y)
    nb_model.fit(X_tfidf, y)
    lr_model.fit(X_tfidf, y)
    
    joblib.dump(vectorizer, 'vectorizer.joblib')
    joblib.dump(svm_model, 'svm_model.joblib')
    joblib.dump(nb_model, 'nb_model.joblib')
    joblib.dump(lr_model, 'lr_model.joblib')

def predict_character(text):
    vectorizer = joblib.load('vectorizer.joblib')
    svm_model = joblib.load('svm_model.joblib')
    nb_model = joblib.load('nb_model.joblib')
    lr_model = joblib.load('lr_model.joblib')
    
    text_tfidf = vectorizer.transform([text])
    
    svm_pred = svm_model.predict(text_tfidf)[0]
    nb_pred = nb_model.predict(text_tfidf)[0]
    lr_pred = lr_model.predict(text_tfidf)[0]
    
    if svm_pred == nb_pred or svm_pred == lr_pred:
        return svm_pred
    elif nb_pred == lr_pred:
        return nb_pred
    else:
        return svm_pred