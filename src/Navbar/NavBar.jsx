import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './NavBar.css';

const MovieHub = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="movie-hub">
      <nav className="nav-bar">
        <div className="nav-title">App Tech Stars Movie Hub</div>
        <div className="nav-links">
          <span>Home</span>
          <span>Movies</span>
        </div>
      </nav>

      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button">
            <Search />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieHub;

