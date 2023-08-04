import { useState, useEffect } from "react";
import "./App.css";
import { useShouldIRunText } from "./hooks";
import { defaultState, airIndexColors } from "./constants";
import { getCurrentWeather } from "./helpers";

function App() {
  const [data, setData] = useState(defaultState);
  const [text, setText] = useShouldIRunText();

  useEffect(() => {
    const getWeatherData = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const weatherData = await getCurrentWeather(
            position?.coords?.latitude,
            position?.coords?.longitude,
          );
          setData(weatherData);
          setText(weatherData?.aqiIndex);
        },
        (error) => {
          console.log(error);
        },
      );
    };
    getWeatherData();
    // eslint-disable-next-line
  }, [setData]);

  return (
    <div
      className="App"
      style={{ backgroundColor: airIndexColors[data.aqiIndex] }}
    >
      <div className="App-header">
        <div>Temp: {data?.temp}</div>
        <div>Wind: {data.speed}</div>
        <div>humidity: {data.humidity}%</div>
        <div>AQI: {data.aqi}</div>
      </div>
      <h1>{text}</h1>
    </div>
  );
}

export default App;
