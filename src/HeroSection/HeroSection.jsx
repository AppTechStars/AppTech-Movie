import React, { useState } from "react";
import styled from "styled-components";
import { Search } from "lucide-react";
import backgroundImage from '../assets/hero-image.jpg';

const HeroSection = () => {
    const [searchTerm, setSearchTerm] = useState("");

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
                    <button>
                        <Search />
                    </button>
                </SearchBox>
            </Content>
        </HeroContainer>
    );
};

const HeroContainer = styled.div`
  min-height: 60vh; // Changed from 100vh to min-height: 60vh
  padding: 120px 20px; // Added padding top and bottom
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px; // Adjust this value to control the fade height
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
    pointer-events: none;
  }
`;

const Content = styled.div`
  text-align: left;
  color: black;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
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
  margin-top: 20px;
  margin-bottom: 40px; // Added margin bottom
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  input {
    padding: 15px; // Increased padding
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    flex: 1;
    background: rgba(255, 255, 255, 0.9);
    
    &::placeholder {
      color: #666;
    }
    
    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
    }
  }

  button {
    padding: 15px 20px; // Increased padding
    font-size: 1rem;
    background: black;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background: #333;
    }
  }
`;

export default HeroSection;