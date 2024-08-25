import PropTypes from 'prop-types';
import { useState } from 'react';
import LoginForm from './login/LoginForm';

const Header = ({
  onSearch,
  onSearchTVShows,
  movieGenres,
  tvGenres,
  onGenreChange,
  onTVShowGenreChange,
  movieSearchQuery,
  tvSearchQuery,
  onLanguageChange, // Función para manejar el cambio de idioma
}) => {
  const [searchType, setSearchType] = useState('movies');
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('es'); // Estado para el idioma

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
    if (event.target.value === 'movies') {
      onSearch('');
    } else {
      onSearchTVShows('');
    }
  };

  const handleGenreChange = (event) => {
    if (searchType === 'movies') {
      onGenreChange(event.target.value);
    } else {
      onTVShowGenreChange(event.target.value);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    onLanguageChange(event.target.value); // Llama a la función para cambiar el idioma
  };

  return (
    <header>
      <h1>{language === 'es' ? 'TECFLIX' : 'TECFLIX'}</h1>
      <select onChange={handleLanguageChange} value={language}>
        l
        <option value="es">{language === 'es' ? 'Español' : 'Spanish'}</option>
        <option value="en">{language === 'en' ? 'English' : 'Inglés'}</option>
      </select>
      <select onChange={handleSearchTypeChange} value={searchType}>
        <option value="movies">{language === 'es' ? 'Películas' : 'Movies'}</option>
        <option value="tvshows">{language === 'es' ? 'Series de TV' : 'TV Shows'}</option>
      </select>
      <input 
        type="text" 
        placeholder={language === 'es' ? `Buscar ${searchType === 'movies' ? 'películas' : 'series'}...` : `Search for ${searchType === 'movies' ? 'movies' : 'TV shows'}...`} 
        value={query}
        onChange={handleSearchChange} 
      />
      <select onChange={handleGenreChange}>
        <option value="">{language === 'es' ? 'Tendencias' : 'Trending'}</option>
        {(searchType === 'movies' ? movieGenres : tvGenres).map((genre) => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
      <LoginForm onLanguageChange={language} />
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
  onLanguageChange: PropTypes.func.isRequired, // Se espera que sea una función
};

export default Header;
