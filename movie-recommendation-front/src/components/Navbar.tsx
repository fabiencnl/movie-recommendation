// src/components/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  sortBy: string;
  sortDirection: string;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sortBy, sortDirection, handleSortChange }) => {
  return (
    <nav className="navbar">
      <div className="left-nav">
        <h1>Movie App</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
        </div>
      </div>
      <div className="right-nav">
        <select onChange={handleSortChange} value={`${sortBy},${sortDirection}`}>
          <option value="voteAverage,DESC">Highest Rating</option>
          <option value="popularity,DESC">Most Popular</option>
          <option value="releaseDate,DESC">Newest Releases</option>
        </select>
        <div className="logos">
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
            <img src="path/to/tmdb-logo.png" alt="TMDB Logo" className="tmdb-logo" />
          </a>
          <a href="https://github.com/your-github-repo" target="_blank" rel="noopener noreferrer">
            <img src="path/to/github-logo.png" alt="GitHub Logo" className="github-logo" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
