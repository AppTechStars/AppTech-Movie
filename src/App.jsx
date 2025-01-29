import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './HeroSection/HeroSection';
import TrendingMovies from './MoviesFolder/TrendingMovies';
import Navbar from './Navbar/NavBar';
import SearchResults from './MoviesFolder/SearchResults';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <TrendingMovies />
            </>
          } />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
