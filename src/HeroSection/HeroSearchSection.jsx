import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Search } from "lucide-react";

const API_KEY = '81766caf381ea0e22e41bc9eeba2d8bb'; // Make sure to replace with your actual API key

const HeroSearchSection = () => {
    const query = new URLSearchParams(useLocation().search);
    const initialQuery = query.get('query') || '';
    const initialGenre = query.get('genreId') || ''; // Get genreId from the query params if present
    const [searchTerm, setSearchTerm] = useState(initialQuery);
<<<<<<< HEAD
    
=======
    const [selectedGenre, setSelectedGenre] = useState(initialGenre);
>>>>>>> e4b2b82fe3f26f941ec9404f61bd5b47ca0c4035
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [genres, setGenres] = useState([]); // Store genres list

    const videoRef = useRef(null);
    const navigate = useNavigate();
    const searchResultsRef = useRef(null);

    // Fetch genres list
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${API_KEY}`
                );
                const data = await response.json();
                setGenres(data.genres);
            } catch (err) {
                console.error("Failed to fetch genres:", err);
            }
        };

        fetchGenres();
    }, []);

    // Fetch movies based on the query and selected genre
    useEffect(() => {
        const fetchMovies = async () => {
            if (initialQuery || selectedGenre) {
                setLoading(true);
                try {
                    let url = '';
                    if (selectedGenre) {
                        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`;
                    } else if (initialQuery) {
                        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${initialQuery}`;
                    }
                    const response = await fetch(url);
                    const data = await response.json();
                    setMovies(data.results);
                } catch (err) {
                    setError("Failed to fetch movies. Please try again.");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchMovies();
    }, [initialQuery, selectedGenre]);

    const handleSearch = () => {
        // Navigate to the search page with query params
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}&genreId=${selectedGenre}`);
        }

        // Scroll to search results
        if (searchResultsRef.current) {
            searchResultsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <HeroContainer>
            <VideoBackground
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
            >
                <source src="/Spiderverse-Video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </VideoBackground>

            <Overlay /> {/* Added overlay to improve text visibility */}

            <Content>
                <h1>Search Results for: <span>{initialQuery}</span> </h1>
             
                <SearchBox>
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        <option value="">Select Genre</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleSearch}>
                        <Search />
                    </button>
                </SearchBox>

                
               

                <h2>Scroll Down to View Movies</h2>
            </Content>
        </HeroContainer>
    );
};

const HeroContainer = styled.div`
  min-height: 60vh;
  padding: 120px 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const Content = styled.div`
  text-align: center;
  color: white;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  z-index: 2;
  position: relative;
`;

const SearchBox = styled.div`
  display: flex;
  gap: 10px;
  max-width: 600px;
  margin: auto;

  input {
    flex: 1;
    padding: 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    
    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 2px rgba(0, 123, 255, 0.5);
    }
  }

  select {
    padding: 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: white;
    min-width: 150px;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 2px rgba(0, 123, 255, 0.5);
    }
  }

  button {
    padding: 12px 20px;
    font-size: 1rem;
    background: red;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s;
    
    &:hover {
      background: #333;
    }
  }
`;

export default HeroSearchSection;
