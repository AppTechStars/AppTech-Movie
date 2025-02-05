import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import HeroSearchSection from '../HeroSection/HeroSearchSection';


const API_KEY = "81766caf381ea0e22e41bc9eeba2d8bb";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
    const query = useQuery();
    const initialQuery = query.get('query') || '';
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        if (initialQuery) {
            setLoading(true);
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${initialQuery}`)
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
    }, [initialQuery]);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            window.location.href = `/search?query=${encodeURIComponent(searchTerm)}`;
        }
    };

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
                <h1>Search Results for: <span>{initialQuery}</span></h1>
                <Link to="/">Go Back</Link>
            </Header>

            {loading && <Message>Loading...</Message>}
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
                        <div >
                <p className="movie-name">{movie.title}</p>
                <p className="movie-rating">{movie.release_date}</p>
              </div>
                      
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
const MoviePopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(12, 12, 12, 0.8);
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
    background:rgb(243, 9, 21);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

  h1 {
    font-size: 1.8rem;
    span {
      color:rgb(236, 32, 32);
    }
  }

  a {
    text-decoration: none;
    color: white;
    background:rgb(231, 1, 1);
    padding: 10px 15px;
    border-radius: 5px;
    transition: 0.2s;
    
    &:hover {
      background:rgb(245, 135, 135);
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
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const MovieImage = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const MovieTitle = styled.h3`
  font-size: 1rem;
  margin-top: 10px;
`;

export default SearchResults;
