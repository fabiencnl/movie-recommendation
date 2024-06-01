import React from 'react';
import { Link } from 'react-router-dom';
import { MovieLight } from './types';
import './MovieCard.css'; // Import your CSS here

interface MovieCardProps {
  movie: MovieLight;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-image-wrapper">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
          alt={movie.title}
          className="movie-poster"
        />
        <span className="card-rating">{movie.voteAverage.toFixed(1)}</span>
        <div className="overlay">
          <h3>{movie.title}</h3>
        </div>
      </div>
      
    </Link>
  );
};

export default MovieCard;
