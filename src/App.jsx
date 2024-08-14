import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import TVShowList from './components/TvShowList';
import TvShowModal from './components/TvShowModal';
import './Responsive.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTVGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedTVShowGenre, setSelectedTVShowGenre] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const apiKey = 'af7264be91d3f252b1abe33245f3b69f';

  useEffect(() => {
    fetchGenres();
    fetchTrendingMovies();
    fetchTrendingTVShows();
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      fetchTrendingMoviesByGenre(selectedGenre);
    } else {
      fetchTrendingMovies();
    }
  }, [selectedGenre]);

  useEffect(() => {
    if (selectedTVShowGenre) {
      fetchTrendingTVShowsByGenre(selectedTVShowGenre);
    } else {
      fetchTrendingTVShows();
    }
  }, [selectedTVShowGenre]);

  const fetchGenres = async () => {
    try {
      // Obtener géneros de películas
      const movieGenreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es-ES`);
      const movieGenreData = await movieGenreResponse.json();
      setMovieGenres(movieGenreData.genres);

      // Obtener géneros de series
      const tvGenreResponse = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=es-ES`);
      const tvGenreData = await tvGenreResponse.json();
      setTVGenres(tvGenreData.genres);

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

  const fetchTrendingMoviesByGenre = async (genreId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&with_genres=${genreId}`);
      const data = await response.json();
      setTrendingMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
    }
  };

  const fetchTrendingTVShows = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=es-ES`);
      const data = await response.json();
      setTrendingTVShows(data.results);
    } catch (error) {
      console.error('Error fetching trending TV shows:', error);
    }
  };

  const fetchTrendingTVShowsByGenre = async (genreId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=es-ES&with_genres=${genreId}`);
      const data = await response.json();
      setTrendingTVShows(data.results);
    } catch (error) {
      console.error('Error fetching TV shows by genre:', error);
    }
  };

  const searchMovie = async (query = '') => {
    try {
      if (!query) {
        setShowSearchResults(false);
        setMovies([]);
        setShows([]);
        return;
      }

      const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${query}`);
      const movieData = await movieResponse.json();

      const showResponse = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=es-ES&query=${query}`);
      const showData = await showResponse.json();

      setMovies(movieData.results);
      setShows(showData.results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error searching:', error);
    }
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

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const closeModalShow = () => {
    setSelectedShow(null);
  };

  const goBackToTrending = () => {
    setShowSearchResults(false);
    setMovies([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <Header 
        onSearch={searchMovie} 
        movieGenres={movieGenres} 
        tvGenres={tvGenres} 
        onGenreChange={setSelectedGenre} 
        onTVShowGenreChange={setSelectedTVShowGenre} 
      />
      {showSearchResults ? (
        <>
          <h2>Resultados de la Búsqueda</h2>
          <div className="button-container">
            <button className="back-to-trending-button" onClick={goBackToTrending}>Volver a Tendencias</button>
          </div>
          <MovieList movies={movies} onMovieClick={showMovieDetails} />
          <TVShowList shows={shows} onShowClick={showTvShowDetails} />
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
};

export default App;