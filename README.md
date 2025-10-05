# RainCheckAUS
RainCheckAUS
RainCheckAUS is a full-stack application that predicts the likelihood of rain in Australian cities using machine learning. It features a React frontend, a Node.js/Express backend, and a FastAPI-based ML microservice. The project is containerized with Docker for easy deployment.

Features
Weather Prediction: Enter an Australian city to get a rain prediction and probability.
Modern UI: Responsive React frontend styled with Tailwind CSS.
RESTful API: Node.js backend communicates with the ML model and serves the frontend.
Machine Learning: FastAPI service runs trained models (XGBoost, Logistic Regression) for inference.
Dockerized: All components run in containers for consistency and portability.
Project Structure

RainCheckAUS/
├── backend/         # Node.js/Express API server
├── frontend/        # React web application
├── ml-models/       # Machine learning models and FastAPI service
├── docker-compose.yml
└── README.md

Backend
Tech: Node.js, Express, Mongoose, JWT, CORS, Axios
Endpoints: /raincheck/:city (fetches prediction from ML API), /health
Config: Reads environment variables for ML API URL
Frontend
Tech: React, React Router, Axios, Tailwind CSS
Features: Home, About, How It Works, Weather prediction page
Scripts: npm start, npm run build, npm test
ML Models
Tech: FastAPI, scikit-learn, xgboost, pandas, joblib
Endpoints: /predict_from_location, /health
Models: Pretrained and stored in ml-models/models/
Dependencies: See requirements.txt


Getting Started
Prerequisites
Docker & Docker Compose
Node.js (for local dev)
Python 3.10+ (for ML service, if running outside Docker)
Quick Start (Docker)
Clone the repo:

git clone https://github.com/HeshalD/RainCheckAUS.gitcd RainCheckAUS
Start all services:

docker-compose up --build
Access the frontend at http://localhost:3000

Manual Setup

Backend
cd backend
npm install
npm start

Frontend
cd frontend
npm install
npm start

ML API

cd ml-models/api
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000

Configuration
Set environment variables in .env files for API keys and service URLs.
ML API requires OPENWEATHER_API_KEY and MODEL_PATH.

License
MIT

Would you like this README saved to your project root, or do you want to customize any section?

GPT-4.1 • 1x
