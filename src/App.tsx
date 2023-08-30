import { useState, useEffect } from "react";
import "./App.css";
import { useShouldIRunText } from "./hooks";
import { defaultState, airIndexColors } from "./constants";
import type { WeatherDataType } from "./types";
import { getCurrentWeather, celsiusToF, weatherIcon } from "./helpers";
import { CompassIcon } from "./CompassIcon";

const App = () => {
  const [data, setData] = useState<WeatherDataType>(defaultState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorCode, setErrorCode] = useState<number | null>(null);
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
          setText(weatherData);
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
          setErrorCode(error?.code);
          setIsLoading(false);
        },
      );
    };
    getWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsLoading]);

  if (!data) {
    return !data && <h1 className="Error-state">Something is not right!</h1>;
  }

  return (
    <div
      className="App"
      style={{
        backgroundColor: data?.aqiIndex
          ? airIndexColors[data.aqiIndex]
          : undefined,
      }}
    >
      {isLoading && <h1 className="Loading">Loading...</h1>}
      {errorCode && (
        <h1 className="Error-state">Dude, I need to know your location!</h1>
      )}
      {!isLoading && (
        <>
          <div className="App-header">
            <div>City: {data.city}</div>
            {data?.tp && data?.ic && (
              <div className="Flex-div">
                <div>Temp: {celsiusToF(data?.tp)}°F</div>
                <div>
                  <img alt="weather icon" className='Weather-icon' src={weatherIcon(data?.ic)} />
                </div>
              </div>
            )}
            <div className="Flex-div">
              <div>Wind: {data.ws}</div>
              <div>
                <CompassIcon direction={data.wd} />
              </div>
            </div>
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
