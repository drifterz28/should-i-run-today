import { airIndexMap, currentWeather } from "./constants";

const airQualityIndex = (aqi) => {
  let aqiLevel = 0;
  if (aqi > 51 && aqi <= 100) {
    aqiLevel = 1;
  } else if (aqi > 101 && aqi <= 150) {
    aqiLevel = 2;
  } else if (aqi > 151 && aqi <= 200) {
    aqiLevel = 3;
  } else if (aqi > 201 && aqi <= 300) {
    aqiLevel = 4;
  } else if (aqi > 301) {
    aqiLevel = 5;
  }
  return aqiLevel;
};

export const celsiusToF = (temp) => (temp * 9) / 5 + 32;

export const weatherIcon = (icon) => `https://airvisual.com/images/${icon}.png`;

export const getCurrentWeather = async (lat, long) => {
  const { data } = await fetch(currentWeather(lat, long)).then((data) =>
    data.json(),
  );

  const aqiIndex = airQualityIndex(data?.current?.pollution?.aqius);
  const aqi = airIndexMap[aqiIndex];

  return {
    ...data?.current?.weather,
    aqi,
    aqiIndex,
  };
};

navigator.geolocation.getCurrentPosition(
  (position) => {
    getCurrentWeather(position?.coords?.latitude, position?.coords?.longitude);
  },
  (error) => {
    console.log(error);
  },
);

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
