Preprocessing Report
1. Introduction

The raw weather dataset (2017–2022) contained numerical, categorical, and target variables. Before training our classification model, we applied several preprocessing steps to clean, transform, and standardize the data. This ensures that the input features are consistent, interpretable, and suitable for machine learning algorithms.

2. Preprocessing Steps
Step 1: Handling Missing Values

Action Taken:

Columns with more than 40% missing values were dropped:

Evaporation

Sunlight

Cloud-3PM

For remaining numerical columns, missing values were imputed with the median.

For categorical columns, missing values were imputed with the mode.

Reasoning:
Dropping high-missing columns prevents unreliable imputations, while median/mode ensures robustness against outliers and preserves feature distributions.

Step 2: Encoding Categorical Variables

Action Taken:

Binary categorical variables (RainToday, RainTomorrow) were encoded as:

Yes → 1

No → 0

Multi-class categorical variables were one-hot encoded with dummy variables:

Location → Location_[city]

WindGustDir → WindGustDir_[direction]

WindDir9am → WindDir9am_[direction]

WindDir3pm → WindDir3pm_[direction]

Reasoning:
Encoding categorical features into numerical form allows the model to process them effectively. One-hot encoding preserves category information without imposing an artificial ordinal relationship.

Step 3: Handling Skewness

Action Taken:

Applied log transformation (log1p) to highly skewed variables:

Rainfall

WindGustSpeed

WindSpeed-9AM

WindSpeed-3PM

Reasoning:
Log transformation reduces skewness, normalizes the feature distributions, and prevents extreme values (outliers) from dominating model training.

Step 4: Scaling / Normalization

Action Taken:

Applied StandardScaler (Z-score normalization) to all numerical features.

Resulting transformed features now have:

Mean ≈ 0

Standard Deviation = 1

Reasoning:
Standardization ensures that all features contribute equally to the model by putting them on a comparable scale. This is particularly important for algorithms sensitive to feature magnitudes (e.g., Logistic Regression, Neural Networks, SVM).

3. Outcome of Preprocessing

The dataset has been cleaned, transformed, and standardized.

Final dataset:

All numeric features scaled (mean ~0, std = 1).

Categorical features one-hot encoded into dummy variables.

Target variable (RainTomorrow) encoded as binary (0/1).

The processed dataset now contains approximately 80–120 columns (depending on the number of unique locations and wind directions).

The data is ready for train-test splitting and model training.

4. Next Steps

Perform train-test split to separate data into training and testing sets.

Begin model training with different classification algorithms (e.g., Logistic Regression, Random Forest, XGBoost).

Evaluate model performance using metrics such as Accuracy, Precision, Recall, and F1-score.