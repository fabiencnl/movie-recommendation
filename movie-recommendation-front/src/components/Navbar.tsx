import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h1>Movie App</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
