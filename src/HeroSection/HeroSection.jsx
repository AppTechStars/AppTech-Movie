import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Search } from "lucide-react";


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
                <source src="/garfield.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </VideoBackground>

            <Overlay /> {/* Added overlay to improve text visibility */}

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
                  onKeyPress={handleKeyPress}
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


