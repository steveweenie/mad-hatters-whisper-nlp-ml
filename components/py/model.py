import pandas as pd
from sklearn.svm import LinearSVC
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression

# load dataset
df = pd.read_csv('../components/data/data.csv')

# count character dialogue lines
char_counts = df["Character"].value_counts()

# removes characters with 1 dialogue line because model requires two instances
df = df[df["Character"].isin(char_counts[char_counts > 1].index)]

# splits data into characters and pieces of dialogue
x = df["Dialogue"]
y = df["Character"]

# 70/30 train-test split, stratify ensures class balance
X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.3, stratify=y, random_state=42)

# converts text to into numerical features for model
vectorizer = TfidfVectorizer(ngram_range=(1,2))
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# trains the linear svm M\model
model = LinearSVC()
model.fit(X_train_tfidf, y_train)

# trains the naive bayes model
nb_model = MultinomialNB()
nb_model.fit(X_train_tfidf, y_train)

# trains the logisitc regression model
lr_model = LogisticRegression(max_iter=2000)
lr_model.fit(X_train_tfidf, y_train)

# liner svm model accuracy
svm_accuracy = model.score(X_test_tfidf, y_test)
#print(f"SVM Model Accuracy: {svm_accuracy:.2f}")

# naive model accuracy
naive_accuracy = nb_model.score(X_test_tfidf, y_test)
#print(f"Naive Model Accuracy: {naive_accuracy:.2f}")

# logistic regression accuracy
lr_accuracy = lr_model.score(X_test_tfidf, y_test)
#print(f"Logistic Model Accuracy: {lr_accuracy:.2f}")

avg_accuracy = (svm_accuracy + naive_accuracy+ lr_accuracy)/3
#print(f"{avg_accuracy:.2f}")


# takes the model with the best accuracy
bestModel = max(svm_accuracy, naive_accuracy, lr_accuracy)


def linear_predict_speaker(line):
    line_tfidf = vectorizer.transform([line])
    prediction = model.predict(line_tfidf)[0]
    return prediction

def naive_predict_speaker(line):
    line_tfidf = vectorizer.transform([line])
    prediction = model.predict(line_tfidf)[0]
    return prediction

def logistic_predict_speaker(line):
    line_tfidf = vectorizer.transform([line])
    prediction = model.predict(line_tfidf)[0]
    return prediction

line = input("Which line are you using? ")

linearPredict = linear_predict_speaker(line)
naivePredict = naive_predict_speaker(line)
logisticPredict = logistic_predict_speaker(line)

#print("\nSVM's prediction: " + linearPredict)
#print("Naive's prediction: " + naivePredict)
#print("Logistic's prediction: " + logisticPredict)


def final_predict_speaker(svmPredict, naivePredict, logisticPredict, bestModel):
    if svmPredict == naivePredict:
        return svmPredict
    elif svmPredict == logisticPredict:
        return svmPredict
    elif naivePredict == logisticPredict:
        return naivePredict
    else:
        if bestModel == svm_accuracy:
            return svmPredict
        elif bestModel == naive_accuracy:
            return naivePredict
        elif bestModel == lr_accuracy:
            return logisticPredict
        
final_prediction = final_predict_speaker(linearPredict, naivePredict, logisticPredict, bestModel)

print("\nFinal Prediction: " + final_prediction)




    
