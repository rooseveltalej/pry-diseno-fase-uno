import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import MovieList from "../MovieList";
import MovieModal from '../MovieModal';
import './css/FavoriteMovies.css';
import { showMovieDetails, closeModal } from '../../utils/modalHandlers';
import { useLanguage } from '../../context/LanguageContext';

const FavoriteMovies = ({ sessionId, apiKey }) => {
    const { language } = useLanguage();
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${apiKey}&session_id=${sessionId}`);
                const data = await response.json();
                setFavoriteMovies(data.results);
            } catch (error) {
                console.error('Error obteniendo la lista de películas favoritas:', error);
            }
        };

        fetchFavoriteMovies();
    }, [apiKey, sessionId]);

    const removeFromFavorites = (movieId) => {
        fetch(`https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=${apiKey}&session_id=${sessionId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                media_type: 'movie',
                media_id: movieId,
                favorite: false,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Removed from favorites:', data);
            setFavoriteMovies(prev => prev.filter(movie => movie.id !== movieId));
        })
        .catch(error => {
            console.error('Error removing from favorites:', error);
        });
    };

    // Text translations
    const texts = {
        favoriteMovies: language === 'es' ? 'Mis Películas Favoritas' : 'My Favorite Movies',
        noFavorites: language === 'es' ? 'No tienes películas favoritas.' : 'You have no favorite movies.'
    };

    return (
        <div className="favorite-movies">
            <h3>{texts.favoriteMovies}</h3>
            {favoriteMovies.length > 0 ? (
                <MovieList 
                    movies={favoriteMovies} 
                    onMovieClick={(movieId) => showMovieDetails(movieId, apiKey, setSelectedMovie, language)} 
                    language={language}
                    buttonType='remove'
                    onButtonClick={removeFromFavorites}
                />
            ) : (
                <p>{texts.noFavorites}</p>
            )}
            {selectedMovie && (
                <MovieModal 
                    movie={selectedMovie} 
                    onClose={() => closeModal(setSelectedMovie)} 
                    apiKey={apiKey} 
                    language={language}
                />
            )}
        </div>
    );
}

FavoriteMovies.propTypes = {
    sessionId: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired
};

export default FavoriteMovies;
