from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
import os
from dotenv import load_dotenv
import joblib
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
import requests


app = FastAPI(title="RainCheckAUS ML API", version="1.0")


# Load environment variables from ml-models/.env if present
load_dotenv(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".env")))

# Load model at startup
MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "models", "xgb_model.pkl")
MODEL_PATH = os.path.abspath(MODEL_PATH)


def load_model():
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
    return joblib.load(MODEL_PATH)


model = None
scaler: Optional[StandardScaler] = None


# Determine feature order from preprocessed CSV header to ensure alignment
CSV_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data", "weather_preprocessed.csv"))
FEATURE_COLUMNS: List[str] = []
WINDDIR_MAPPINGS = {"WindDir-9AM": {}, "WindDir-3PM": {}}


def load_feature_columns() -> List[str]:
    if not os.path.exists(CSV_PATH):
        # Fallback to explicit list if CSV is missing (must match user-provided order)
        return [
            "MinTemp","MaxTemp","Rainfall","WindGustSpeed","WindDir-9AM","WindDir-3PM","WindSpeed-9AM","WindSpeed-3PM","Humidity-9AM","Humidity-3PM","Pressure-9AM","Pressure-3PM","Cloud-9AM","Temp-9AM","Temp-3PM","RainToday","RainTomorrow",
            "Location_Albany","Location_Albury","Location_AliceSprings","Location_BadgerysCreek","Location_Ballarat","Location_Bendigo","Location_Brisbane","Location_Cairns","Location_Canberra","Location_Cobar","Location_CoffsHarbour","Location_Dartmoor","Location_Darwin","Location_GoldCoast","Location_Hobart","Location_Katherine","Location_Launceston","Location_Melbourne","Location_MelbourneAirport","Location_Mildura","Location_Moree","Location_MountGambier","Location_MountGinini","Location_Newcastle","Location_Nhil","Location_NorahHead","Location_NorfolkIsland","Location_Nuriootpa","Location_PearceRAAF","Location_Penrith","Location_Perth","Location_PerthAirport","Location_Portland","Location_Richmond","Location_Sale","Location_SalmonGums","Location_Sydney","Location_SydneyAirport","Location_Townsville","Location_Tuggeranong","Location_Uluru","Location_WaggaWagga","Location_Walpole","Location_Watsonia","Location_Williamtown","Location_Witchcliffe","Location_Wollongong","Location_Woomera",
            "WindGustDir_ENE","WindGustDir_ESE","WindGustDir_N","WindGustDir_NE","WindGustDir_NNE","WindGustDir_NNW","WindGustDir_NW","WindGustDir_S","WindGustDir_SE","WindGustDir_SSE","WindGustDir_SSW","WindGustDir_SW","WindGustDir_W","WindGustDir_WNW","WindGustDir_WSW"
        ]
    # Read only header
    header = pd.read_csv(CSV_PATH, nrows=0).columns.tolist()
    # Drop Date if present; training dropped it
    header = [c for c in header if c != "Date"]
    return header


FEATURE_COLUMNS = load_feature_columns()


def load_winddir_mappings():
    if not os.path.exists(CSV_PATH):
        return
    try:
        sample = pd.read_csv(CSV_PATH, usecols=[c for c in ["WindDir-9AM", "WindDir-3PM"] if c in FEATURE_COLUMNS])
        for col in ["WindDir-9AM", "WindDir-3PM"]:
            if col in sample.columns:
                cats = sample[col].astype("category").cat.categories.tolist()
                WINDDIR_MAPPINGS[col] = {v: i for i, v in enumerate(cats)}
    except Exception:
        # Leave mappings empty; we'll fallback to 0
        pass


load_winddir_mappings()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")  # Set in environment

def get_lat_lon(city_name: str):
    if not OPENWEATHER_API_KEY:
        raise ValueError("OPENWEATHER_API_KEY not set in environment")
    url = (
        f"https://api.openweathermap.org/geo/1.0/direct?q={city_name}"
        f"&limit=1&appid={OPENWEATHER_API_KEY}"
    )
    resp = requests.get(url, timeout=10)
    if resp.status_code != 200:
        raise ValueError(
            f"Geocoding request failed (status {resp.status_code}): {resp.text[:200]}"
        )
    try:
        results = resp.json()
    except Exception:
        raise ValueError("Geocoding response was not valid JSON")
    if not isinstance(results, list) or len(results) == 0:
        raise ValueError(f"Could not get coordinates for {city_name}")
    data = results[0]
    return data["lat"], data["lon"]

def get_daily_weather(lat: float, lon: float):
    if not OPENWEATHER_API_KEY:
        raise ValueError("OPENWEATHER_API_KEY not set in environment")
    url = (
        "https://api.openweathermap.org/data/3.0/onecall"
        f"?lat={lat}&lon={lon}&exclude=current,minutely,hourly,alerts&units=metric&appid={OPENWEATHER_API_KEY}"
    )
    resp = requests.get(url, timeout=10)
    if resp.status_code != 200:
        raise ValueError(
            f"One Call request failed (status {resp.status_code}): {resp.text[:200]}"
        )
    try:
        data = resp.json()
    except Exception:
        raise ValueError("Weather response was not valid JSON")
    # Tomorrow is daily[1]
    try:
        tomorrow = data["daily"][1]
    except Exception:
        raise ValueError("Weather response missing expected daily forecast")
    return tomorrow

def map_openweather_daily_to_predict_request(location: str, daily_data: dict) -> "PredictRequest":
    """
    Convert a single day's OpenWeather daily data to PredictRequest format.
    Assumes API call is made with units=metric (°C, m/s, hPa).
    """

    # Temperatures (°C)
    MinTemp = daily_data["temp"]["min"]
    MaxTemp = daily_data["temp"]["max"]
    Temp_9AM = daily_data["temp"].get("morn", MinTemp)
    Temp_3PM = daily_data["temp"].get("day", MaxTemp)

    # Humidity (%)
    Humidity_9AM = Humidity_3PM = daily_data.get("humidity", 50)

    # Wind (m/s → km/h if model trained in km/h)
    wind_speed = daily_data.get("wind_speed", 0)
    WindSpeed_9AM = WindSpeed_3PM = wind_speed * 3.6   # convert m/s → km/h
    WindGustSpeed = daily_data.get("wind_gust", wind_speed) * 3.6
    wind_dir = deg_to_cardinal(daily_data.get("wind_deg", 0))
    WindDir_9AM = WindDir_3PM = WindGustDir = wind_dir

    # Rainfall (mm over the day)
    Rainfall = daily_data.get("rain", 0.0)
    RainToday = 0.0  # assume 0; could use today’s data separately

    # Pressure (hPa)
    Pressure_9AM = Pressure_3PM = daily_data.get("pressure", 1012)

    # Clouds (% normalized 0–1 if training expected normalized)
    Cloud_9AM = daily_data.get("clouds", 0) / 100.0

    # Build PredictRequest
    req = PredictRequest(
        MinTemp=MinTemp,
        MaxTemp=MaxTemp,
        Temp_9AM=Temp_9AM,
        Temp_3PM=Temp_3PM,
        Humidity_9AM=Humidity_9AM,
        Humidity_3PM=Humidity_3PM,
        WindGustSpeed=WindGustSpeed,
        WindSpeed_9AM=WindSpeed_9AM,
        WindSpeed_3PM=WindSpeed_3PM,
        WindDir_9AM=WindDir_9AM,
        WindDir_3PM=WindDir_3PM,
        WindGustDir=WindGustDir,
        Rainfall=Rainfall,
        RainToday=RainToday,
        Pressure_9AM=Pressure_9AM,
        Pressure_3PM=Pressure_3PM,
        Cloud_9AM=Cloud_9AM,
        Location=location
    )
    return req



def deg_to_cardinal(deg: float) -> str:
    """
    Convert wind degrees to nearest cardinal direction used in your model.
    """
    dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
    ix = round(deg / 22.5) % 16
    return dirs[ix]



class PredictRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    MinTemp: float
    MaxTemp: float
    Rainfall: float
    WindGustSpeed: float
    WindDir_9AM: str = Field(alias="WindDir-9AM")
    WindDir_3PM: str = Field(alias="WindDir-3PM")
    WindSpeed_9AM: float = Field(alias="WindSpeed-9AM")
    WindSpeed_3PM: float = Field(alias="WindSpeed-3PM")
    Humidity_9AM: float = Field(alias="Humidity-9AM")
    Humidity_3PM: float = Field(alias="Humidity-3PM")
    Pressure_9AM: float = Field(alias="Pressure-9AM")
    Pressure_3PM: float = Field(alias="Pressure-3PM")
    Cloud_9AM: float = Field(alias="Cloud-9AM")
    Temp_9AM: float = Field(alias="Temp-9AM")
    Temp_3PM: float = Field(alias="Temp-3PM")
    RainToday: float
    RainTomorrow: Optional[float] = None
    # Simpler location input: provide a single Location name; all one-hots default to False
    Location: Optional[str] = None
    Location_Albany: Optional[bool] = False
    Location_Albury: Optional[bool] = False
    Location_AliceSprings: Optional[bool] = False
    Location_BadgerysCreek: Optional[bool] = False
    Location_Ballarat: Optional[bool] = False
    Location_Bendigo: Optional[bool] = False
    Location_Brisbane: Optional[bool] = False
    Location_Cairns: Optional[bool] = False
    Location_Canberra: Optional[bool] = False
    Location_Cobar: Optional[bool] = False
    Location_CoffsHarbour: Optional[bool] = False
    Location_Dartmoor: Optional[bool] = False
    Location_Darwin: Optional[bool] = False
    Location_GoldCoast: Optional[bool] = False
    Location_Hobart: Optional[bool] = False
    Location_Katherine: Optional[bool] = False
    Location_Launceston: Optional[bool] = False
    Location_Melbourne: Optional[bool] = False
    Location_MelbourneAirport: Optional[bool] = False
    Location_Mildura: Optional[bool] = False
    Location_Moree: Optional[bool] = False
    Location_MountGambier: Optional[bool] = False
    Location_MountGinini: Optional[bool] = False
    Location_Newcastle: Optional[bool] = False
    Location_Nhil: Optional[bool] = False
    Location_NorahHead: Optional[bool] = False
    Location_NorfolkIsland: Optional[bool] = False
    Location_Nuriootpa: Optional[bool] = False
    Location_PearceRAAF: Optional[bool] = False
    Location_Penrith: Optional[bool] = False
    Location_Perth: Optional[bool] = False
    Location_PerthAirport: Optional[bool] = False
    Location_Portland: Optional[bool] = False
    Location_Richmond: Optional[bool] = False
    Location_Sale: Optional[bool] = False
    Location_SalmonGums: Optional[bool] = False
    Location_Sydney: Optional[bool] = False
    Location_SydneyAirport: Optional[bool] = False
    Location_Townsville: Optional[bool] = False
    Location_Tuggeranong: Optional[bool] = False
    Location_Uluru: Optional[bool] = False
    Location_WaggaWagga: Optional[bool] = False
    Location_Walpole: Optional[bool] = False
    Location_Watsonia: Optional[bool] = False
    Location_Williamtown: Optional[bool] = False
    Location_Witchcliffe: Optional[bool] = False
    Location_Wollongong: Optional[bool] = False
    Location_Woomera: Optional[bool] = False
    # Simpler gust direction: provide a single WindGustDir string; one-hots default to False
    WindGustDir: Optional[str] = None
    WindGustDir_ENE: Optional[bool] = False
    WindGustDir_ESE: Optional[bool] = False
    WindGustDir_N: Optional[bool] = False
    WindGustDir_NE: Optional[bool] = False
    WindGustDir_NNE: Optional[bool] = False
    WindGustDir_NNW: Optional[bool] = False
    WindGustDir_NW: Optional[bool] = False
    WindGustDir_S: Optional[bool] = False
    WindGustDir_SE: Optional[bool] = False
    WindGustDir_SSE: Optional[bool] = False
    WindGustDir_SSW: Optional[bool] = False
    WindGustDir_SW: Optional[bool] = False
    WindGustDir_W: Optional[bool] = False
    WindGustDir_WNW: Optional[bool] = False
    WindGustDir_WSW: Optional[bool] = False

    


class PredictResponse(BaseModel):
    prediction: int
    probability: float


@app.on_event("startup")
def _startup():
    global model, scaler
    model = load_model()
    # Fit StandardScaler to mirror training preprocessing on preprocessed dataset
    try:
        df = pd.read_csv(CSV_PATH)
        if "Date" in df.columns:
            df = df.drop(columns=["Date"])
        # Encode wind dirs to category codes just like training did
        for col in ["WindDir-9AM", "WindDir-3PM"]:
            if col in df.columns:
                df[col] = df[col].astype("category").cat.codes
        if "RainTomorrow" in df.columns:
            X = df.drop("RainTomorrow", axis=1)
        else:
            X = df.copy()
        scaler = StandardScaler()
        scaler.fit(X)
    except Exception:
        scaler = None


@app.get("/")
def root():
    return {"status": "ok", "model_path": MODEL_PATH, "num_features": len(FEATURE_COLUMNS)}


def to_dataframe(req: PredictRequest) -> pd.DataFrame:
    data_dict = req.dict(by_alias=True)
    # If RainTomorrow present in incoming data, drop it for prediction
    if "RainTomorrow" in data_dict:
        data_dict.pop("RainTomorrow")
    # If user provided a single Location, one-hot it and set others to 0
    location_cols = [c for c in FEATURE_COLUMNS if c.startswith("Location_")]
    if "Location" in data_dict and data_dict["Location"] is not None:
        # reset all to 0
        for c in location_cols:
            data_dict[c] = 0
        loc_key = f"Location_{data_dict['Location']}"
        if loc_key in location_cols:
            data_dict[loc_key] = 1
        # remove the simple Location field
        data_dict.pop("Location", None)
    # If user provided a single WindGustDir, one-hot it and set others to 0
    gust_cols = [c for c in FEATURE_COLUMNS if c.startswith("WindGustDir_")]
    if "WindGustDir" in data_dict and data_dict["WindGustDir"] is not None:
        for c in gust_cols:
            data_dict[c] = 0
        gust_key = f"WindGustDir_{data_dict['WindGustDir']}"
        if gust_key in gust_cols:
            data_dict[gust_key] = 1
        data_dict.pop("WindGustDir", None)
    # Convert booleans to 0/1
    for key, value in list(data_dict.items()):
        if isinstance(value, bool):
            data_dict[key] = 1 if value else 0
    # Encode wind direction categorical strings to category codes learned from training CSV
    for wind_col in ["WindDir-9AM", "WindDir-3PM"]:
        if wind_col in data_dict:
            raw_val = data_dict[wind_col]
            mapping = WINDDIR_MAPPINGS.get(wind_col, {})
            data_dict[wind_col] = mapping.get(raw_val, 0)
    # Ensure all expected columns exist; fill missing with 0
    row = {col: data_dict.get(col, 0) for col in FEATURE_COLUMNS if col != "RainTomorrow" and col != "Date"}
    df = pd.DataFrame([row])
    return df


@app.post("/predict", response_model=PredictResponse)
def predict(payload: PredictRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    df = to_dataframe(payload)
    try:
        # XGBoost model typically accepts numpy array or DataFrame
        y_proba = None
        X_in = df
        if scaler is not None:
            # Apply the same scaling used during training
            X_in = scaler.transform(X_in)
        if hasattr(model, "predict_proba"):
            proba = model.predict_proba(X_in)  # shape (1,2)
            y_proba = float(proba[0, 1])
        else:
            # If model doesn't support predict_proba, use decision_function or fallback
            pred = model.predict(X_in)
            y_proba = float(np.clip(pred.astype(float), 0.0, 1.0)) if hasattr(pred, "astype") else float(pred)
        y_pred = 1 if y_proba >= 0.5 else 0
        return PredictResponse(prediction=y_pred, probability=y_proba)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction failed: {e}")

@app.get("/predict_from_location", response_model=PredictResponse)
def predict_from_location(city: str):
    """
    Get tomorrow's forecast for a city from OpenWeather, map it to model features,
    and return the rain prediction.
    """
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")

    try:
        # 1. Get coordinates
        lat, lon = get_lat_lon(city)

        # 2. Get tomorrow's daily forecast
        tomorrow_data = get_daily_weather(lat, lon)

        # 3. Map OpenWeather daily data to PredictRequest
        predict_req = map_openweather_daily_to_predict_request(city, tomorrow_data)

        # 4. Convert to DataFrame for the model
        df = to_dataframe(predict_req)

        # 5. Apply scaler if available
        X_in = df
        if scaler is not None:
            X_in = scaler.transform(X_in)

        # 6. Run prediction
        if hasattr(model, "predict_proba"):
            proba = model.predict_proba(X_in)
            y_proba = float(proba[0, 1])
        else:
            pred = model.predict(X_in)
            y_proba = float(np.clip(pred.astype(float), 0.0, 1.0)) if hasattr(pred, "astype") else float(pred)

        y_pred = 1 if y_proba >= 0.5 else 0

        return PredictResponse(prediction=y_pred, probability=y_proba)

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction from location failed: {e}")


# Uvicorn entrypoint helper for local run:
def start():
    import uvicorn
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000, reload=True)


