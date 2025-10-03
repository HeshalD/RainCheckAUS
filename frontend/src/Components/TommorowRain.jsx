import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaChevronDown,
  FaCloudRain,
  FaCloudShowersHeavy,
  FaSun,
  FaCloud,
  FaThermometerHalf,
  FaSun as FaUvIndex,
  FaTint,
  FaWind,
  FaWater,
} from "react-icons/fa";

const TomorrowRain = () => {
  const [selectedLocation, setSelectedLocation] = useState("Sydney, Australia");
  const [selectedDate, setSelectedDate] = useState("");
  const [weatherDetails, setWeatherDetails] = useState([]);
  const [recentForecasts, setRecentForecasts] = useState([]);
  const [rainPrediction, setRainPrediction] = useState(null); // from backend
  const [rainProbability, setRainProbability] = useState(null);

  const OPENWEATHER_KEY = "";

  const cityCoords = {
    "Sydney, Australia": { lat: -33.8688, lon: 151.2093 },
    "Melbourne, Australia": { lat: -37.8136, lon: 144.9631 },
    "Brisbane, Australia": { lat: -27.4698, lon: 153.0251 },
    "Perth, Australia": { lat: -31.9505, lon: 115.8605 },
  };

  // Fetch backend prediction
  const fetchRainPrediction = async (city) => {
    try {
      const res = await axios.get(`http://localhost:5000/raincheck/${city}`);
      setRainPrediction(res.data.prediction === 1 ? "YES" : "NO");
      setRainProbability((res.data.probability * 100).toFixed(2));
    } catch (err) {
      console.error("Backend error:", err);
      setRainPrediction("N/A");
    }
  };

  // Fetch weather details from OpenWeather
  const fetchWeather = async () => {
    try {
      const { lat, lon } = cityCoords[selectedLocation];
      const res = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${OPENWEATHER_KEY}`
      );

      const today = res.data.daily[0];
      const date = new Date(today.dt * 1000).toLocaleDateString("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "short",
      });
      setSelectedDate(date);

      // Weather details
      setWeatherDetails([
        {
          label: "Temperature",
          icon: <FaThermometerHalf className="text-xl text-blue-600" />,
          value: `${today.temp.day}°C`,
        },
        {
          label: "UV Index",
          icon: <FaUvIndex className="text-xl text-yellow-500" />,
          value: today.uvi,
        },
        {
          label: "Humidity",
          icon: <FaTint className="text-xl text-blue-500" />,
          value: `${today.humidity}%`,
        },
        {
          label: "Wind Speed",
          icon: <FaWind className="text-xl text-gray-600" />,
          value: `${today.wind_speed} km/h`,
        },
        {
          label: "Pressure",
          icon: <FaWater className="text-xl text-blue-400" />,
          value: `${today.pressure} hPa`,
        },
      ]);

      // Recent forecasts (next 5 days)
      const nextDays = res.data.daily.slice(0, 5).map((day) => {
        const condition = day.weather[0].main;
        let icon;
        switch (condition.toLowerCase()) {
          case "rain":
            icon = <FaCloudRain className="text-3xl text-blue-600" />;
            break;
          case "thunderstorm":
            icon = <FaCloudShowersHeavy className="text-3xl text-gray-700" />;
            break;
          case "clear":
            icon = <FaSun className="text-3xl text-yellow-500" />;
            break;
          case "clouds":
            icon = <FaCloud className="text-3xl text-gray-400" />;
            break;
          default:
            icon = <FaCloud className="text-3xl text-gray-400" />;
        }

        return {
          day: new Date(day.dt * 1000).toLocaleDateString("en-AU", {
            weekday: "short",
          }),
          icon,
          condition: condition,
          temp: `${Math.round(day.temp.day)}°C`,
        };
      });

      setRecentForecasts(nextDays);
    } catch (err) {
      console.error("OpenWeather error:", err);
    }
  };

  useEffect(() => {
    fetchWeather();
    fetchRainPrediction(selectedLocation); // call backend
  }, [selectedLocation]);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-5xl font-bold text-center mb-12 font-gilroyBold"
          style={{ color: "#0f3f72" }}
        >
          Check Today's Rain Prediction
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-40 rounded-3xl shadow-lg p-8">
            {/* Location & Date */}
            <div className="flex items-center gap-2 mb-8 text-gray-700">
              <FaMapMarkerAlt className="text-blue-600 text-xl" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="font-medium text-lg bg-transparent outline-none font-gilroyMedium"
                style={{ color: "#1E73BE" }}
              >
                {Object.keys(cityCoords).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <FaChevronDown style={{ color: "#1E73BE" }} />
              <span className="ml-4 font-gilroyMedium" style={{ color: "#1E73BE" }}>
                {selectedDate}
              </span>
            </div>

            {/* Rain Prediction (Backend) */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2
                  className="text-3xl font-semibold mb-4 font-gilroyBold"
                  style={{ color: "#0f3f72" }}
                >
                  Will it rain tommorow?
                </h2>
                <p className="text-6xl font-bold text-green-500 font-gilroyHeavy">
                  {rainPrediction || "Loading..."}
                </p>
                {rainProbability && (
                  <p className="mt-2 text-gray-600 font-gilroyMedium">
                    Probability: {rainProbability}%
                  </p>
                )}
              </div>
              <div className="relative">
                <FaCloudShowersHeavy
                  className="text-9xl"
                  style={{ color: "#1E73BE" }}
                />
              </div>
            </div>

            {/* Weather Details (OpenWeather) */}
            <div>
              <h3
                className="text-2xl font-semibold mb-6 font-gilroyBold"
                style={{ color: "#0f3f72" }}
              >
                More About Today's Weather
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {weatherDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 rounded-2xl p-4 text-center"
                  >
                    <p className="text-sm text-gray-600 mb-2 font-gilroyMedium">{detail.label}</p>
                    <div className="flex justify-center mb-2">{detail.icon}</div>
                    <p className="text-lg font-semibold text-gray-800 font-gilroyBold">
                      {detail.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Recent Forecasts */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-40 rounded-3xl shadow-lg p-8">
            <h3
              className="text-2xl font-semibold mb-6 font-gilroyBold"
              style={{ color: "#0f3f72" }}
            >
              Recent forecasts
            </h3>
            <div className="space-y-4">
              {recentForecasts.map((forecast, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <span className="font-medium text-gray-700 w-16 font-gilroyMedium">
                    {forecast.day}
                  </span>
                  <div className="flex-shrink-0">{forecast.icon}</div>
                  <span className="font-medium text-blue-600 w-20 text-center font-gilroyMedium">
                    {forecast.condition}
                  </span>
                  <span className="font-semibold text-gray-800 w-16 text-right font-gilroyBold">
                    {forecast.temp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TomorrowRain;
