import React from 'react';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const movies = [
    {
      id: 1,
      title: 'Inception',
      poster: 'https://example.com/inception.jpg',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology.'
    },
    {
      id: 2,
      title: 'Interstellar',
      poster: 'https://example.com/interstellar.jpg',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
    },
    {
      id: 3,
      title: 'The Dark Knight',
      poster: 'https://example.com/dark-knight.jpg',
      description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.'
    }
  ];

  return (
    <div>
      <h1>Movie List</h1>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
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