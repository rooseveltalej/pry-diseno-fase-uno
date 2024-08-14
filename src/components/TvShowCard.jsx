import PropTypes from 'prop-types';

const TVShowCard = ({ show, onClick }) => {
  const posterPath = show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : '';

  return (
    <div className="movie-card" onClick={onClick}>
      <img src={posterPath} alt={show.name} className="movie-poster" />
      <div className="movie-details">
        <h2 className="movie-title">{show.name}</h2>
        <p className="movie-info"><strong>Calificación:</strong> {show.vote_average}/10</p>
        <p className="movie-info"><strong>Primera emisión:</strong> {show.first_air_date}</p>
        <button>Ver más</button>
      </div>
    </div>
  );
};

TVShowCard.propTypes = {
  show: PropTypes.shape({
    poster_path: PropTypes.string,
    name: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    first_air_date: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TVShowCard;
