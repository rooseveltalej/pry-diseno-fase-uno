import { useState } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import TVShowList from './components/TvShowList';
import TvShowModal from './components/TvShowModal';
import useFetchTrendingMovies from './hooks/useFetchTrendingMovies';
import useFetchTrendingTVShows from './hooks/useFetchTrendingTVShows';
import useFetchGenres from './hooks/useFetchGenres';
import useSearchMovies from './hooks/useSearchMovies';
import useSearchTVShows from './hooks/useSearchTVShows';
import './App.css';
import './Responsive.css';

const App = () => {
  const apiKey = 'af7264be91d3f252b1abe33245f3b69f';

  const { trendingMovies, error: trendingMoviesError, loading: loadingMovies } = useFetchTrendingMovies(apiKey);
  const { trendingTVShows, error: trendingTVShowsError, loading: loadingTVShows } = useFetchTrendingTVShows(apiKey);
  const { movieGenres, tvGenres, error: genresError, loading: loadingGenres } = useFetchGenres(apiKey);
  const { movies, searchMovie } = useSearchMovies(apiKey);
  const { shows, searchTVShows } = useSearchTVShows(apiKey);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [searchType, setSearchType] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleMovieSearchChange = (query) => {
    if (!query) {
      setShowSearchResults(false);
      return;
    }
    searchMovie(query);
    setSearchType('movie');
    setShowSearchResults(true);
  };

  const handleTVSearchChange = (query) => {
    if (!query) {
      setShowSearchResults(false);
      return;
    }
    searchTVShows(query);
    setSearchType('tv');
    setShowSearchResults(true);
  };

  const showMovieDetails = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-ES&append_to_response=credits,videos`);
      const data = await response.json();
      setSelectedMovie(data);
      setSelectedShow(null);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const showTvShowDetails = async (showId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}&language=es-ES&append_to_response=credits,videos`);
      const data = await response.json();
      setSelectedShow(data);
    } catch (error) {
      console.error('Error fetching TV show details:', error);
    }
  };

  const closeModal = () => setSelectedMovie(null);
  const closeModalShow = () => setSelectedShow(null);
  const goBackToTrending = () => {
    setShowSearchResults(false);
    setSearchType('');
  };

  return (
    <div className="app-container">
      <Header 
        onSearch={handleMovieSearchChange} 
        onSearchTVShows={handleTVSearchChange} 
        movieGenres={movieGenres} 
        tvGenres={tvGenres} 
        onGenreChange={(genre) => searchMovie('', genre)} 
        onTVShowGenreChange={(genre) => searchTVShows('', genre)} 
      />
      {showSearchResults ? (
        <>
          <h2>Resultados de la Búsqueda</h2>
          <div className="button-container">
            <button className="back-to-trending-button" onClick={goBackToTrending}>
              Volver a Tendencias
            </button>
          </div>
          {searchType === 'movie' ? (
            <MovieList movies={movies} onMovieClick={showMovieDetails} />
          ) : (
            <TVShowList shows={shows} onShowClick={showTvShowDetails} />
          )}
        </>
      ) : (
        <>
          <h2>Películas en Tendencia</h2>
          <MovieList movies={trendingMovies} onMovieClick={showMovieDetails} />
          <h2>Series en Tendencia</h2>
          <TVShowList shows={trendingTVShows} onShowClick={showTvShowDetails} />
        </>
      )}
      {selectedShow && <TvShowModal show={selectedShow} onClose={closeModalShow} />}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
    </div>
  );
}

export default App;