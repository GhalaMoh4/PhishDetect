from flask import Flask, render_template, request
import pandas as pd 
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import numpy as np

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict')
def predict():
    return render_template('predict.html')

@app.route('/result', methods=['GET', 'POST'])
def result():
    if request.method == 'POST':
        df=pd.read_csv('Phishing_Legitimate_Importance.csv')
        cols = ['NumDots', 'SubdomainLevel', 'UrlLength', 'NumDash', 'AtSymbol','TildeSymbol', 'NumUnderscore',
                'NumPercent', 'NumAmpersand', 'NumHash','NumNumericChars', 'NoHttps', 'RandomString', 
                'NumSensitiveWords','PctExtHyperlinks', 'InsecureForms', 'AbnormalFormAction','MissingTitle']
        x = df[cols].values
        y = df['CLASS_LABEL']
        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=40)

        # Scale the feature set using Min-Max scaling
        from sklearn.preprocessing import MinMaxScaler
        n_scaler = MinMaxScaler()
        X_train_scaled = n_scaler.fit_transform(x_train.astype(float))
        X_test_scaled = n_scaler.transform(x_test.astype(float))
        # Train a Random Forest model
        rf_model = RandomForestClassifier(n_estimators=200, min_samples_split = 2,min_samples_leaf= 1, max_features = 'auto',  max_depth = 20)
        rf_model.fit(X_train_scaled, y_train)

        val1= float(request.form['n1'])
        val2= float(request.form['n2'])
        val3= float(request.form['n3'])
        val4= float(request.form['n4'])
        val5= float(request.form['n5'])
        val6= float(request.form['n6'])
        val7= float(request.form['n7'])
        val8= float(request.form['n8'])
        val9= float(request.form['n9'])
        val10= float(request.form['n10'])
        val11= float(request.form['n11'])
        val12= float(request.form['n12'])
        val13= float(request.form['n13'])
        val14= float(request.form['n14'])
        val15= float(request.form['n15'])
        val16= float(request.form['n16'])
        val17= float(request.form['n17'])
        val18= float(request.form['n18'])
        pred = rf_model.predict(np.array([[val1,val2,val3,val4,val5,val6,val7,val8,val9,val10,val11,val12,val13,val14,val15,val16,val17,val18]]).reshape(1,-1))
        result =""
        if pred ==[1]:
            result= "Phishing"
        else:
            result= "Safe"

        return render_template('predict.html', result=result)
    else:
        return "Invalid request"

if __name__ == '__main__':
    app.run(debug=True)