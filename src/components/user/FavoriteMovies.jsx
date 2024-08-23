import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import MovieList from "../MovieList";
import MovieModal from '../MovieModal';
import './css/FavoriteMovies.css';
import { showMovieDetails, closeModal } from '../../utils/modalHandlers';

const FavoriteMovies = ({ sessionId, apiKey }) => {
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

    return (
        <div className="favorite-movies">
            <h3>Mis Películas Favoritas</h3>
            <MovieList 
                movies={favoriteMovies} 
                onMovieClick={(movieId) => showMovieDetails(movieId, apiKey, setSelectedMovie)} 
            />
            {selectedMovie && (
                <MovieModal 
                    movie={selectedMovie} 
                    onClose={() => closeModal(setSelectedMovie)} 
                    apiKey={apiKey} 
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
