import { useEffect, useState } from "react";
import { shouldIRunYes, shouldIRunNo } from "./constants";
import { getRandomInt } from "./helpers";

export type weatherData = {
  aqiIndex: number;
  tp: number;
  hu: number;
  ws: number;
};

const defaultWeatherData = {
  "tp": 0,
  "hu": 0,
  "ws": 0,
  "aqiIndex": 0
}

export const useShouldIRunText = () => {
  const [text, setText] = useState("");
  const [weatherData, setWeatherData] =
    useState<weatherData>(defaultWeatherData);
  const { aqiIndex, tp, hu, ws } = weatherData;
  const isGood = aqiIndex < 3 && tp < 33 && hu < 90 && ws < 20;

  useEffect(() => {
    if (isGood) {
      const randomNumber = getRandomInt(shouldIRunYes.length);
      setText(shouldIRunYes[randomNumber]);
    } else {
      const randomNumber = getRandomInt(shouldIRunNo.length);
      setText(shouldIRunNo[randomNumber]);
    }
  }, [setText, isGood]);
  return [text, setWeatherData] as const;
};
