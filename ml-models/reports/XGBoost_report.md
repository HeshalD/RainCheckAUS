# XGBoost Classifier

XGBoost (Extreme Gradient Boosting) is a gradient boosting ensemble algorithm that builds trees sequentially, each correcting errors of the previous one. It is known for speed, scalability, and high predictive power on structured data.

## Data Preparation

- Dropped **Date** column.  
- Encoded **WindDir-9AM**, **WindDir-3PM** as categorical codes.  
- 80-20 train-test split with stratification.  
- Calculated `scale_pos_weight ≈ 3.55` to balance classes.

## Hyperparameter Configuration

After tuning, the best setup was:

- `n_estimators = 800`  
- `learning_rate = 0.1`  
- `max_depth = 8`  
- `subsample = 0.8`, `colsample_bytree = 0.8`  
- `scale_pos_weight = 3.55`  
- Threshold adjusted from **0.5 → 0.75** for better rain recall.

## Results

**Accuracy:** 85.7%

| Class | Precision | Recall | F1-Score | Support |
|--------|------------|---------|-----------|----------|
| 0 (No Rain) | 0.87 | 0.96 | 0.91 | 16460 |
| 1 (Rain) | 0.77 | 0.50 | 0.60 | 4632 |

**Confusion Matrix**

| Actual / Predicted | No Rain | Rain |
|--------------------|----------|------|
| No Rain | 15760 | 700 |
| Rain | 2323 | 2309 |

## Interpretation

- Delivered **highest accuracy** among tested models.  
- Maintained excellent recall for No Rain and moderate recall for Rain.  
- Threshold tuning improved minority detection substantially.  
- Offered a robust trade-off between accuracy and generalization.