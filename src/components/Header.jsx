import PropTypes from 'prop-types';
import LoginForm from './login/LoginForm';

const Header = ({ onSearch, genres, onGenreChange }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  const handleGenreChange = (event) => {
    onGenreChange(event.target.value);
  };

  return (
    <header>
      <h1>MovieTEC</h1>
      <input type="text" placeholder="Buscar..." onInput={handleSearch} />
      <select onChange={handleGenreChange}>
        <option value="">Todos los géneros</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
      {/* Otro select */}
      <select>
        <option value="">Esta vara aun no sirve pero aja</option> 
        <option value="7">Categoria 7+</option>
        <option value="8">Categoria 8+</option>
        <option value="9">Categoria 9+</option>
      </select>
      <LoginForm />
    </header>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onGenreChange: PropTypes.func.isRequired, // Agrega esta línea
};

export default Header;