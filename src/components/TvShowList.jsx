import PropTypes from 'prop-types';
import TVShowCard from './TvShowCard';

const TvShowList = ({ shows, onShowClick, language, buttonType, onButtonClick }) => {
  return (
    <main>
      {shows.map((show) => (
      <TVShowCard 
        key={show.id} 
        show={show} 
        onClick={() => onShowClick(show.id)} 
        language={language}
        buttonType={buttonType}
        onButtonClick={onButtonClick}
      />
))}
    </main>
  );
};

TvShowList.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    name: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    first_air_date: PropTypes.string.isRequired,
  })).isRequired,
  onShowClick: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  buttonType: PropTypes.oneOf(['add', 'remove']).isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default TvShowList;
