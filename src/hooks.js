import { useEffect, useState } from "react";
import { shouldIRunYes, shouldIRunNo } from "./constants";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const useShouldIRunText = () => {
  const [text, setText] = useState("");
  const [aqi, setAqi] = useState(0);

  useEffect(() => {
    if (aqi < 3 && aqi > 0) {
      const randomNumber = getRandomInt(shouldIRunYes.length);
      setText(shouldIRunYes[randomNumber]);
    } else if (aqi > 3) {
      const randomNumber = getRandomInt(shouldIRunNo.length);

      setText(shouldIRunNo[randomNumber]);
    }
  }, [setText, aqi]);
  return [text, setAqi];
};
