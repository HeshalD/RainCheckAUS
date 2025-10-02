import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Load preprocessed data
df = pd.read_csv("../data/weather_preprocessed.csv")

# Handle Date
df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
df = df.drop(columns=["Date"])  # Drop Date

# Encode categorical features
for col in ["WindDir-9AM", "WindDir-3PM"]:
    if col in df.columns:
        df[col] = df[col].astype("category").cat.codes

# Split features and target
X = df.drop("RainTomorrow", axis=1)
y = df["RainTomorrow"]

x_train, x_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Scale features (important for SVM)
scaler = StandardScaler()
x_train_scaled = scaler.fit_transform(x_train)
x_test_scaled = scaler.transform(x_test)

# Define SVM model
svm_model = SVC(
    kernel="rbf",        # Radial Basis Function kernel (works well for non-linear data)
    C=1.0,              # Regularization parameter
    gamma="scale",      # Kernel coefficient
    probability=True,   # Enable probability estimates (slower, but useful for thresholds)
    random_state=42
)

# Train
svm_model.fit(x_train_scaled, y_train)

# Predict probabilities for threshold tuning
y_proba = svm_model.predict_proba(x_test_scaled)[:, 1]

# Apply threshold (default is 0.5, you can tune this)
threshold = 0.5
y_pred = (y_proba >= threshold).astype(int)

# Evaluation
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))
print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))
