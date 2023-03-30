import { useCallback, useState } from "react";

export const useProgressBar = (fetcher, arg) => {
  const [progress, setProgress] = useState(0);

  const fetchData = useCallback(async () => {
    setProgress(10);
    const data = await fetcher(arg)
    setProgress(100);
    return data;
  }, [fetcher, arg])

  const clearProgress = () => {
    setProgress(0)
  }

  return [progress, clearProgress, fetchData];
}