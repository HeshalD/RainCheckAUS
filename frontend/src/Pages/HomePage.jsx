import { useState } from "react";
import axios from "axios";

function RainChecker() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/raincheck/${city}`);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching prediction");
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border px-2 py-1"
      />
      <button onClick={handleCheck} className="ml-2 px-4 py-1 bg-blue-500 text-white rounded">
        Check
      </button>

      {result && (
        <div className="mt-4">
          <p>
            Prediction: {result.prediction === 1 ? "🌧️ Rain" : "☀️ No Rain"}
          </p>
          <p>Probability: {(result.probability * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

export default RainChecker;
