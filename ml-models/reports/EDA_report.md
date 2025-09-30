Exploratory Data Analysis (EDA) Report
1. Objective

The goal of this EDA is to understand the structure, quality, and relationships in the dataset in order to guide data preprocessing and feature engineering for predicting RainTomorrow.

2. Missing Values
Feature	Missing %
Evaporation	43.15%
Sunlight	48.04%
Cloud-3PM	40.79%

Observations:

These three features have more than 40% missing values, which makes imputation unreliable.

Other columns contain manageable levels of missingness that can be imputed with mean, median, mode, or domain-specific values.

Action Items:

Consider dropping Evaporation, Sunlight, and Cloud-3PM.

Apply imputation (mean/median/mode) for features with lower missingness.

3. Feature–Target Correlation

Target variable: RainTomorrow

Feature	Correlation with Target
RainToday	0.4055
Humidity-3PM	0.3975
Cloud-3PM	0.3586
Cloud-9AM	0.3024
Humidity-9AM	0.2294
Rainfall	0.2244
WindGustSpeed	0.2139
Temp-9AM	-0.0207

Observations:

RainToday, Humidity-3PM, and Cloud-3PM show moderate positive correlation with the target. These are important predictors.

Features like Temp-9AM show very weak correlation and may have limited predictive value.

Action Items:

Prioritize highly correlated features during modeling.

Reassess weakly correlated features during feature selection (may drop if they don’t improve performance).

4. Skewness Analysis
Feature	Skewness
Rainfall	9.89
Evaporation	4.09
RainToday	1.63
RainTomorrow	1.62

Observations:

Rainfall and Evaporation are heavily skewed.

Moderate skew in binary target-related columns is expected.

Action Items:

Apply log transformation or power transformation to reduce skewness of Rainfall and Evaporation.

This will help stabilize variance and improve model performance.

5. Next Steps for Preprocessing

Handle Missing Data

Drop high-missing columns (Evaporation, Sunlight, Cloud-3PM).

Impute remaining missing values.

Address Skewness

Apply log transform to Rainfall and possibly Evaporation.

Scale Numerical Features

Apply standardization (Z-score) or MinMax scaling to ensure balanced input for models.

Encode Categorical Variables

Convert target RainTomorrow → Yes=1, No=0.

Apply one-hot encoding or label encoding to other categorical features.

Feature Selection

Keep correlated features (RainToday, Humidity-3PM, Cloud-3PM).

Reevaluate weak predictors (Temp-9AM) after initial modeling.

6. Conclusion

The EDA reveals that:

Some features have too many missing values to be useful.

A few strong predictors exist (e.g., RainToday, Humidity-3PM).

Skewness must be addressed for stable model performance.

These insights will directly inform preprocessing, feature engineering, and model building in the next phase of the project.