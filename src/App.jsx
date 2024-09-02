import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import TVShowList from './components/TvShowList';
import TvShowModal from './components/TvShowModal';
import { useLanguage } from './context/LanguageContext';
import useFetchGenres from './hooks/useFetchGenres';
import useFetchTrendingMovies from './hooks/useFetchTrendingMovies';
import useFetchTrendingTVShows from './hooks/useFetchTrendingTVShows';
import useSearchByActor from './hooks/useSearchByActor';
import useSearchMovies from './hooks/useSearchMovies';
import useSearchTVShows from './hooks/useSearchTVShows';
import './Responsive.css';
import { closeModal, closeModalShow, showMovieDetails, showTvShowDetails } from './utils/modalHandlers';
import { handleActorSearch, handleMovieSearchChange, handleTVSearchChange } from './utils/searchHandlers';

const App = () => {
  const { language, setLanguage } = useLanguage();
  const apiKey = "YOUR_API_KEY";
  const { trendingMovies } = useFetchTrendingMovies(apiKey, language);
  const { trendingTVShows } = useFetchTrendingTVShows(apiKey, language);
  const { movieGenres = [], tvGenres = [], actorGenres = [] } = useFetchGenres(apiKey, language, 'person');
  const { movies, searchMovie } = useSearchMovies(apiKey, language);
  const { shows, searchTVShows } = useSearchTVShows(apiKey, language);
  const { actorMovies, searchMoviesByActor, actorTvShows, searchTVShowsByActor, getActorId } = useSearchByActor(apiKey, language);

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


  const getAccountId = async () => {
    try {
      const sessionId = localStorage.getItem('session_id'); // Asegúrate de que el session_id esté disponible
      if (!sessionId) {
        console.error('Session ID is missing');
        alert('No se pudo obtener el ID de sesión.');
        return null;
      }
  
      const response = await fetch(`https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        return data.id; // Retorna el account_id
      } else {
        const errorData = await response.json();
        console.error('Error al obtener el account_id:', errorData);
        alert('Error al obtener el ID de cuenta.');
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al obtener el ID de cuenta.');
      return null;
    }
  };
  

  // Function to handle adding to favorites
  const handleAddToFavorites = async (mediaId, media_type) => {
    try {
      const sessionId = localStorage.getItem('session_id');
      const accountId = localStorage.getItem('account_id') || await getAccountId(); // Obtén el account_id si no está en localStorage
  
      if (!sessionId || !accountId) {
        console.error('Session ID or Account ID is missing');
        alert('No se pudo obtener la sesión o el ID de cuenta.');
        return;
      }
  
      // Guarda el accountId en localStorage para futuras solicitudes
      localStorage.setItem('account_id', accountId);
  
      const endpoint = `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          media_type: media_type, // O 'movie', dependiendo del tipo de medio
          media_id: mediaId,
          favorite: true
        }),
      });
  
      if (response.ok) {
        alert('Elemento agregado a favoritos.');
      } else {
        const errorData = await response.json();
        console.error('Error al agregar a favoritos:', errorData);
        alert('Error al agregar a favoritos.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al agregar a favoritos.');
    }
  };

  return (
    <div className="app-container">
      <Header 
        onSearch={(query) => handleMovieSearchChange(query, searchMovie, setSearchType, setShowSearchResults)} 
        onSearchTVShows={(query) => handleTVSearchChange(query, searchTVShows, setSearchType, setShowSearchResults)} 
        onSearchByActor={(query) => handleActorSearch(query, getActorId, searchMoviesByActor, searchTVShowsByActor, setSearchType, setShowSearchResults)}
        movieGenres={movieGenres} 
        tvGenres={tvGenres} 
        actorGenres={actorGenres}
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
        onActorGenreChange={(genre) => {
          if (!genre) {
            setShowSearchResults(false);
            return;
          }
          searchMoviesByActor('', genre);
          searchTVShowsByActor('', genre);
          setSearchType('actor');
          setShowSearchResults(true);
        }} 
        onLanguageChange={(newLanguage) => setLanguage(newLanguage)} 
      />
      {showSearchResults ? (
        <>
          <h2>{texts.searchResults}</h2>
          {searchType === 'movie' && (
            <MovieList 
              movies={movies} 
              onMovieClick={(movieId) => showMovieDetails(movieId, apiKey, setSelectedMovie, setSelectedShow)} 
              language={language} 
              buttonType='add'
              onFavoriteClick={(movieId) => handleAddToFavorites(movieId, 'movie')} 
            />
          )}
          {searchType === 'tv' && (
            <TVShowList 
              shows={shows} 
              onShowClick={(showId) => showTvShowDetails(showId, apiKey, setSelectedShow)} 
              language={language} 
              buttonType='add'
              onButtonClick={(showId) => handleAddToFavorites(showId, 'tv')} 
            />
          )}
          {searchType === 'actor' && (
            <>
              <MovieList 
                movies={actorMovies} 
                onMovieClick={(movieId) => showMovieDetails(movieId, apiKey, setSelectedMovie, setSelectedShow)} 
                language={language} 
                buttonType='add'
                onFavoriteClick={(movieId) => handleAddToFavorites(movieId, 'movie')} 
              />
              <TVShowList 
                shows={actorTvShows} 
                onShowClick={(showId) => showTvShowDetails(showId, apiKey, setSelectedShow)} 
                language={language} 
                buttonType='add'
                onButtonClick={(showId) => handleAddToFavorites(showId, 'tv')} 
              />
            </>
          )}
        </>
      ) : (
        <>
          <h2>{texts.trendingMovies}</h2>
          <MovieList 
            movies={trendingMovies} 
            onMovieClick={(movieId) => showMovieDetails(movieId, apiKey, setSelectedMovie, setSelectedShow)} 
            language={language} 
            buttonType='add'
            onFavoriteClick={(movieId) => handleAddToFavorites(movieId, 'movie')} 
          />
          <h2>{texts.trendingTVShows}</h2>
          <TVShowList 
            shows={trendingTVShows} 
            onShowClick={(showId) => showTvShowDetails(showId, apiKey, setSelectedShow)} 
            language={language} 
            buttonType='add'
            onButtonClick={(showId) => handleAddToFavorites(showId, 'tv')} 
          />
        </>
      )}
      {selectedShow && <TvShowModal show={selectedShow} onClose={() => closeModalShow(setSelectedShow)} apiKey={apiKey} language={language} />}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => closeModal(setSelectedMovie)} apiKey={apiKey} language={language} />}
    </div>
  );
};

export default App;
