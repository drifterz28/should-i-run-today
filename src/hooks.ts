import { useEffect, useState } from "react";
import { shouldIRunYes, shouldIRunNo } from "./constants";
import { getRandomInt } from "./helpers";

export type weatherData = {
  aqiIndex: number;
  feels_like: number;
  humidity: number;
  speed: number;
};

const defaultWeatherData = {
  aqiIndex: 0,
  feels_like: 0,
  humidity: 0,
  speed: 0,
};

export const useShouldIRunText = () => {
  const [text, setText] = useState("");
  const [weatherData, setWeatherData] =
    useState<weatherData>(defaultWeatherData);
  const { aqiIndex, feels_like, humidity, speed } = weatherData;
  const isGood = aqiIndex < 3 && feels_like < 90 && humidity < 90 && speed < 20;

  useEffect(() => {
    if (isGood) {
      const randomNumber = getRandomInt(shouldIRunYes.length);
      setText(shouldIRunYes[randomNumber]);
    } else {
      const randomNumber = getRandomInt(shouldIRunNo.length);
      setText(shouldIRunNo[randomNumber]);
    }
  }, [setText, isGood]);
  return [text, setWeatherData];
};
