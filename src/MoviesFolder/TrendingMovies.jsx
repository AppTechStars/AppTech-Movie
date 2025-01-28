import React, { useState, useEffect } from 'react';
import '../MoviesFolderCSS/TrendingMovies.css';

const TrendingMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const response = await fetch(
            'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
            {
              headers: {
                'Authorization': 'Bearer 81766caf381ea0e22e41bc9eeba2d8bb',
                'accept': 'application/json'
              }
            }
          );
          const data = await response.json();
          setMovies(data.results || []);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch trending movies');
          setLoading(false);
        }
      };
  
      fetchMovies();
    }, []);
  
    if (loading) {
      return (
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      );
    }
  
    if (error) {
      return <div className="error-message">{error}</div>;
    }
  
    const featuredMovie = movies[0];
  
    return (
      <div className="trending-container">
        <h1 className="trending-title">Trending Movies</h1>
  
        {/* Featured Movie */}
        {featuredMovie && (
          <div className="featured-movie">
            <img
              src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
              alt={featuredMovie.title}
            />
            <div className="featured-movie-info">
              <h2 className="featured-movie-title">{featuredMovie.title}</h2>
            </div>
          </div>
        )}
  
        {/* Movie Carousel */}
        <div className="movie-carousel">
          <div 
            className="movie-scroll"
            style={{ '--movie-count': movies.length }} // For animation calculation
          >
            {/* Double the movies array for continuous scrolling */}
            {[...movies, ...movies].map((movie, index) => (
              <div
                key={`${movie.id}-${index}`}
                className="movie-card"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-info">
                  <p className="movie-name">{movie.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default TrendingMovies;