import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Movie } from './types';

const fetchMovieDetails = async (id?: string) => {
  if (!id) {
    throw new Error('Movie ID is required');
  }

 // const response = await fetch(`http://localhost:8080/api/movies/${id}`);
  const response = await fetch(`https://movie-recommendation-n2i7.onrender.com/api/movies/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
};

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery<Movie>(
    ['movie', id],
    () => fetchMovieDetails(id),
    {
      enabled: !!id, // Ensure the query runs only if `id` is defined
    }
  );

  if (!id) {
    return <p>Invalid movie ID</p>;
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching movie details</p>;

  const defaultMovie: Movie = {
    id: '',
    title: '',
    overview: '',
    voteAverage: 0,
    popularity: 0,
    actors: [],
    genreNames: [],
    posterPath: '',
    backdropPath: '',
    releaseDate: '',
    duration: '',
    genres: []
  };

  const movie = data || defaultMovie;

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>
        Genres:{' '}
        {movie.genres && movie.genres.length > 0
          ? movie.genres.map(mg => mg.name).join(', ')
          : 'No genres available'}
      </p>
      {/* Display other movie details */}
    </div>
  );
};

export default MovieDetails;
