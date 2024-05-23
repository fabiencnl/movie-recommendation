import { MoviePage, Movie, Genre } from './types';


//const API_RENDER_URL = 'http://localhost:8080/api';
const API_RENDER_URL = 'https://movie-recommendation-n2i7.onrender.com/api';
export const fetchMovies = async ({
  pageParam = 1,
  sizeParam = 20,
  sortBy = 'releaseDate',
  selectedGenres = []
}): Promise<MoviePage> => {
  const response = await fetch(`${API_RENDER_URL}/movies?page=${pageParam}&size=${sizeParam}&sortBy=${sortBy}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data: MoviePage = await response.json();
  console.log('reponse:' , data)
  return data;
};

export const fetchMovieDetails = async (id: string): Promise<Movie> => {
  const response = await fetch(`${API_RENDER_URL}/movies/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data: Movie = await response.json();
  return data;
};

export const fetchGenres = async (): Promise<string[]> => {
  const response = await fetch(`${API_RENDER_URL}/movies/genres`);
  if (!response.ok) {
    throw new Error('Failed to fetch genres');
  }
  const data: string[] = await response.json();
  return data;
};