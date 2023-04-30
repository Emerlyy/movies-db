import { useState } from "react"

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target)
      setValue(event.target.value);
  }

  return [value, handleChange];
}

export default useInput;