import { LocalItemDetails, LocalItemGeneral, MovieDetails, MovieGeneral, TVShowDetails, TVShowGeneral } from "types/Movie";
import { isMovieDetails, isMovieGeneral, isTVShowDetails, isTVShowGeneral } from "./TypeGuards";

type WithArray<T> = T | T[];

type Arguments = MovieDetails | TVShowDetails | WithArray<MovieGeneral> | WithArray<TVShowGeneral>;

export function extractLocalItem(item: MovieGeneral | TVShowGeneral): LocalItemGeneral
export function extractLocalItem(item: MovieDetails | TVShowDetails): LocalItemDetails
export function extractLocalItem(item: MovieGeneral[] | TVShowGeneral[]): LocalItemGeneral[]
export function extractLocalItem(item: Arguments): LocalItemGeneral | LocalItemGeneral[] | LocalItemDetails | LocalItemDetails[] {
    if (isMovieDetails(item)) {
        return {
            id: item.id,
            title: item.title,
            genres: item.genres,
            release: item.release_date,
            runtime: item.runtime || null,
            tagline: item.tagline,
            overview: item.overview,
            voteAverage: item.vote_average,
            voteCount: item.vote_count,
            poster: item.poster_path,
            backdrop: item.backdrop_path,
        }
    } else if (isTVShowDetails(item)) {
        return {
            id: item.id,
            title: item.name,
            genres: item.genres,
            release: item.first_air_date,
            runtime: item.episode_run_time || null,
            tagline: item.tagline,
            overview: item.overview,
            voteAverage: item.vote_average,
            voteCount: item.vote_count,
            poster: item.poster_path,
            backdrop: item.backdrop_path,
        }
    } else if (isMovieGeneral(item)) {
        return {
            id: item.id,
            title: item.title,
            genres: item.genre_ids,
            release: item.release_date,
            overview: item.overview,
            voteAverage: item.vote_average,
            voteCount: item.vote_count,
            poster: item.poster_path
        }
    } else if (isTVShowGeneral(item)) {
        return {
            id: item.id,
            title: item.name,
            genres: item.genre_ids,
            release: item.first_air_date,
            overview: item.overview,
            voteAverage: item.vote_average,
            voteCount: item.vote_count,
            poster: item.poster_path
        }
    } else {
        return item.map(item => extractLocalItem(item));
    }
}