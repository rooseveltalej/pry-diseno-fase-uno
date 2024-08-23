import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import TvShowList from "../TvShowList";
import TvShowModal from '../TvShowModal';
import './css/FavoriteTvShow.css';
import { showTvShowDetails, closeModalShow } from '../../utils/modalHandlers';

const FavoriteTvShows = ({ sessionId, apiKey }) => {
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

    return (
        <div className="favorite-tv">
            <h3>Mis Series Favoritas</h3>
            <TvShowList 
                shows={favoriteTvShows} 
                onShowClick={(showId) => showTvShowDetails(showId, apiKey, setSelectedShow)} 
            />
            {selectedShow && (
                <TvShowModal 
                    show={selectedShow} 
                    onClose={() => closeModalShow(setSelectedShow)} 
                    apiKey={apiKey} 
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
