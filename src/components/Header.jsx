import PropTypes from 'prop-types';
import { useState } from 'react';
import './Header.css'; // Archivo CSS para los estilos
import LoginForm from './login/LoginForm';

const Header = ({
  onSearch,
  onSearchTVShows,
  movieGenres,
  tvGenres,
  onGenreChange,
  onTVShowGenreChange,
  onLanguageChange,
}) => {
  const [searchType, setSearchType] = useState('movies');
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('es'); // Estado para el idioma
  const [selectedGenre, setSelectedGenre] = useState(''); // Estado para el género seleccionado

  const isSearching = query.length > 0; // Determina si se está buscando
  const isGenreSelected = selectedGenre !== ''; // Determina si se ha seleccionado un género
  const isLanguageSelected = language !== 'es'; // Determina si se ha seleccionado un idioma distinto al español

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
    if (searchType === 'movies') {
      onSearch(event.target.value);
    } else {
      onSearchTVShows(event.target.value);
    }
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setQuery('');
    setSelectedGenre(''); // Reinicia el género seleccionado al cambiar el tipo de búsqueda
    if (event.target.value === 'movies') {
      onSearch('');
    } else {
      onSearchTVShows('');
    }
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value); // Actualiza el género seleccionado
    setQuery('');
    if (searchType === 'movies') {
      onGenreChange(event.target.value);
    } else {
      onTVShowGenreChange(event.target.value);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    onLanguageChange(event.target.value);
  };

  const handleReset = () => {
    setQuery('');
    setSelectedGenre(''); // Reinicia el género seleccionado al hacer reset
    if (searchType === 'movies') {
      onSearch('');
    } else {
      onSearchTVShows('');
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="header-button" onClick={handleReset}>
          {( (isSearching && isLanguageSelected) || isSearching || isGenreSelected) ? (language === 'es' ? 'Volver al inicio' : 'Back to start') : (language === 'es' ? 'Inicio' : 'Start')}
        </button>
      </div>
      <div className="header-center">
        <h1 className="header-title">{language === 'es' ? 'TECFLIX' : 'TECFLIX'}</h1>
        <div className="header-controls">
          <select className="header-select" onChange={handleLanguageChange} value={language}>
            <option value="es">{language === 'es' ? 'Español' : 'Spanish'}</option>
            <option value="en">{language === 'en' ? 'English' : 'Inglés'}</option>
          </select>
          <select className="header-select" onChange={handleSearchTypeChange} value={searchType}>
            <option value="movies">{language === 'es' ? 'Películas' : 'Movies'}</option>
            <option value="tvshows">{language === 'es' ? 'Series de TV' : 'TV Shows'}</option>
          </select>
          <input 
            className="header-input"
            type="text" 
            placeholder={language === 'es' ? `Buscar ${searchType === 'movies' ? 'películas' : 'series'}...` : `Search for ${searchType === 'movies' ? 'movies' : 'TV shows'}...`} 
            value={query}
            onChange={handleSearchChange} 
          />
          <select className="header-select" onChange={handleGenreChange} value={selectedGenre}>
            <option value="">{language === 'es' ? 'Tendencias' : 'Trending'}</option>
            {(searchType === 'movies' ? movieGenres : tvGenres).map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="header-right">
        <LoginForm onLanguageChange={language} />
      </div>
    </header>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onSearchTVShows: PropTypes.func.isRequired,
  movieGenres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  tvGenres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onGenreChange: PropTypes.func.isRequired,
  onTVShowGenreChange: PropTypes.func.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
};

export default Header;
