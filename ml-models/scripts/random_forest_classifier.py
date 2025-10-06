import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import StandardScaler
import joblib
import os

# === Load preprocessed dataset ===
df = pd.read_csv("../data/weather_preprocessed.csv")

# Drop 'Date' column (non-predictive)
if "Date" in df.columns:
    df = df.drop(columns=["Date"])

# Encode categorical wind direction features
for col in ["WindDir-9AM", "WindDir-3PM"]:
    if col in df.columns:
        df[col] = df[col].astype("category").cat.codes

# Split data into features and target
X = df.drop("RainTomorrow", axis=1)
y = df["RainTomorrow"]

# Split into train and test sets
x_train, x_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# === Feature Scaling ===
scaler = StandardScaler()
x_train_scaled = scaler.fit_transform(x_train)
x_test_scaled = scaler.transform(x_test)

# === Define Random Forest Model ===
model = RandomForestClassifier(
    n_estimators=400,
    max_depth=10,
    min_samples_split=4,
    min_samples_leaf=2,
    max_features="sqrt",
    class_weight="balanced",
    random_state=42,
    n_jobs=-1,  # Use all CPU cores for faster training
    verbose=1
)

# === Train the model ===
print("Training Random Forest model...")
model.fit(x_train_scaled, y_train)

# === Evaluate the model ===
y_pred = model.predict(x_test_scaled)

accuracy = accuracy_score(y_test, y_pred)
print(f"\nAccuracy: {accuracy:.4f}\n")

print("Classification Report:\n", classification_report(y_test, y_pred))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))

# === Save model and scaler ===
os.makedirs("../models", exist_ok=True)
joblib.dump(model, "../models/random_forest_model.pkl")
joblib.dump(scaler, "../models/random_forest_scaler.pkl")

print("\n✅ Model and scaler saved successfully to '../models/'")
