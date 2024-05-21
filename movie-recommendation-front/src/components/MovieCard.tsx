import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from './types';
import './MovieCard.css'; // Import your CSS here

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-details">
        <h3>{movie.title}</h3>
        <p>Rating: {movie.voteAverage}</p>
        <p>Genres: {movie.genreNames ? movie.genreNames.join(', ') : 'No genres available'}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
