import React, { useEffect, useState } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #1a1a1a;
  color: white;
`;

const Header = styled.header`
  background-color: #2d2d2d;
  padding: 1.5rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  
  span {
    color: #e50914;
  }
`;

const BackButton = styled.button`
  background-color: #e50914;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f40612;
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const MovieCard = styled.div`
  background-color: #2d2d2d;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const MovieInfo = styled.div`
  padding: 1rem;
`;

const MovieTitle = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const MovieOverview = styled.p`
  font-size: 0.9rem;
  color: #cccccc;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.2rem;
`;

const ErrorContainer = styled(LoadingContainer)`
  color: #e50914;
`;

const SearchGenreResults = () => {
  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate URL params for demo
  const genreId = "28"; // Action movies

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=81766caf381ea0e22e41bc9eeba2d8bb`
        );
        const data = await response.json();
        setMovies(data.results);

        // Fetch images for each movie
        const imagePromises = data.results.map(async (movie) => {
          const imageResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=81766caf381ea0e22e41bc9eeba2d8bb`
          );
          const imageData = await imageResponse.json();
          return {
            id: movie.id,
            path: imageData.backdrops[0]?.file_path || null,
          };
        });

        const imageResults = await Promise.all(imagePromises);
        const newImages = {};
        imageResults.forEach((result) => {
          newImages[result.id] = result.path;
        });
        setImages(newImages);
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (genreId) {
      fetchMoviesByGenre();
    }
  }, [genreId]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>Loading movies...</LoadingContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorContainer>{error}</ErrorContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <Title>
            Movies in <span>Genre</span>
          </Title>
          <BackButton>Back to Genres</BackButton>
        </HeaderContent>
      </Header>

      <MainContent>
        <MovieGrid>
          {movies.map((movie) => (
            <MovieCard key={movie.id}>
              {images[movie.id] ? (
                <MovieImage
                  src={`https://image.tmdb.org/t/p/w500${images[movie.id]}`}
                  alt={movie.title}
                />
              ) : (
                <MovieImage
                  src="/api/placeholder/400/320"
                  alt="No image available"
                />
              )}
              <MovieInfo>
                <MovieTitle>{movie.title}</MovieTitle>
                <MovieOverview>{movie.overview}</MovieOverview>
              </MovieInfo>
            </MovieCard>
          ))}
        </MovieGrid>
      </MainContent>
    </PageContainer>
  );
};

export default SearchGenreResults;