import { MovieDetails, MovieGeneral, TVShowDetails, TVShowGeneral } from "types";

export const isMovieGeneral = (movie: any): movie is MovieGeneral => 'title' in movie && 'genre_ids' in movie;

export const isMovieDetails = (movie: any): movie is MovieDetails => 'title' in movie && 'genres' in movie;

export const isTVShowGeneral = (tv: any): tv is TVShowGeneral => 'name' in tv && 'genre_ids' in tv;

export const isTVShowDetails = (tv: any): tv is TVShowDetails => 'name' in tv && 'genres' in tv;