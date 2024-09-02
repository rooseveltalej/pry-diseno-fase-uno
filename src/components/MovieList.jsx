import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onMovieClick, language, buttonType, onFavoriteClick }) => {
  return (
    <main>
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          onClick={() => onMovieClick(movie.id)} 
          language={language}
          buttonType={buttonType}  // Pasar el tipo de botón
          onFavoriteClick={onFavoriteClick} 
        />
      ))}
    </main>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    release_date: PropTypes.string.isRequired,
  })).isRequired,
  onMovieClick: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  buttonType: PropTypes.oneOf(['add', 'remove']).isRequired, // Añadido para distinguir el tipo de botón
  onFavoriteClick: PropTypes.func.isRequired,
};

export default MovieList;
