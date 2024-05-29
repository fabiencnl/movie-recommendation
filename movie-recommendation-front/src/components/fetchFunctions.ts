import { MoviePage, Movie, FetchMoviesParams } from './types';




//const API_RENDER_URL = 'http://localhost:8080/api';
const API_RENDER_URL = 'https://movie-recommendation-n2i7.onrender.com/api';
export const fetchMovies = async ({
  pageParam = 1,
  sizeParam = 20,
  sortBy = 'releaseDate',
  selectedGenres = []
 }: FetchMoviesParams): Promise<MoviePage> => {
  let baseUrl = `${API_RENDER_URL}/movies?page=${pageParam}&size=${sizeParam}&sortBy=${sortBy}`;
  
  // Check if selectedGenres is not empty
  if (selectedGenres.length > 0) {
    // Construct the query string for genres
    const queryString = selectedGenres.map(genre => `${encodeURIComponent(genre)}`).join(',');
    baseUrl += `&genres=${queryString}`;
  }

  const response = await fetch(baseUrl);
  if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data: MoviePage = await response.json();
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
  const response = await fetch(`${API_RENDER_URL}/genres/names`);
  if (!response.ok) {
    throw new Error('Failed to fetch genres');
  }
  const data: string[] = await response.json();
  return data;
};