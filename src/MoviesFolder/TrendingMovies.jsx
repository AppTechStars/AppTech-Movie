import React, { useState, useEffect } from 'react';
import '../MoviesFolderCSS/TrendingMovies.css';

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=81766caf381ea0e22e41bc9eeba2d8bb';
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // To see the API response in console
        setMovies(data.results || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
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
            <p className="featured-movie-overview">{featuredMovie.overview}</p>
            <div className="featured-movie-details">
              <span className="release-date">
                Release: {new Date(featuredMovie.release_date).toLocaleDateString()}
              </span>
              <span className="rating">
                Rating: {featuredMovie.vote_average.toFixed(1)}/10
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Movie Carousel */}
      <div className="movie-carousel">
        <div 
          className="movie-scroll"
          style={{ '--movie-count': movies.length }}
        >
          {[...movies, ...movies].map((movie, index) => (
            <div
              key={`${movie.id}-${index}`}
              className="movie-card"
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
                onError={(e) => {
                  e.target.src = '/placeholder-movie.jpg';
                }}
              />
              <div className="movie-info">
                <p className="movie-name">{movie.title}</p>
                <p className="movie-rating">{movie.vote_average.toFixed(1)}/10</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingMovies;