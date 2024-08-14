import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import TVShowList from "../TvShowList";
import './FavoriteTvShow.css';

const FavoriteTVShows = ({ sessionId, apiKey }) => { // RECIBE EL SESSION ID Y EL API KEY
    const [favoriteTVShows, setFavoriteTVShows] = useState([]);

    useEffect(() => {
        // Obtener la lista de programas de televisión favoritos del usuario
        const fetchFavoriteTVShows = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/account/{account_id}/favorite/tv?api_key=${apiKey}&session_id=${sessionId}`);
                const data = await response.json();
                setFavoriteTVShows(data.results);
            } catch (error) {
                console.error('Error obteniendo la lista de programas de televisión favoritos:', error);
            }
        };

        fetchFavoriteTVShows();
    }, [apiKey, sessionId]); // Asegurarse de que useEffect se ejecute solo cuando apiKey o sessionId cambie

    return (
        <div className="favorite-tvshows">
            <h3>Mis Programas de Televisión Favoritos</h3>
            <TVShowList shows={favoriteTVShows} />{/* Se muestra la lista de programas de televisión favoritos */}
        </div>
    );
};

FavoriteTVShows.propTypes = {
    sessionId: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired
};

export default FavoriteTVShows;
