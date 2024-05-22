import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import a CSS file for styling
import tmdbLogo from '../assets/tmdb_logo.svg';
import githubLogo from '../assets/github-mark-white.png';
import { FaFilm } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="header-title">
          <FaFilm className="film-icon" />
          Movie Recs
        </Link>
      </div>
      <div className="header-icons">
        <a href="https://github.com/fabiencnl/movie-recommendation" target="_blank" rel="noopener noreferrer">
          <img src={githubLogo} alt="GitHub Logo" className="logo-icon" />
        </a>
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
          <img src={tmdbLogo} alt="TMDB Logo" className="logo-icon tmdb-logo" />
        </a>
      </div>
    </header>
  );
};

export default Header;
