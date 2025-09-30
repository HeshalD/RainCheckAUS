import pandas as pd
import numpy as np

test_df = pd.read_csv("../data/weather_preprocessed.csv")
print(test_df.shape)
print(test_df.head())

print("Missing values in test data:", end=" ")
print(test_df.isnull().sum().sum())

print(test_df.describe())


