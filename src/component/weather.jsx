import React, { useState } from "react";
import "../App";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = "70fecd143346436f913191218240202";

  const fetchWeather = async (city) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather(city);
      setCity("");
    }
  };

  return (
    <div className="weather-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      {loading && <p className="loading">Loading data...</p>}
      {weather && (
        <div className="weather-cards">
          <div className="weather-card">
            <h2>{weather.location.name}</h2>
            <div className="weather-box">
              <p>Temperature: {weather.current.temp_c}°C</p>
              <p>Humidity: {weather.current.humidity}%</p>
              <p>Condition: {weather.current.condition.text}</p>
              <p>Wind Speed: {weather.current.wind_kph} kph</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
