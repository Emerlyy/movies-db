import { useState } from "react"
import { useQuery } from "./useQuery";

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  return [value, handleChange];
}

export default useInput;