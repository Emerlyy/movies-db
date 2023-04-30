import { extractLocalItem } from "utils/extractLocalItem";
import { ExploreReturnType, Genre, ImageSize, LocalItemDetails, LocalItemGeneral, MovieDetails, MovieGeneral, Options, TVShowDetails, TVShowGeneral } from "types";

const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://www.themoviedb.org/t/p';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const movieApi = {
  movies: {
    explore: async (options: Options = {}): Promise<ExploreReturnType> => {
      const {
        page = '1',
        sortingType = 'popularity.desc',
        genres = null,
        ratingLower = '0',
        ratingHigher = '10',
      } = options;

      const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=${sortingType}&vote_average.gte=${ratingLower}&vote_average.lte=${ratingHigher}&include_adult=false&vote_count.gte=50${genres && `&with_genres=${genres}`}`);
      const data = await res.json() as ExploreReturnType<MovieGeneral>;
      return {
        page: data.page,
        results: extractLocalItem(data.results),
        total_pages: data.total_pages
      };
    },
    findById: async (id: string): Promise<LocalItemDetails> => {
      const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
      const data = await res.json() as MovieDetails;
      return extractLocalItem(data);
    },
    search: async ({ query, page = 1 }: { query: string, page: number }): Promise<ExploreReturnType> => {
      const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURI(query)}&page=${page}`)
      const data = await res.json() as ExploreReturnType<MovieGeneral>;
      return {
        page: data.page,
        results: extractLocalItem(data.results),
        total_pages: data.total_pages
      };
    },
    getGenres: async (): Promise<Genre[]> => {
      const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
      const data = await res.json() as { genres: Genre[] };
      return data.genres;
    },
    getTrending: async (duration = 'day'): Promise<LocalItemGeneral[]> => {
      const res = await fetch(`https://api.themoviedb.org/3/trending/movie/${duration}?api_key=${API_KEY}`);
      const data = await res.json() as ExploreReturnType<MovieGeneral>;
      return extractLocalItem(data.results);
    }
  },
  tv: {
    explore: async (options: Options = {}): Promise<ExploreReturnType> => {
      const {
        page = '1',
        sortingType = 'popularity.desc',
        genres = null,
        ratingLower = '0',
        ratingHigher = '10',
      } = options;

      const res = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&page=${page}&sort_by=${sortingType}&vote_average.gte=${ratingLower}&vote_average.lte=${ratingHigher}&include_adult=false&vote_count.gte=50${genres && `&with_genres=${genres}`}`);
      const data = await res.json() as ExploreReturnType<TVShowGeneral>;
      return {
        page: data.page,
        results: extractLocalItem(data.results),
        total_pages: data.total_pages
      };
    },
    findById: async (id: string): Promise<LocalItemDetails> => {
      const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
      const data = await res.json() as TVShowDetails;
      return extractLocalItem(data);
    },
    search: async ({ query, page = 1 }: { query: string, page: number }): Promise<ExploreReturnType> => {
      const res = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURI(query)}&page=${page}`)
      const data = await res.json() as ExploreReturnType<TVShowGeneral>;
      return {
        page: data.page,
        results: extractLocalItem(data.results),
        total_pages: data.total_pages
      };
    },
    getGenres: async (): Promise<Genre[]> => {
      const res = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
      const data = await res.json() as { genres: Genre[] };
      return data.genres;
    },
    getTrending: async (duration = 'day'): Promise<LocalItemGeneral[]> => {
      const res = await fetch(`https://api.themoviedb.org/3/trending/tv/${duration}?api_key=${API_KEY}`);
      const data = await res.json() as ExploreReturnType<TVShowGeneral>;
      return extractLocalItem(data.results);
    }
  },
  getImageUrl: (url: string, size: ImageSize = 'lg'): string => {
    let w, h;
    switch (size) {
      case 'lg':
        w = 300;
        h = 450;
        break;
      case 'md':
        w = 220;
        h = 330;
        break;
      default:
        w = 300;
        h = 450;
        break;
    }
    return `${IMG_URL}/w${w}_and_h${h}_face${url}`;
  }
}

export default movieApi;