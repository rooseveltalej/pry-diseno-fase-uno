import { useState, useEffect } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import './App.css';
import './Responsive.css'

const App = () => {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [ShowSearchResults, setShowSearchResults] = useState(false)
  const apiKey = 'af7264be91d3f252b1abe33245f3b69f';

  useEffect(() => {
    fetchGenres();
    fetchTrendingMovies();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es-ES`);
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=es-ES`);
      const data = await response.json();
      setTrendingMovies(data.results);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
  };

  const searchMovie = async (query = '') => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${query}`);
      const data = await response.json();
      setMovies(data.results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const showMovieDetails = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-ES&append_to_response=credits,videos`);
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const goBackToTrending = () => {
    setShowSearchResults(false);
    setMovies([]); // Opcional: Limpiar los resultados de búsqueda
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazarse suavemente hacia la parte superior
  };

  return (
    <div className="app-container">
      <Header onSearch={searchMovie} genres={genres} />
          {ShowSearchResults ? (
      <>
        <h2>Resultados de la Búsqueda</h2>
        <div className="button-container">
          <button className="back-to-trending-button" onClick={goBackToTrending}>Volver a Tendencias</button>
        </div>
        <MovieList movies={movies} onMovieClick={showMovieDetails} />
      </>
    ) : (
      <>
        <h2>Películas en Tendencia</h2>
        <MovieList movies={trendingMovies} onMovieClick={showMovieDetails} />
      </>
    )}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
    </div>
  );
};

export default App;
