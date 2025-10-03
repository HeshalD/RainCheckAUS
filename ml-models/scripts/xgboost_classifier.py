import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import time
from tqdm import tqdm

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

# Scale features
scaler = StandardScaler()
x_train_scaled = scaler.fit_transform(x_train)
x_test_scaled = scaler.transform(x_test)

# Define SVM
svm_model = SVC(
    kernel="rbf",
    C=1.0,
    gamma="scale",
    probability=True,
    random_state=42
)

# Simulate progress bar during training
print("Training SVM (this might take some time)...")
start_time = time.time()
for _ in tqdm(range(1), desc="Fitting model"):
    svm_model.fit(x_train_scaled, y_train)
end_time = time.time()

print(f"\n✅ Training completed in {end_time - start_time:.2f} seconds")

# Predict probabilities
y_proba = svm_model.predict_proba(x_test_scaled)[:, 1]

# Apply threshold
threshold = 0.5
y_pred = (y_proba >= threshold).astype(int)

# Evaluation
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))
print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))
