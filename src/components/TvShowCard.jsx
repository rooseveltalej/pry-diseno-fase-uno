import PropTypes from 'prop-types';

const TvShowCard = ({ show, onClick, language, buttonType, onButtonClick }) => {
  const posterPath = show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : '';

  // Text translations
  const texts = {
    rating: language === 'es' ? 'Calificación' : 'Rating',
    firstAirDate: language === 'es' ? 'Primera emisión' : 'First Air Date',
    more: language === 'es' ? 'Ver más' : 'See More',
    addToList: language === 'es' ? 'Guardar en lista' : 'Add to List',
    removeFromList: language === 'es' ? 'Eliminar de lista' : 'Remove from List',
  };

  return (
    <div className="movie-card" onClick={onClick}>
      <img src={posterPath} alt={show.name} className="movie-poster" />
      <div className="movie-details">
        <h2 className="movie-title">{show.name}</h2>
        <p className="movie-info"><strong>{texts.rating}:</strong> {show.vote_average}/10</p>
        <p className="movie-info"><strong>{texts.firstAirDate}:</strong> {show.first_air_date}</p>
        <button>{texts.more}</button>
        <button onClick={onButtonClick}>
          {buttonType === 'add' ? texts.addToList : texts.removeFromList}
        </button>
      </div>
    </div>
  );
};

TvShowCard.propTypes = {
  show: PropTypes.shape({
    poster_path: PropTypes.string,
    name: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    first_air_date: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  buttonType: PropTypes.oneOf(['add', 'remove']).isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default TvShowCard;
