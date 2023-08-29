export const openKey = "700030cf-0d66-4fe1-a3cb-e2c6582a7a8c";
export const airIndexMap = [
  "Good",
  "Moderate",
  "Unhealthy",
  "Very Poor",
  "Very unhealthy",
  "Hazardous",
];
export const airIndexColors = [
  "#689F38",
  "#FBC02D",
  "#F57C00",
  "#C53929",
  "#AD1457",
  "#880E4F",
];
export const currentWeather = (lat, long) =>
  `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${long}&key=${openKey}`;

export const defaultState = {
  hu: "--",
  ic: "--",
  pr: "--",
  tp: "--",
  ts: "--",
  wd: "--",
  ws: "--",
  aqi: "",
  aqiIndex: 0,
};

export const shouldIRunYes = [
  "Oh yeah, like a unicorn on roller skates!",
  "Affirmative, captain!",
  "Indeedy-doodly!",
  "Life's too short to be saying no.",
  "Oh, definitely, like a monkey with a banana!",
  "Have you forgotten? I'm a yes-man!",
  "Hell, you bet-cha, matey!",
  "Aye aye captain",
  "Abso-f*kin-lutely!",
  "Yes, yes, and yes!",
  "Yepperdoodles",
];

export const shouldIRunNo = [
  "I would love to say yes, but my dog told me to say no",
  "Only if you give me a million bucks!",
  "I'm pretty sure there's someone a lot stupider who would enjoy doing that instead",
  "My advisors have come to a unanimous decision, and it's a—NO!",
  "Rain check please",
  "I can not do that",
  "Let me check my calendar",
  "I am not feeling well",
  "No, I'm not interested",
  "It's sounds like a great cause, but we are giving to something else this year",
  "Unfortunately, it's a not a good time",
];
