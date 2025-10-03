import express from "express";
import axios from "axios";
import cors from "cors";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow frontend (React) requests
app.use(cors());
app.use(express.json());

// Base URL of your FastAPI service
const FASTAPI_URL = process.env.FASTAPI_URL || "http://fastapi:8000";

// Route: user enters city -> backend calls FastAPI -> return result
app.get("/raincheck/:city", async (req, res) => {
  const city = req.params.city;

  try {
    const response = await axios.get(`${FASTAPI_URL}/predict_from_location`, {
      params: { city },
    });

    return res.json(response.data); 
    // Example response: { "prediction": 1, "probability": 0.72 }

  } catch (error) {
    console.error("Prediction fetch error:", error.message);
    return res.status(500).json({
      error: "Failed to fetch prediction",
      details: error.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log(`Connecting to FastAPI at ${FASTAPI_URL}`);
});
