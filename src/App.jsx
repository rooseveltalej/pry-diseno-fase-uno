import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import TVShowList from './components/TvShowList';
import TvShowModal from './components/TvShowModal';
import { useLanguage } from './context/LanguageContext'; // Importa el hook
import useFetchGenres from './hooks/useFetchGenres';
import useFetchTrendingMovies from './hooks/useFetchTrendingMovies';
import useFetchTrendingTVShows from './hooks/useFetchTrendingTVShows';
import useSearchActores from './hooks/useSearchActors';
import useSearchMovies from './hooks/useSearchMovies';
import useSearchTVShows from './hooks/useSearchTVShows';
import './Responsive.css';
import { closeModal, closeModalShow, showMovieDetails, showTvShowDetails } from './utils/modalHandlers';
import { handleMovieSearchChange, handleTVSearchChange } from './utils/searchHandlers';

const App = () => {
  const { language, setLanguage } = useLanguage();
  const apiKey = 'af7264be91d3f252b1abe33245f3b69f';
  const { trendingMovies } = useFetchTrendingMovies(apiKey, language);
  const { trendingTVShows } = useFetchTrendingTVShows(apiKey, language);
  const { movieGenres, tvGenres } = useFetchGenres(apiKey, language);
  const { movies, searchMovie } = useSearchMovies(apiKey, language);
  const { shows, searchTVShows } = useSearchTVShows(apiKey, language);
  const { actors, searchActors } = useSearchActores(apiKey, language);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [searchType, setSearchType] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Text translations
  const texts = {
    trendingMovies: language === 'es' ? 'Películas en Tendencia' : 'Trending Movies',
    trendingTVShows: language === 'es' ? 'Series en Tendencia' : 'Trending TV Shows',
    searchResults: language === 'es' ? 'Resultados de la Búsqueda' : 'Search Results',
    backToTrending: language === 'es' ? 'Volver a Tendencias' : 'Back to Trending',
  };

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
        onLanguageChange={(newLanguage) => setLanguage(newLanguage)} // Cambia el idioma
      />
      {showSearchResults ? (
        <>
          <h2>{texts.searchResults}</h2>
          {searchType === 'movie' ? (
            <MovieList movies={movies} onMovieClick={(movieId) => showMovieDetails(movieId, apiKey, setSelectedMovie, setSelectedShow)} language={language} />
          ) : (
            <TVShowList shows={shows} onShowClick={(showId) => showTvShowDetails(showId, apiKey, setSelectedShow)} language={language} />
          )}
        </>
      ) : (
        <>
          <h2>{texts.trendingMovies}</h2>
          <MovieList movies={trendingMovies} onMovieClick={(movieId) => showMovieDetails(movieId, apiKey, setSelectedMovie, setSelectedShow)} language={language} />
          <h2>{texts.trendingTVShows}</h2>
          <TVShowList shows={trendingTVShows} onShowClick={(showId) => showTvShowDetails(showId, apiKey, setSelectedShow)} language={language} />
        </>
      )}
      {selectedShow && <TvShowModal show={selectedShow} onClose={() => closeModalShow(setSelectedShow)} apiKey={apiKey} language={language} />}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => closeModal(setSelectedMovie)} apiKey={apiKey} language={language} />}
    </div>
  );
}

export default App;