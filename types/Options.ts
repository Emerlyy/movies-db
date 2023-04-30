type Property = 'popularity' | 'release_date' | 'vote_average';

export type SortingType = `${Property}.${'asc' | 'desc'}`

export type Rating = [number, number];

export type Options = Partial<{
    page: string,
    sortingType: SortingType,
    genres: string,
    ratingLower: string,
    ratingHigher: string
}>