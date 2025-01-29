import './App.css';
import { BrowserRouter } from 'react-router-dom';
import HeroSection from './HeroSection/HeroSection';
import TrendingMovies from './MoviesFolder/TrendingMovies';
import Navbar from './Navbar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <HeroSection />
        <TrendingMovies />
      </div>
    </BrowserRouter>
  );
}

export default App;