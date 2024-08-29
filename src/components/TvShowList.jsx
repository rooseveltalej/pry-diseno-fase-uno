import PropTypes from 'prop-types';
import TVShowCard from './TvShowCard';

const TVShowList = ({ shows, onShowClick, language }) => {
  console.log('shows Prop:', shows);
  return (
    <main>
      {shows.map((show) => (
        <TVShowCard key={show.id} show={show} onClick={() => onShowClick(show.id)} language={language} />
      ))}
    </main>
  );
};

TVShowList.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    name: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    first_air_date: PropTypes.string.isRequired,
  })).isRequired,
  onShowClick: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default TVShowList;
