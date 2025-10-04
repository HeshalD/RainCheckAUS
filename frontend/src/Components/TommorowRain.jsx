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

  const OPENWEATHER_KEY = "633a9d9b91294145a80cb090a154b62b";

  const cityCoords = {
    "Albany": { lat: -35.0228, lon: 117.8814 },
"Albury": { lat: -36.0737, lon: 146.9135 },
"AliceSprings": { lat: -23.6980, lon: 133.8807 },
"BadgerysCreek": { lat: -33.8800, lon: 150.7000 },
"Ballarat": { lat: -37.5622, lon: 143.8503 },
"Bendigo": { lat: -36.7570, lon: 144.2794 },
"Brisbane": { lat: -27.4698, lon: 153.0251 },
"Cairns": { lat: -16.9203, lon: 145.7700 },
"Canberra": { lat: -35.2809, lon: 149.1300 },
"Cobar": { lat: -31.4981, lon: 145.8400 },
"CoffsHarbour": { lat: -30.2963, lon: 153.1157 },
"Dartmoor": { lat: -37.9167, lon: 141.2833 },
"Darwin": { lat: -12.4634, lon: 130.8456 },
"GoldCoast": { lat: -28.0167, lon: 153.4000 },
"Hobart": { lat: -42.8821, lon: 147.3272 },
"Katherine": { lat: -14.4656, lon: 132.2635 },
"Launceston": { lat: -41.4332, lon: 147.1441 },
"Melbourne": { lat: -37.8136, lon: 144.9631 },
"Mildura": { lat: -34.2083, lon: 142.1244 },
"Moree": { lat: -29.4658, lon: 149.8419 },
"MountGambier": { lat: -37.8303, lon: 140.7828 },
"MountGinini": { lat: -35.5290, lon: 148.7720 },
"Newcastle": { lat: -32.9283, lon: 151.7817 },
"Nhil": { lat: -36.3333, lon: 141.6500 },
"NorahHead": { lat: -33.2833, lon: 151.5667 },
"NorfolkIsland": { lat: -29.0333, lon: 167.9500 },
"Nuriootpa": { lat: -34.4667, lon: 138.9833 },
"Penrith": { lat: -33.7510, lon: 150.6940 },
"Perth": { lat: -31.9505, lon: 115.8605 },
"Portland": { lat: -38.3500, lon: 141.6000 },
"Richmond": { lat: -20.7333, lon: 143.1333 },
"SalmonGums": { lat: -33.2667, lon: 121.6333 },
"Sydney": { lat: -33.8688, lon: 151.2093 },
"Townsville": { lat: -19.2664, lon: 146.8057 },
"Tuggeranong": { lat: -35.4244, lon: 149.0889 },
"Uluru": { lat: -25.3444, lon: 131.0369 },
"WaggaWagga": { lat: -35.1167, lon: 147.3667 },
"Walpole": { lat: -34.9733, lon: 116.7333 },
"Watsonia": { lat: -37.7167, lon: 145.0833 },
"Williamtown": { lat: -32.7990, lon: 151.8420 },
"Witchcliffe": { lat: -34.0000, lon: 115.1000 },
"Wollongong": { lat: -34.4278, lon: 150.8931 },
"Woomera": { lat: -31.1981, lon: 136.8167 }

  };

  // Fetch backend prediction
  const fetchRainPrediction = async (city) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/raincheck/${city}`
      );
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
              <span
                className="ml-4 font-gilroyMedium"
                style={{ color: "#1E73BE" }}
              >
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
                <p className="text-6xl font-bold text-green-500 font-gilroyBold">
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
                    <p className="text-sm text-gray-600 mb-2 font-gilroyMedium">
                      {detail.label}
                    </p>
                    <div className="flex justify-center mb-2">
                      {detail.icon}
                    </div>
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
