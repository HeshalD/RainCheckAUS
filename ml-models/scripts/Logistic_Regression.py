import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import joblib

# -----------------------------
# 1️⃣ Load dataset
# -----------------------------
df = pd.read_csv("weather_preprocessed.csv")
df = df.drop(["Date"], axis=1)

# Convert target and RainToday to numeric
df['RainTomorrow'] = df['RainTomorrow'].astype(int)
df['RainToday'] = df['RainToday'].astype(int)

# -----------------------------
# 2️⃣ Define features
# -----------------------------
numeric_features = ['MinTemp','MaxTemp','Rainfall','WindGustSpeed',
                    'WindSpeed-9AM','WindSpeed-3PM','Humidity-9AM','Humidity-3PM',
                    'Pressure-9AM','Pressure-3PM','Cloud-9AM','Temp-9AM','Temp-3PM']
categorical_features = ['RainToday','WindDir-9AM','WindDir-3PM','Location_Encoded']

# If Location is not already encoded, create 'Location_Encoded'
df['Location_Encoded'] = df.filter(like='Location_').idxmax(axis=1).str.replace('Location_', '')

# -----------------------------
# 3️⃣ Split features and target
# -----------------------------
X = df[numeric_features + categorical_features]
y = df['RainTomorrow']

# -----------------------------
# 4️⃣ Preprocessing & Pipeline
# -----------------------------
preprocessor = ColumnTransformer(
    transformers=[
        ('num', 'passthrough', numeric_features),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
    ]
)

pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', LogisticRegression(max_iter=1000))
])

# -----------------------------
# 5️⃣ Split data into train and test
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# -----------------------------
# 6️⃣ Train the model
# -----------------------------
pipeline.fit(X_train, y_train)

# -----------------------------
# 7️⃣ Evaluate the model
# -----------------------------
y_pred = pipeline.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print("✅ Model Evaluation:")
print(f"Accuracy: {accuracy:.4f}")
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# -----------------------------
# 8️⃣ Save the pipeline
# -----------------------------
joblib.dump(pipeline, 'logistic_weather_pipeline.pkl')
print("✅ Pipeline saved successfully!")
