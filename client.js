const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://www.themoviedb.org/t/p';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;


const movieApi = {
  movies: {
    explore: async (options = {}) => {

      const {
        page = 1,
        sortingType = 'popularity.desc',
        withGenres = '',
        rating = [0, 10]
      } = options;

      const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=${sortingType}&vote_average.gte=${rating[0]}&vote_average.lte=${rating[1]}&include_adult=false&vote_count.gte=200${withGenres && `&with_genres=${withGenres}`}`);
      const data = await res.json();
      return data;
    },
    findById: async (id) => {
      const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
      const data = await res.json();
      return data;
    },
    search: async (query) => {
      const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURI(query)}`)
      const data = await res.json();
      return data;
    }
  },
  tv: {
    findById: async (id) => {
      const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
      const data = await res.json();
      return data;
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
  }
}

export default movieApi;