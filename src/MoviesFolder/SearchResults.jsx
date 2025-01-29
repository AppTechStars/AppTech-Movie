import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

const API_KEY = "81766caf381ea0e22e41bc9eeba2d8bb";

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query");
    
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (query) {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.results.length > 0) {
                        setMovies(data.results);
                    } else {
                        setError("No movies found.");
                    }
                    setLoading(false);
                })
                .catch(() => {
                    setError("Failed to fetch movies. Please try again.");
                    setLoading(false);
                });
        }
    }, [query]);

    return (
        <Container>
            <Header>
                <h1>Search Results for: <span>{query}</span></h1>
                <Link to="/">Go Back</Link>
            </Header>

            {loading && <Message>Loading...</Message>}
            {error && <Message>{error}</Message>}

            <MovieGrid>
                {movies.map((movie) => (
                    <MovieCard key={movie.id}>
                        <MovieImage
                            src={movie.poster_path 
                                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` 
                                : "https://via.placeholder.com/200x300"}
                            alt={movie.title}
                        />
                        <MovieTitle>{movie.title}</MovieTitle>
                    </MovieCard>
                ))}
            </MovieGrid>
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
      color:rgb(247, 34, 34);
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
