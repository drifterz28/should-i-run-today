import { currentAQI, airIndexMap, currentWeather } from "./constants";

const airQualityIndex = (pm2_5) => {
  let aqi = 0;
  if (pm2_5 > 12 && pm2_5 <= 35.4) {
    aqi = 1;
  } else if (pm2_5 > 35.4 && pm2_5 <= 55.4) {
    aqi = 2;
  } else if (pm2_5 > 55.4 && pm2_5 <= 150.4) {
    aqi = 3;
  } else if (pm2_5 > 150.5 && pm2_5 <= 250.4) {
    aqi = 4;
  } else if (pm2_5 > 250.5) {
    aqi = 5;
  }
  return aqi;
};

export const getCurrentWeather = async (lat, long) => {
  const weather = await fetch(currentWeather(lat, long)).then((data) =>
    data.json(),
  );
  const air = await fetch(currentAQI(lat, long)).then((data) => data.json());
  const aqiIndex = airQualityIndex(air.list[0].components.pm2_5);
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

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
