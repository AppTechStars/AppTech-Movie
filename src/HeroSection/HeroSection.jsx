import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Search } from "lucide-react";
import backgroundImage from '../assets/hero-image.jpg';

const HeroSection = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const videoRef = useRef(null);
    const navigate = useNavigate();


    useEffect(() => {
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
        }
    };

    return (
        <HeroContainer>
            <Content>
                <Title>
                    <Highlight>AppTech Movies</Highlight> <Moving>Your Gateway to Cinematic Adventures.</Moving>
                </Title>

                <SearchBox>
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>
                        <Search />
                    </button>
                </SearchBox>
            </Content>
        </HeroContainer>
    );
};

// Styled Components
const HeroContainer = styled.div`
  min-height: 60vh;
  padding: 120px 20px;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Content = styled.div`
  text-align: center;
  color: white;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.2;
  margin-bottom: 2rem;
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


