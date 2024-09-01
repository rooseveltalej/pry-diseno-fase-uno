// FavoriteTvShows.jsx
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
                    buttonType="remove"
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
