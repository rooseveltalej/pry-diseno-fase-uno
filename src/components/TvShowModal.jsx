import { useState } from 'react';
import PropTypes from 'prop-types';

const TvShowModal = ({ show, onClose, apiKey }) => {
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      let response = await fetch(`https://api.themoviedb.org/3/tv/${show.id}/reviews?api_key=${apiKey}&language=es-ES`);
      let data = await response.json();

      if (!data.results || data.results.length === 0) {
        response = await fetch(`https://api.themoviedb.org/3/tv/${show.id}/reviews?api_key=${apiKey}&language=en-US`);
        data = await response.json();
      }

      setReviews(data.results);
      setShowReviews(true);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const toggleReviews = () => {
    if (showReviews) {
      setShowReviews(false);
    } else {
      if (reviews.length === 0) {
        fetchReviews();
      } else {
        setShowReviews(true);
      }
    }
  };

  const actors = show.credits.cast.slice(0, 5).map((actor) => (
    <li key={actor.cast_id}>
      <span className="actor-name">{actor.name}</span> como {actor.character}
    </li>
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
        <button onClick={toggleReviews} disabled={loadingReviews}>
          {loadingReviews ? 'Cargando reseñas...' : showReviews ? 'Ocultar reseñas' : 'Ver reseñas'}
        </button>
        {showReviews && reviews.length > 0 && (
          <div className="reviews-container">
            <h3>Reseñas</h3>
            <ul>
              {reviews.map(review => (
                <li key={review.id}>
                  <strong>{review.author}</strong> {review.content}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

TvShowModal.propTypes = {
  show: PropTypes.shape({
    id: PropTypes.number.isRequired,
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
  apiKey: PropTypes.string.isRequired,
};

export default TvShowModal;
