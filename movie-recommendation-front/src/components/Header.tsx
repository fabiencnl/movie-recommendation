import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import a CSS file for styling

const tmdbLogoUrl = 'https://www.themoviedb.org/assets/1/v4/logos/v2/blue_square_2.svg';
const githubLogoUrl = 'https://image.flaticon.com/icons/png/512/25/25231.png'; // URL for GitHub icon

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">
        <Link to="/">Movie Recommendations</Link>
      </h1>
      <div className="header-icons">
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
          <img src={tmdbLogoUrl} alt="TMDB Logo" className="tmdb-logo" />
        </a>
        <a href="https://github.com/fabiencnl/movie-recommendation" target="_blank" rel="noopener noreferrer">
          <img src={githubLogoUrl} alt="GitHub Logo" className="github-logo" />
        </a>
      </div>
    </header>
  );
};

export default Header;
