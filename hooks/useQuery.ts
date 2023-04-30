import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

type ReturnType = [(params: object) => void, () => ParsedUrlQuery, (params: object) => void];

export const useQuery = ():ReturnType => {
  const router = useRouter();

  const setDataInQuery = (params: object) => {
    router.push({
      query: {
        ...params
      }
    })
  }

  const getDataFromQuery = () => router.query;

  const changeDataInQuery = (params: object) => {
    router.push({
      query: {
        ...getDataFromQuery(),
        ...params
      }
    })
  }

  return [setDataInQuery, getDataFromQuery, changeDataInQuery];
}