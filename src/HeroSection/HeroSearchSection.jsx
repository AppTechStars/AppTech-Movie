import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Search } from "lucide-react";

const API_KEY = '81766caf381ea0e22e41bc9eeba2d8bb'; // Make sure to replace with your actual API key

const HeroSearchSection = () => {
    const query = new URLSearchParams(useLocation().search);
    const initialQuery = query.get('query') || '';
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const videoRef = useRef(null);
    const navigate = useNavigate();
    const searchResultsRef = useRef(null);

    useEffect(() => {
        const playVideo = async () => {
            if (videoRef.current) {
                try {
                    await videoRef.current.play();
                } catch (error) {
                    console.error("Video autoplay failed:", error);
                }
            }
        };

        const fetchMovies = async () => {
            if (initialQuery) {
                setLoading(true);
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${initialQuery}`);
                    const data = await response.json();
                    setMovies(data.results);
                } catch {
                    setError("Failed to fetch movies. Please try again.");
                } finally {
                    setLoading(false);
                }
            }
        };

        playVideo();
        fetchMovies();
    }, [initialQuery]);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
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
                {/* <Title>
                    <Highlight>AppTech Movies</Highlight> <Moving>Your Gateway to Cinematic Adventures.</Moving>
                </Title> */}
                <h1>Search Results for: <span>{initialQuery}</span> </h1>
             
                <SearchBox>
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleSearch}>
                        <Search />
                    </button>
                </SearchBox>
                {/* {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <div ref={searchResultsRef}>
                    {movies.map(movie => (
                        <div key={movie.id}>{movie.title}</div>
                    ))}
                </div> */}
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
  overflow: hidden; /* Prevent video from spilling out */
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
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
  z-index: 1;
`;

const Content = styled.div`
  text-align: center;
  color: white;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  z-index: 2; /* Ensure content is above overlay */
  position: relative;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.2;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Improve text readability */
`;

const Highlight = styled.span`
  color: #007bff;
`;

const Moving = styled.span`
  color: white;
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