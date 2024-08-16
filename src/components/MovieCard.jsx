import PropTypes from 'prop-types';

const MovieCard = ({ movie, onClick }) => {
const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';

  return (
    <div className="movie-card" onClick={onClick}>
      <img src={posterPath} alt={movie.title} className="movie-poster" />
      <div className="movie-details">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-info"><strong>Calificación:</strong> {movie.vote_average}/10</p>
        <p className="movie-info"><strong>Fecha de lanzamiento:</strong> {movie.release_date}</p>
        <button>Ver más</button>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    release_date: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MovieCard;