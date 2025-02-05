import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import HeroSearchSection from '../HeroSection/HeroSearchSection';

const API_KEY = "81766caf381ea0e22e41bc9eeba2d8bb";

const SearchGenreResults = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const [movieDetails, setMovieDetails] = useState(null);
    const [genreName, setGenreName] = useState('');
    
    const location = useLocation();
    const genreId = new URLSearchParams(location.search).get('genreId');

    useEffect(() => {
        const fetchGenreName = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
                );
                const data = await response.json();
                const genre = data.genres.find(g => g.id.toString() === genreId);
                if (genre) {
                    setGenreName(genre.name);
                }
            } catch (err) {
                console.error("Failed to fetch genre name:", err);
            }
        };

        if (genreId) {
            fetchGenreName();
            setLoading(true);
            fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    setMovies(data.results);
                    setLoading(false);
                })
                .catch(() => {
                    setError("Failed to fetch movies. Please try again.");
                    setLoading(false);
                });
        }
    }, [genreId]);

    const fetchMovieDetails = async (movieId) => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovieDetails(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <HeroSearchSection />
            
            <Header>
                <h1>Movies in <span>{genreName || 'Genre'} Genre</span> </h1>
                <Link to="/">Go Back</Link>
            </Header>

            {loading && <Message>Loading movies...</Message>}
            {error && <Message>{error}</Message>}

            <MovieGrid>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} onClick={() => {
                        setHoveredMovie(movie);
                        fetchMovieDetails(movie.id);
                    }}>
                        <MovieImage
                            src={movie.poster_path 
                                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` 
                                : "https://via.placeholder.com/200x300"}
                            alt={movie.title}  
                        />
                        <MovieInfo>
                            <MovieTitle>{movie.title}</MovieTitle>
                            <ReleaseDate>{new Date(movie.release_date).getFullYear()}</ReleaseDate>
                            <Rating>⭐ {movie.vote_average.toFixed(1)}</Rating>
                        </MovieInfo>
                    </MovieCard>
                ))}
            </MovieGrid>

            {hoveredMovie && movieDetails && (
                <MoviePopup>
                    <PopupContent>
                        <CloseButton onClick={() => setHoveredMovie(null)}>✕</CloseButton>
                        <PopupImage
                            src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
                            alt={movieDetails.title}
                        />
                        <PopupInfo>
                            <h3>{movieDetails.title}</h3>
                            <p>{movieDetails.overview}</p>
                            {movieDetails.credits?.crew && (
                                <p>Director: {movieDetails.credits.crew.find(member => member.job === 'Director')?.name || 'N/A'}</p>
                            )}
                            {movieDetails.credits?.cast && (
                                <p>Cast: {movieDetails.credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}</p>
                            )}
                            {movieDetails.videos?.results[0] && (
                                <PopupButtons>
                                    <WatchButton onClick={() => window.open(`https://www.youtube.com/watch?v=${movieDetails.videos.results[0].key}`, '_blank')}>
                                        Watch Trailer
                                    </WatchButton>
                                </PopupButtons>
                            )}
                        </PopupInfo>
                    </PopupContent>
                </MoviePopup>
            )}
            <Footer/>
        </Container>
    );
};

// Styled Components
const Container = styled.div`
  padding: 20px;
  background-color: #4e69c3;
  min-height: 100vh;
  color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

  h1 {
    font-size: 1.8rem;
    span {
      color: rgb(247, 34, 34);
    }
  }

  a {
    text-decoration: none;
    color: white;
    background: rgb(231, 1, 1);
    padding: 10px 15px;
    border-radius: 5px;
    transition: 0.2s;
    
    &:hover {
      background: rgb(245, 135, 135);
    }
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 20px;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const MovieCard = styled.div`
  background: black;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 5px;
  object-fit: cover;
`;

const MovieInfo = styled.div`
  padding: 10px;
  text-align: center;
`;

const MovieTitle = styled.h3`
  font-size: 1rem;
  margin: 10px 0 5px;
`;

const ReleaseDate = styled.p`
  font-size: 0.9rem;
  color: #888;
  margin: 5px 0;
`;

const Rating = styled.p`
  font-size: 0.9rem;
  color: #ffd700;
  margin: 5px 0;
`;

const MoviePopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: #2d2d2d;
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const PopupImage = styled.img`
  width: 200px;
  border-radius: 5px;
  float: left;
  margin-right: 20px;
`;

const PopupInfo = styled.div`
  overflow: hidden;

  h3 {
    margin-top: 0;
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    margin: 10px 0;
    line-height: 1.6;
  }
`;

const PopupButtons = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const WatchButton = styled.button`
  background: #e50914;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f40612;
  }
`;

export default SearchGenreResults;