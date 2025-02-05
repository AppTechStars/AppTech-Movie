import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Search } from "lucide-react";
import garfieldVideo from "/public/cinema.mp4"; // Import the video file
 
 
const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const videoRef = useRef(null);
 
  useEffect(() => {
    // Fetch the genre list from TMDB API
    const fetchGenres = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=81766caf381ea0e22e41bc9eeba2d8bb"
      );
      const data = await response.json();
      setGenres(data.genres); // Store genres in state
    };
 
    fetchGenres();
   
    // Attempt to play video when component mounts
    if (videoRef.current) {
      const playVideo = async () => {
        try {
          await videoRef.current.play();
        } catch (error) {
          console.error("Video autoplay failed:", error);
        }
      };
      playVideo();
    }
  }, []);
 
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    } else if (selectedGenre) {
      navigate(`/genre?genreId=${selectedGenre}`);
    }
  };
 
  return (
    <HeroContainer>
      <VideoBackground ref={videoRef} autoPlay loop muted playsInline preload="auto">
        <source src={garfieldVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
 
      <Overlay /> {/* Added overlay to improve text visibility */}
 
      <Content>
        <Title>
          <Highlight>AppTech Movies</Highlight>
          <Moving>Your Gateway to Cinematic Adventures.</Moving>
        </Title>
 
        <SearchBox>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="select-genre"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            style={{ borderRadius: '10px', color: 'white', borderColor: 'blue', backgroundColor: 'black' }}
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
 
export default HeroSection;