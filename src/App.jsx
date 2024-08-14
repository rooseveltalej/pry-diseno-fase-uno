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
  const [shows, setShows] = useState([]); // Estado para las series
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]); // Estado para las series en tendencia
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(''); // Estado para el género seleccionado
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const apiKey = 'af7264be91d3f252b1abe33245f3b69f';

  useEffect(() => {
    fetchGenres();
    fetchTrendingMovies();
    fetchTrendingTVShows(); // Llamar a la función para obtener las series en tendencia
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      fetchTrendingMoviesByGenre(selectedGenre);
    } else {
      fetchTrendingMovies();
    }
  }, [selectedGenre]);

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

  const searchMovie = async (query = '') => {
    try {
      if (!query) {
        setShowSearchResults(false);
        setMovies([]);
        setShows([]);
        return;
      }

      // Buscar películas
      const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${query}`);
      const movieData = await movieResponse.json();

      // Buscar series
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
      setSelectedShow(null); // Asegúrate de limpiar el estado de la serie seleccionada
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
    setMovies([]); // Opcional: Limpiar los resultados de búsqueda
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazarse suavemente hacia la parte superior
  };

  return (
    <div className="app-container">
      <Header onSearch={searchMovie} genres={genres} onGenreChange={setSelectedGenre} />
      {showSearchResults ? (
        <>
          <h2>Resultados de la Búsqueda</h2>
          <div className="button-container">
            <button className="back-to-trending-button" onClick={goBackToTrending}>Volver a Tendencias</button>
          </div>
          <MovieList movies={movies} onMovieClick={showMovieDetails} />
          <TVShowList shows={shows} onShowClick={showTvShowDetails} /> {/* Nueva sección para las series en tendencia */}
        </>
      ) : (
        <>
          <h2>Películas en Tendencia</h2>
          <MovieList movies={trendingMovies} onMovieClick={showMovieDetails} />
          <h2>Series en Tendencia</h2> {/* Nueva sección para las series en tendencia */}
          <TVShowList shows={trendingTVShows} onShowClick={showTvShowDetails} />
        </>
      )}
      {selectedShow && <TvShowModal show={selectedShow} onClose={closeModalShow} />}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
    </div>
  );
};

export default App;
