import { useState } from "react";
import { Rating } from "types";

export const useRange = ([initialLower = 0, initialHigher = 10]: Rating): [Rating, (_: never, newValue: Rating) => void] => {
  const [range, setRange] = useState<Rating>([Number.parseInt(String(initialLower)), Number.parseInt(String(initialHigher))]);

  const onChange = (_: never, newValue: Rating) => {
    if (range[0] === newValue[0] && range[1] === newValue[1]) return;
    setRange(newValue);
  }

  return [range, onChange]
}
