import { MoviePage } from './types';

const API_BASE_URL = 'http://localhost:8080/api';
//const API_RENDER_URL = 'https://movie-recommendation-n2i7.onrender.com/api';
export const fetchMovies = async ({
  pageParam = 1,
  sizeParam = 20,
  sortBy = 'releaseDate',
  sortDirection = 'DESC',
}): Promise<MoviePage> => {
  const response = await fetch(`${API_BASE_URL}/movies?page=${pageParam}&size=${sizeParam}&sortBy=${sortBy}&sortDirection=${sortDirection}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data: MoviePage = await response.json();
  return data;
};
