import { useState, useEffect } from "react";
import "./App.css";
import { useShouldIRunText } from "./hooks";
import { defaultState, airIndexColors } from "./constants";
import { getCurrentWeather, celsiusToF } from "./helpers";
import { CompassIcon } from "./CompassIcon";

function App() {
  const [data, setData] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(false);
  const [errorCode, setErrorCode] = useState(null);
  const [text, setText] = useShouldIRunText();

  useEffect(() => {
    setIsLoading(true);
    const getWeatherData = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const weatherData = await getCurrentWeather(
            position?.coords?.latitude,
            position?.coords?.longitude,
          );
          setData(weatherData);
          setText(weatherData);
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
          setErrorCode(error.code);
          setIsLoading(false);
        },
      );
    };
    getWeatherData();
  }, [setData]);
  console.log(data);

  return (
    <div
      className="App"
      style={{ backgroundColor: airIndexColors[data.aqiIndex] }}
    >
      {isLoading && <h1 className="Loading">Loading...</h1>}
      {errorCode && (
        <h1 className="Error-state">Dude, I need to know your location!</h1>
      )}
      {!isLoading && (
        <>
          <div className="App-header">

            <div>Temp: {celsiusToF(data?.tp)}°F</div>
            <div>Wind: {data.ws}<CompassIcon direction={data.wd}/></div>
            <div>humidity: {data.hu}%</div>
            <div>AQI: {data.aqi}</div>
          </div>
          <h1>{text}</h1>
        </>
      )}
    </div>
  );
}

export default App;
