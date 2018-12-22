const API_KEY = '?api_key=6678b4268fb63c917d179b4809db6bfd';
const API_MAIN = 'https://api.themoviedb.org/3';

export const API = {
  POPULAR: (page: number) => `${API_MAIN}/movie/popular${API_KEY}&page=${page}`,
  SEARCH: (request: string, page: number) => `${API_MAIN}/search/movie${API_KEY}&query=${request}&page=${page}`,
  GENRE: `${API_MAIN}/genre/movie/list${API_KEY}`,
  MOVIE_DETAILS: (movie_id: number) => `${API_MAIN}/movie/${movie_id}${API_KEY}`,
  MOVIE_RECOMMENDATIONS: (movie_id: number, page: number) => `${API_MAIN}/movie/${movie_id}/recommendations${API_KEY}&page=${page}`
}
