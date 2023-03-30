import { useRouter } from "next/router";

export const useQuery = () => {
  const router = useRouter();

  const getDataFromQuery = () => router.query;

  const setDataInQuery = (params) => {
    router.push({
      query: {
        ...params
      }
    })
  }

  const changeDataInQuery = (params) => {
    router.push({
      query: {
        ...getDataFromQuery(),
        ...params
      }
    })
  }

  return [setDataInQuery, getDataFromQuery, changeDataInQuery];
}