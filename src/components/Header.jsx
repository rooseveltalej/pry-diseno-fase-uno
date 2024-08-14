import PropTypes from 'prop-types';
import LoginForm from './login/LoginForm';

const Header = ({ onSearch, onSearchTVShows, movieGenres, tvGenres, onGenreChange, onTVShowGenreChange }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  const handleTVSearch = (event) => {
    onSearchTVShows(event.target.value);
  };

  const handleMovieGenreChange = (event) => {
    onGenreChange(event.target.value);
  };

  const handleTVShowGenreChange = (event) => {
    onTVShowGenreChange(event.target.value);
  };

  return (
    <header>
      <h1>Tecflix</h1>
      <input type="text" placeholder="Buscar películas..." onInput={handleSearch} />
      <input type="text" placeholder="Buscar series..." onInput={handleTVSearch} />
      <select onChange={handleMovieGenreChange}>
        <option value="">Todos los géneros (Películas)</option>
        {movieGenres.map((genre) => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
      <select onChange={handleTVShowGenreChange}>
        <option value="">Todos los géneros (Series de TV)</option>
        {tvGenres.map((genre) => (
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
};

export default Header;