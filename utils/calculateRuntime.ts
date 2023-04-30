export const calculateRuntime = (runtime: number | null) => {
  if(!runtime){
    return null;
  }
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return { hours, minutes };
}