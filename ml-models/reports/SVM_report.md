# Support Vector Machine Classifier (SVM)

Support Vector Machine (SVM) is a supervised learning algorithm that finds an optimal hyperplane separating different classes. Using the RBF kernel, it can model non-linear decision boundaries efficiently.

## Data Preparation

- Dropped **Date** column.  
- Encoded **WindDir-9AM**, **WindDir-3PM**.  
- Applied **StandardScaler** to all numerical features.  
- Performed **80-20 stratified split** for class balance.

## Hyperparameter Configuration

- `kernel = "rbf"`  
- `C = 1.0` (regularization strength)  
- `gamma = "scale"` (automatic kernel coefficient)  
- `probability = True`  
- `random_state = 42`

## Results

**Accuracy:** 84.5%

| Class | Precision | Recall | F1-Score | Support |
|--------|------------|---------|-----------|----------|
| 0 (No Rain) | 0.86 | 0.95 | 0.90 | 16460 |
| 1 (Rain) | 0.68 | 0.36 | 0.47 | 4632 |

**Confusion Matrix**

| Actual / Predicted | No Rain | Rain |
|--------------------|----------|------|
| No Rain | 15560 | 900 |
| Rain | 2972 | 1660 |

## Interpretation

- Accurately identified No Rain days with strong precision.  
- Rain recall was lower, typical for SVMs on imbalanced data.  
- Scaling played a major role in maintaining model stability.  
- Overall, achieved competitive accuracy though less efficient than ensemble methods.