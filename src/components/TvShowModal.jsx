import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const TvShowModal = ({ show, onClose, apiKey, language }) => {
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [tvShowDetails, setTvShowDetails] = useState(show); // Agregar estado para detalles de la serie

  useEffect(() => {
    if (showReviews) {
      fetchReviews();
    }
  }, [showReviews, language, show.id]);

  useEffect(() => {
    fetchTvShowDetails(); // Fetch TV show details when language changes
  }, [language, show.id]);

  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${show.id}/reviews?api_key=${apiKey}&language=${language}`);
      const data = await response.json();
      setReviews(data.results || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  const fetchTvShowDetails = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${show.id}?api_key=${apiKey}&language=${language}`);
      const data = await response.json();
      setTvShowDetails(data); // Actualiza los detalles de la serie
    } catch (error) {
      console.error('Error fetching TV show details:', error);
    }
  };

  const actors = show.credits.cast.slice(0, 5).map((actor) => (
    language === 'es' ? 
    <li key={actor.cast_id}>
      <a 
        href={`https://www.themoviedb.org/person/${actor.id}?language=${language}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="actor-link"
      >
        {actor.name}
      </a> como {actor.character}
    </li> :
    <li key={actor.cast_id}>
      <a 
        href={`https://www.themoviedb.org/person/${actor.id}?language=${language}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="actor-link"
      >
        {actor.name}
      </a> as {actor.character}
    </li>
  ));

  const video = show.videos.results.find((vid) => vid.type === 'Trailer');
  const videoUrl = video ? `https://www.youtube.com/embed/${video.key}` : null;

  // Text translations
  const texts = {
    actors: language === 'es' ? 'Actores' : 'Actors',
    reviews: language === 'es' ? 'Reseñas' : 'Reviews',
    loadingReviews: language === 'es' ? 'Cargando reseñas...' : 'Loading reviews...',
    showReviews: language === 'es' ? 'Ver reseñas' : 'Show reviews',
    hideReviews: language === 'es' ? 'Ocultar reseñas' : 'Hide reviews',
  };

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>{tvShowDetails.name}</h2>
        <p>{tvShowDetails.overview}</p>
        <h3>{texts.actors}</h3>
        <ul className="actor-list">{actors}</ul>
        {videoUrl && (
          <div className="video-container">
            <iframe width="560" height="315" src={videoUrl} frameBorder="0" allowFullScreen></iframe>
          </div>
        )}
        <button onClick={toggleReviews} disabled={loadingReviews}>
          {loadingReviews ? texts.loadingReviews : showReviews ? texts.hideReviews : texts.showReviews}
        </button>
        {showReviews && reviews.length > 0 && (
          <div className="reviews-container">
            <h3>{texts.reviews}</h3>
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
        id: PropTypes.number.isRequired,
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
  language: PropTypes.string.isRequired,
};

export default TvShowModal;
