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
}) => {
  const [searchType, setSearchType] = useState('movies');
  const [query, setQuery] = useState('');

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
    // Clear search query when switching types
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

  return (
    <header>
      <h1>TECFLIX</h1>
      <select onChange={handleSearchTypeChange} value={searchType}>
        <option value="movies">Películas</option>
        <option value="tvshows">Series de TV</option>
      </select>
      <input 
        type="text" 
        placeholder={`Buscar ${searchType === 'movies' ? 'películas' : 'series...'}...`} 
        value={query}
        onChange={handleSearchChange} 
      />
      <select onChange={handleGenreChange}>
        <option value="">Tendencias</option>
        {(searchType === 'movies' ? movieGenres : tvGenres).map((genre) => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
      <LoginForm />
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
  movieSearchQuery: PropTypes.string.isRequired,
  tvSearchQuery: PropTypes.string.isRequired,
};

export default Header;
