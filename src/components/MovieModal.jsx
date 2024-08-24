import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const MovieModal = ({ movie, onClose, apiKey, language }) => {
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [movieDetails, setMovieDetails] = useState(movie); // Agregar estado para detalles de la película

  useEffect(() => {
    if (showReviews) {
      fetchReviews();
    }
  }, [showReviews, language, movie.id]);

  useEffect(() => {
    fetchMovieDetails(); // Fetch movie details when language changes
  }, [language, movie.id]);

  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=${apiKey}&language=${language}`);
      const data = await response.json();
      setReviews(data.results || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=${language}`);
      const data = await response.json();
      setMovieDetails(data); // Actualiza los detalles de la película
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  const actors = movie.credits.cast.slice(0, 5).map((actor) => (
    language === 'es' ? <li key={actor.cast_id}><span className="actor-name">{actor.name}</span> como {actor.character}</li> :
    <li key={actor.cast_id}><span className="actor-name">{actor.name}</span> as {actor.character}</li>
  ));

  const video = movie.videos.results.find((vid) => vid.type === 'Trailer');
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
        <h2>{movieDetails.title}</h2>
        <p>{movieDetails.overview}</p>
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

MovieModal.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
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
  language: PropTypes.string.isRequired,
};

export default MovieModal;
