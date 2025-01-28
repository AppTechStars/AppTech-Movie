import React from 'react';
import MovieCard from '../components/MovieCard';

const movies = [
  {
    title: 'Inception',
    poster: 'https://example.com/inception.jpg',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology.'
  },
  {
    title: 'Interstellar',
    poster: 'https://example.com/interstellar.jpg',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
  },
  // Add more movies here
];

const Home = () => {
  return (
    <div className="home">
      <h1>Movie List</h1>
      <div className="movie-list">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            poster={movie.poster}
            description={movie.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;