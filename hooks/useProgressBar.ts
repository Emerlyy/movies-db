import { useCallback, useState } from "react";


type ReturnType<T> = [number, () => void, () => Promise<T | void>]

export const useProgressBar = <T>(fetcher: Function, arg?: any): ReturnType<T> => {
  const [progress, setProgress] = useState(0);

  const fetchData = useCallback(async (): Promise<T | void> => {
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