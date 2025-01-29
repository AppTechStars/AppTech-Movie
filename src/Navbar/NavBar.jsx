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

      
    </div>
  );
};

export default MovieHub;

