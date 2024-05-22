import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchMovieDetails } from './fetchFunctions'; // Assuming this function is defined in fetchFunctions.ts
import { Movie } from './types';
//import './MovieDetails.css'; // Import your CSS here

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: movie, error, isLoading } = useQuery<Movie>(
    ['movieDetails', id],
    () => fetchMovieDetails(id as string),
    {
      enabled: !!id,
    }
  );

  //if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading movie details.</div>;

  if (!movie) return <div>No movie details found.</div>;

  return (
    <div className="movie-details-container">
      <div className="movie-details-header">
        <img src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} alt={movie.title} className="movie-details-poster" />
        <div className="movie-details-info">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>Rating: {movie.voteAverage}</p>
          <p>Genres: {movie.genres?.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
