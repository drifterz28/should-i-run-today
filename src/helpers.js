import { currentAQI, airIndexMap, currentWeather } from "./constants";

export const getCurrentWeather = async (lat, long) => {
  const weather = await fetch(currentWeather(lat, long)).then((data) =>
    data.json(),
  );
  const air = await fetch(currentAQI(lat, long)).then((data) => data.json());
  const aqiIndex = air.list[0].main.aqi;
  const aqi = airIndexMap[aqiIndex];

  return {
    ...weather.main,
    ...weather.wind,
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
