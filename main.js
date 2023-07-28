const app = document.getElementById('app');
const openKey = 'ff6f5d189dfa1eba10cc3559a7eb097d';
const airIndexMap = ['', 'Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
const currentWeather = (lat, long) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${openKey}`;
const currentAQI = (lat, long) => `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${openKey}`;

const getCurrentWeather = async (lat, long) => {
  const weather = await fetch(currentWeather(lat, long)).then((data) => data.json());
  const air = await fetch(currentAQI(lat, long)).then((data) => data.json());
  const aqiIndex = air.list[0].main.aqi;
  const aqi = airIndexMap[aqiIndex];

  return {
    ...weather.main,
    ...weather.wind,
    aqi,
    aqiIndex
  }
}

async function main(lat, long) {
  const weather = await getCurrentWeather(lat, long);
  console.log(weather)
}

document.addEventListener('DOMContentLoaded', ()=> {
  navigator.geolocation.getCurrentPosition((position) => {
    main(position?.coords?.latitude, position?.coords?.longitude);
  }, (error) => {
    console.log(error)
  })
})


