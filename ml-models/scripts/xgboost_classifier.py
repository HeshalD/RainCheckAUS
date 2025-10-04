import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from xgboost import XGBClassifier
import joblib
import numpy as np

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

# Compute class weight for imbalance
scale_pos_weight = len(y_train[y_train == 0]) / len(y_train[y_train == 1])
print(f"scale_pos_weight: {scale_pos_weight:.2f}")

# Define XGBoost model with class balancing
model = XGBClassifier(
    n_estimators=200,
    learning_rate=0.05,
    max_depth=6,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
    use_label_encoder=False,
    eval_metric="logloss",
    scale_pos_weight=scale_pos_weight,   # 💡 important for class imbalance
    verbosity=1
)

# Train
model.fit(x_train, y_train, eval_set=[(x_test, y_test)], verbose=True)

# Predict probabilities instead of hard labels
y_proba = model.predict_proba(x_test)[:, 1]

# Apply threshold tuning
threshold = 0.4   # Lower than 0.5 to catch more rainy days
y_pred = (y_proba >= threshold).astype(int)

# Evaluation
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))
print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))

# Optionally save model
joblib.dump(model, "../models/xgb_model.pkl")
