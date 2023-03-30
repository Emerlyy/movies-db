const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://www.themoviedb.org/t/p';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;


const movieApi = {
  movies: {
    explore: async (options = {}) => {

      const {
        page = 1,
        sortingType = 'popularity.desc',
        genres = '',
        ratingLower = 0,
        ratingHigher = 10,
      } = options;

      const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=${sortingType}&vote_average.gte=${ratingLower}&vote_average.lte=${ratingHigher}&include_adult=false&vote_count.gte=50${genres && `&with_genres=${genres}`}`);
      const data = await res.json();
      return data;
    },
    findById: async (id) => {
      const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
      const data = await res.json();
      return data;
    },
    search: async ({ query, page = 1 }) => {
      const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURI(query)}&page=${page}`)
      const data = await res.json();
      return data;
    },
    getGenres: async () => {
      const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
      const data = await res.json();
      return data.genres;
    },
    getTrending: async (duration = 'day') => {
      const res = await fetch(`https://api.themoviedb.org/3/trending/movie/${duration}?api_key=${API_KEY}`);
      const data = await res.json();
      return data.results;
    }
  },
  tv: {
    explore: async (options = {}) => {

      const {
        page = 1,
        sortingType = 'popularity.desc',
        genres = '',
        ratingLower = 0,
        ratingHigher = 10,
      } = options;

      const res = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&page=${page}&sort_by=${sortingType}&vote_average.gte=${ratingLower}&vote_average.lte=${ratingHigher}&include_adult=false&vote_count.gte=50${genres && `&with_genres=${genres}`}`);
      const data = await res.json();
      return data;
    },
    findById: async (id) => {
      const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
      const data = await res.json();
      return data;
    },
    search: async ({ query, page = 1 }) => {
      const res = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURI(query)}&page=${page}`)
      const data = await res.json();
      return data;
    },
    getGenres: async () => {
      const res = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
      const data = await res.json();
      return data.genres;
    },
    getTrending: async (duration = 'day') => {
      const res = await fetch(`https://api.themoviedb.org/3/trending/tv/${duration}?api_key=${API_KEY}`);
      const data = await res.json();
      return data.results;
    }
  },
  getImageUrl: (url, size = 'lg') => {
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
  },
  searchAll: async (query) => {
    const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURI(query)}`);
    const data = await res.json();
    return data;
  }
}

export default movieApi;