import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onMovieClick }) => {
  return (
    <main>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie.id)} />
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
};

export default MovieList;