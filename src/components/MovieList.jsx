import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onMovieClick, language }) => {
  console.log('Movies Prop:', movies);
  return (
    <main>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie.id)} language={language} />
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
};

export default MovieList;
