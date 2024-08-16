import propTypes from 'prop-types';
import { useEffect, useState } from "react";
import TvShowList from "../TvShowList";
import './css/FavoriteTvShow.css';
import { showTvShowDetails } from '../../utils/modalHandlers';

const FavoriteTvShows = ({ sessionId, apiKey }) => { // Recibe el sessionId y apiKey como props
    const [favoriteTvShows, setFavoriteTvShows] = useState([]);

    useEffect(() => {
        // Obtener la lista de series favoritas del usuario
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
    }, [apiKey, sessionId]); // Esta vara es para que la API no se llame infinitas veces

    return (
        <div className="favorite-tv">
            <h3>Mis Series Favoritas</h3>
            <TvShowList shows={favoriteTvShows} onShowClick={showTvShowDetails} /> {}
        </div>
    )
}

FavoriteTvShows.propTypes = {
    sessionId: propTypes.string.isRequired,
    apiKey: propTypes.string.isRequired
};

export default FavoriteTvShows;
