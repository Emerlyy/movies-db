export type Genre = {
    id: number,
    name: string
}

export type LocalItemDetails = {
    id: number,
    title: string,
    genres: Genre[],
    release: string,
    runtime: number | null,
    tagline: string,
    overview: string | null,
    voteAverage: number,
    voteCount: number,
    poster: string | null,
    backdrop: string | null,
}

export type LocalItemGeneral = {
    id: number,
    title: string,
    genres: Genre[],
    release: string,
    overview: string | null,
    voteAverage: number,
    voteCount: number,
    poster: string | null,
}

export type MovieDetails = {
    id: number,
    title: string,
    genres: Genre[],
    release_date: string,
    runtime: number | null,
    tagline: string,
    overview: string | null,
    vote_average: number,
    vote_count: number,
    poster_path: string | null,
    backdrop_path: string | null,
}

export type MovieGeneral = {
    id: number,
    title: string,
    genre_ids: Genre[],
    release_date: string,
    overview: string | null,
    vote_average: number,
    vote_count: number,
    poster_path: string | null,
}

export type TVShowDetails = {
    id: number,
    name: string,
    genres: Genre[],
    first_air_date: string,
    episode_run_time?: number,
    tagline: string,
    overview: string | null,
    vote_average: number,
    vote_count: number,
    poster_path: string | null,
    backdrop_path: string | null,
}

export type TVShowGeneral = {
    id: number,
    name: string,
    genre_ids: Genre[],
    first_air_date: string,
    overview: string | null,
    vote_average: number,
    vote_count: number,
    poster_path: string | null,
}