import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import TVShowList from './components/TvShowList';
import TvShowModal from './components/TvShowModal';
import useFetchGenres from './hooks/useFetchGenres';
import useFetchTrendingMovies from './hooks/useFetchTrendingMovies';
import useFetchTrendingTVShows from './hooks/useFetchTrendingTVShows';
import useSearchMovies from './hooks/useSearchMovies';
import useSearchTVShows from './hooks/useSearchTVShows';
import './Responsive.css';
import { closeModal, closeModalShow, showMovieDetails, showTvShowDetails } from './utils/modalHandlers';
import { goBackToTrending } from './utils/navigationHandlers';
import { handleMovieSearchChange, handleTVSearchChange } from './utils/searchHandlers';

const App = () => {
  const apiKey = 'af7264be91d3f252b1abe33245f3b69f';
  const { trendingMovies } = useFetchTrendingMovies(apiKey);
  const { trendingTVShows } = useFetchTrendingTVShows(apiKey);
  const { movieGenres, tvGenres } = useFetchGenres(apiKey);
  const { movies, searchMovie } = useSearchMovies(apiKey);
  const { shows, searchTVShows } = useSearchTVShows(apiKey);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [searchType, setSearchType] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  return (
    <div className="app-container">
      <Header 
        onSearch={(query) => handleMovieSearchChange(query, searchMovie, setSearchType, setShowSearchResults)} 
        onSearchTVShows={(query) => handleTVSearchChange(query, searchTVShows, setSearchType, setShowSearchResults)} 
        movieGenres={movieGenres} 
        tvGenres={tvGenres} 
        onGenreChange={(genre) => {
          if (!genre) {
            setShowSearchResults(false);
            return;
          }
          searchMovie('', genre);
          setSearchType('movie');
          setShowSearchResults(true);
        }} 
        onTVShowGenreChange={(genre) => {
          if (!genre) {
            setShowSearchResults(false);
            return;
          }
          searchTVShows('', genre);
          setSearchType('tv');
          setShowSearchResults(true);
        }} 
/>
      {showSearchResults ? (
        <>
          <h2>Resultados de la Búsqueda</h2>
          <div className="button-container">
            <button className="back-to-trending-button" onClick={() => goBackToTrending(setShowSearchResults, setSearchType)}>
              Volver a Tendencias
            </button>
          </div>
          {searchType === 'movie' ? (
            <MovieList movies={movies} onMovieClick={(movieId) => showMovieDetails(movieId, apiKey, setSelectedMovie, setSelectedShow)} />
          ) : (
            <TVShowList shows={shows} onShowClick={(showId) => showTvShowDetails(showId, apiKey, setSelectedShow)} />
          )}
        </>
      ) : (
        <>
          <h2>Películas en Tendencia</h2>
          <MovieList movies={trendingMovies} onMovieClick={(movieId) => showMovieDetails(movieId, apiKey, setSelectedMovie, setSelectedShow)} />
          <h2>Series en Tendencia</h2>
          <TVShowList shows={trendingTVShows} onShowClick={(showId) => showTvShowDetails(showId, apiKey, setSelectedShow)} />
        </>
      )}
      {selectedShow && <TvShowModal show={selectedShow} onClose={() => closeModalShow(setSelectedShow)} apiKey={apiKey} />}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => closeModal(setSelectedMovie)} apiKey={apiKey} />}
    </div>
  );
}
 
export default App;