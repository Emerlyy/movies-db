import { useState } from "react";

export const useRange = ([initialLower, initialHigher]) => {
  const [range, setRange] = useState([Number.parseInt(initialLower) || 0, Number.parseInt(initialHigher) || 10]);

  const onChange = (_, newValue) => {
    if (range[0] === newValue[0] && range[1] === newValue[1]) return;
    setRange(newValue);
  }

  return [range, onChange]
}
