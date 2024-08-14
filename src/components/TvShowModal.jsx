import PropTypes from 'prop-types';

const TvShowModal = ({ show, onClose }) => {
  const actors = show.credits.cast.slice(0, 5).map((actor) => (
    <li key={actor.cast_id}><span className="actor-name">{actor.name}</span> como {actor.character}</li>
  ));
  const video = show.videos.results.find((vid) => vid.type === 'Trailer');
  const videoUrl = video ? `https://www.youtube.com/embed/${video.key}` : null;

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>{show.name}</h2>
        <p>{show.overview}</p>
        <h3>Actores</h3>
        <ul className="actor-list">{actors}</ul>
        {videoUrl && (
          <div className="video-container">
            <iframe width="560" height="315" src={videoUrl} frameBorder="0" allowFullScreen></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

TvShowModal.propTypes = {
  show: PropTypes.shape({
    name: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    credits: PropTypes.shape({
      cast: PropTypes.arrayOf(PropTypes.shape({
        cast_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        character: PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
    videos: PropTypes.shape({
      results: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TvShowModal;
