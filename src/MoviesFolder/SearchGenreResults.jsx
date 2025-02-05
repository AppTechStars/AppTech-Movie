import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchGenreResults = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState({});
  const genreId = new URLSearchParams(location.search).get('genreId'); // Extract genreId from the query params

  useEffect(() => {
    if (genreId) {
      const fetchMoviesByGenre = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=81766caf381ea0e22e41bc9eeba2d8bb`
        );
        const data = await response.json();
        setMovies(data.results);

        // Now fetch images for each movie
        data.results.forEach(async (movie) => {
          const imageResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=81766caf381ea0e22e41bc9eeba2d8bb`
          );
          const imageData = await imageResponse.json();
          // Store images in state, using movie.id as the key
          setImages((prevImages) => ({
            ...prevImages,
            [movie.id]: imageData.backdrops[0] ? imageData.backdrops[0].file_path : null,
          }));
        });
      };

      fetchMoviesByGenre();
    }
  }, [genreId]);

  return (
    <div>
      <h1>Movies in Genre</h1>
      <div>
        {movies.map((movie) => (
          <div key={movie.id} style={{ marginBottom: "20px" }}>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            {images[movie.id] ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${images[movie.id]}`}
                alt={movie.title}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchGenreResults;
