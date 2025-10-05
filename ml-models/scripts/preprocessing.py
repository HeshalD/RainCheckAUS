import pandas as pd
import numpy as np

def handle_missing_values(df: pd.DataFrame) -> pd.DataFrame:
    """
    Handle missing values in the dataset:
    - Drop columns with >40% missing values
    - Impute numerical columns with median
    - Impute categorical columns with mode
    """
    threshold = 0.6 * len(df)  # keep only columns with at least 60% valid data
    df = df.dropna(axis=1, thresh=threshold)

    numerical = df.select_dtypes(include=[np.number]).columns
    categorical = df.select_dtypes(include=["object"]).columns

    for column in numerical:
        if df[column].isnull().sum() > 0:
            df[column].fillna(df[column].median(), inplace=True)

    for column in categorical:
        if df[column].isnull().sum() > 0:
            df[column].fillna(df[column].mode()[0], inplace=True)
    return df


def encode_categorical(df: pd.DataFrame) -> pd.DataFrame:
    """
    Encode categorical variables:
    - Map RainToday & RainTomorrow (Yes/No -> 1/0)
    - One-hot encode wind directions and location
    """
    if 'RainTomorrow' in df.columns:
        df['RainTomorrow'] = df['RainTomorrow'].map({'Yes': 1, 'No': 0})
    if 'RainToday' in df.columns:
        df['RainToday'] = df['RainToday'].map({'Yes': 1, 'No': 0})

    categorical_features = ['Location', 'WindGustDir', 'WindDir9am', 'WindDir3pm']
    for col in categorical_features:
        if col in df.columns:
            dummies = pd.get_dummies(df[col], prefix=col, drop_first=True)
            df = pd.concat([df, dummies], axis=1)
            df.drop(col, axis=1, inplace=True)

    return df


def handle_skewness(df: pd.DataFrame) -> pd.DataFrame:
    """
    Apply log transformation to skewed numerical features.
    """
    skewed_features = ['Rainfall', 'WindGustSpeed', 'WindSpeed-9AM', 'WindSpeed-3PM']

    for col in skewed_features:
        if col in df.columns:
            df[col] = np.log1p(df[col])  # log(1 + x)

    return df


def scaling_normalization(df: pd.DataFrame) -> pd.DataFrame:
    """
    Scale numerical features using MinMaxScaler.
    """
    from sklearn.preprocessing import MinMaxScaler

    scaler = MinMaxScaler()
    numerical = df.select_dtypes(include=[np.number]).columns

    df[numerical] = scaler.fit_transform(df[numerical])

    return df


if __name__ == "__main__":
    df = pd.read_csv("../data/weather.csv")

    print("Before handling missing values:", df.isnull().sum().sum(), "missing values")
    
    df_clean = handle_missing_values(df)
    print("After handling missing values:", df_clean.isnull().sum().sum(), "missing values")

    df_encoded = encode_categorical(df_clean)
    print("Encoded dataframe shape:", df_encoded.shape)

    df_skewed = handle_skewness(df_encoded)
    print("Applied skewness handling. Sample data:")
    print(df_skewed.head())

    df_scaled = scaling_normalization(df_skewed)
    print("Scaled dataframe sample data:")
    print(df_scaled.head())

    # Save preprocessed data
    df_scaled.to_csv("../data/weather_preprocessed.csv", index=False)
    print("Preprocessed data saved!")
