import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Movie } from './types'; // Import Movie type

const fetchMovies = async () => {
  const response = await fetch('https://api.example.com/movies');
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
};

const MoviesList: React.FC = () => {
  const { data: movies, isLoading, isError } = useQuery('movies', fetchMovies);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching movies</p>;

  return (
    <div className="movies-list">
      <h2>Latest Movies</h2>
      {movies.map((movie: Movie) => (
        <div key={movie.id}>
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
