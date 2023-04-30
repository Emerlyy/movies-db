import { LocalItemGeneral } from "./Movie"

export type ExploreReturnType<T = LocalItemGeneral> = {
    page: number,
    results: T[],
    total_pages: number
}