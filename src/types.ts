export type WeatherDataType = {
  ts: string;
  tp: number | null;
  pr: number | null;
  hu: number | null;
  ws: number | null;
  wd: number | null;
  ic: string;
  city: string;
  aqi: string;
  aqiIndex: number | null;
};
