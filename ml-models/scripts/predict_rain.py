import pandas as pd
import joblib

# Load pipeline
pipeline = joblib.load("logistic_weather_pipeline.pkl")
print("✅ Pipeline loaded successfully!")

# Function to get user input
def get_user_input():
    numeric_features = {}
    for feature in ['MinTemp','MaxTemp','Rainfall','WindGustSpeed',
                    'WindSpeed-9AM','WindSpeed-3PM','Humidity-9AM','Humidity-3PM',
                    'Pressure-9AM','Pressure-3PM','Cloud-9AM','Temp-9AM','Temp-3PM']:
        numeric_features[feature] = float(input(f"{feature}: "))

    categorical_features = {}
    for feature in ['RainToday','WindDir-9AM','WindDir-3PM','Location_Encoded']:
        if feature == 'RainToday':
            categorical_features[feature] = int(input("RainToday (1 = Yes, 0 = No): "))
        else:
            categorical_features[feature] = input(f"{feature.replace('_',' ')}: ").upper()

    return pd.DataFrame([{**numeric_features, **categorical_features}])

# Get input and predict
X_new = get_user_input()
y_pred = pipeline.predict(X_new)
y_prob = pipeline.predict_proba(X_new)

print("\nPrediction (0 = No Rain, 1 = Rain):", y_pred[0])
print("Probability of No Rain / Rain:", y_prob[0])
