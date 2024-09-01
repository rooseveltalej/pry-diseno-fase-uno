import PropTypes from 'prop-types';

const MovieCard = ({ movie, onClick, language, buttonType, onFavoriteClick }) => {
  const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';

  const texts = {
    rating: language === 'es' ? 'Calificación' : 'Rating',
    releaseDate: language === 'es' ? 'Fecha de lanzamiento' : 'Release Date',
    more: language === 'es' ? 'Ver más' : 'See More',
    addToFavorites: language === 'es' ? 'Agregar a Favoritos' : 'Add to Favorites',
    removeFromFavorites: language === 'es' ? 'Eliminar de Favoritos' : 'Remove from Favorites',
  };

  return (
    <div className="movie-card" onClick={onClick}>
      <img src={posterPath} alt={movie.title} className="movie-poster" />
      <div className="movie-details">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-info"><strong>{texts.rating}:</strong> {movie.vote_average}/10</p>
        <p className="movie-info"><strong>{texts.releaseDate}:</strong> {movie.release_date}</p>
        <button>{texts.more}</button>
        <button onClick={onFavoriteClick}>
          {buttonType === 'add' ? texts.addToFavorites : texts.removeFromFavorites}
        </button>
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
  language: PropTypes.string.isRequired,
  buttonType: PropTypes.oneOf(['add', 'remove']).isRequired, // Añadido para distinguir el tipo de botón
  onFavoriteClick: PropTypes.func.isRequired,
};

export default MovieCard;
