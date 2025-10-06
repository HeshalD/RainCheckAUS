# RainCheckAUS

**RainCheckAUS** is a full-stack application that predicts the likelihood of rain in Australian cities using machine learning.  
It features a React frontend, a Node.js/Express backend, and a FastAPI-based ML microservice.

---

## Features

- **Weather Prediction**: Enter an Australian city to get a rain prediction and probability.
- **Modern UI**: Responsive React frontend styled with Tailwind CSS.
- **RESTful API**: Node.js backend communicates with the ML model and serves the frontend.
- **Machine Learning**: FastAPI service runs trained models (XGBoost, Logistic Regression) for inference.
- **Dockerized**: All components run in containers for consistency and portability.

---

## Project Structure

```
RainCheckAUS/
├── backend/          # Node.js/Express API server
├── frontend/         # React web application
├── ml-models/        # Machine learning models and FastAPI service
├── docker-compose.yml
└── README.md
```

---

## Technology Stack

### Backend
- **Tech:** Node.js, Express, Mongoose, JWT, CORS, Axios
- **Endpoints:** `/raincheck/:city` (fetches prediction from ML API), `/health`
- **Config:** Reads environment variables for ML API URL

### Frontend
- **Tech:** React, React Router, Axios, Tailwind CSS
- **Features:** Home, About, How It Works, Weather prediction page
- **Scripts:** `npm start`, `npm run build`, `npm test`

### ML Models
- **Tech:** FastAPI, scikit-learn, xgboost, pandas, joblib
- **Endpoints:** `/predict_from_location`, `/health`
- **Models:** Pretrained and stored in `ml-models/models/`
- **Dependencies:** See `requirements.txt`

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (for local development)
- Python 3.10+ (for ML service, if running outside Docker)

---

### Quick Start (Docker)

1. **Clone the repo:**
    ```sh
    git clone https://github.com/HeshalD/RainCheckAUS.git
    cd RainCheckAUS
    ```

2. **Start all services:**
    ```sh
    docker-compose up --build
    ```

3. **Access the frontend:**
    - Visit [http://localhost:3000](http://localhost:3000) in your browser

---

### Manual Setup

#### Backend
```sh
cd backend
npm install
npm start
```

#### Frontend
```sh
cd frontend
npm install
npm start
```

#### ML API
```sh
cd ml-models/api
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## Configuration

- Set environment variables in `.env` files for API keys and service URLs.
- **ML API requires:**  
  - `OPENWEATHER_API_KEY`  
  - `MODEL_PATH`

---

> For more details, refer to individual README files in each subdirectory.
