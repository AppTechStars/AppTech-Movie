import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './HeroSection/HeroSection';

import TrendingMovies from './MoviesFolder/TrendingMovies';
import Navbar from './Navbar/NavBar';
import SearchResults from './MoviesFolder/SearchResults';
import GenreResults from './MoviesFolder/SearchGenreResults';
import Footer from './Footer/Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar/>
    
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <TrendingMovies />
              <Footer/>
            </>
          } />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/genre" element={<GenreResults />} />
        
        </Routes>
       
       
      </div>
   
    </Router>
    
  );
}

export default App;
