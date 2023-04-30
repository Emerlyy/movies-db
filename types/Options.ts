import { Genre } from "./Movie";

type Property = 'popularity' | 'release_date' | 'vote_average';

export type SortingType = `${Property}.${'asc' | 'desc'}`

export type Rating = [number, number];

export type Options = Partial<{
    page: number,
    sortingType: SortingType,
    genres: Genre[],
    ratingLower: number,
    ratingHigher: number
}>