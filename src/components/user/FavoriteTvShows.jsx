import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import TvShowList from "../TvShowList";
import TvShowModal from '../TvShowModal';
import './css/FavoriteTvShow.css';
import { showTvShowDetails, closeModalShow } from '../../utils/modalHandlers';
import { useLanguage } from '../../context/LanguageContext';

const FavoriteTvShows = ({ sessionId, apiKey }) => {
    const { language } = useLanguage();
    const [favoriteTvShows, setFavoriteTvShows] = useState([]);
    const [selectedShow, setSelectedShow] = useState(null);

    useEffect(() => {
        const fetchFavoriteTvShows = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/account/{account_id}/favorite/tv?api_key=${apiKey}&session_id=${sessionId}`);
                const data = await response.json();
                setFavoriteTvShows(data.results);
            } catch (error) {
                console.error('Error obteniendo la lista de series favoritas:', error);
            }
        };

        fetchFavoriteTvShows();
    }, [apiKey, sessionId]);

    // Function to handle removing from favorites
    const handleRemoveFromFavorites = async (showId) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=${apiKey}&session_id=${sessionId}`, {
                method: 'POST',
                body: JSON.stringify({
                    media_type: 'tv',
                    media_id: showId,
                    favorite: false
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Error removing from favorites');

            alert('Elemento eliminado de favoritos.');
            // Update state
            setFavoriteTvShows((prevShows) => prevShows.filter(show => show.id !== showId));
        } catch (error) {
            console.error('Error removing TV show from favorites:', error);
            alert('Error al eliminar la serie de favoritos.');
        }
    };

    // Text translations
    const texts = {
        favoriteShows: language === 'es' ? 'Mis Series Favoritas' : 'My Favorite TV Shows',
        noFavorites: language === 'es' ? 'No tienes series favoritas.' : 'You have no favorite TV shows.'
    };

    return (
        <div className="favorite-tv">
            <h3>{texts.favoriteShows}</h3>
            {favoriteTvShows.length > 0 ? (
                <TvShowList 
                    shows={favoriteTvShows} 
                    onShowClick={(showId) => showTvShowDetails(showId, apiKey, setSelectedShow, language)} 
                    language={language}
                    buttonType="remove"  // Establece el tipo de botón para eliminar
                    onButtonClick={handleRemoveFromFavorites} // Maneja el clic en el botón de eliminar
                />
            ) : (
                <p>{texts.noFavorites}</p>
            )}
            {selectedShow && (
                <TvShowModal 
                    show={selectedShow} 
                    onClose={() => closeModalShow(setSelectedShow)} 
                    apiKey={apiKey} 
                    language={language}
                />
            )}
        </div>
    );
}

FavoriteTvShows.propTypes = {
    sessionId: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired
};

export default FavoriteTvShows;
