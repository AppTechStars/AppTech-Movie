import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchGenreResults = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const genreId = new URLSearchParams(location.search).get('genreId'); // Extract genreId from the query params

  useEffect(() => {
    if (genreId) {
      const fetchMoviesByGenre = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=81766caf381ea0e22e41bc9eeba2d8bb`
        );
        const data = await response.json();
        setMovies(data.results);
      };
      
      fetchMoviesByGenre();
    }
  }, [genreId]);

  return (
    <div>
      <h1>Movies in Genre: {genreId}</h1>
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchGenreResults;
