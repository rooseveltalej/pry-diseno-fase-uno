import propTypes from 'prop-types';
import { useEffect, useState } from "react";


const FavoriteTvShows = ({sessionId, apiKey}) => {
    const [favoriteTv, setFavoriteTv] = useState([]);

    useEffect(() => {
        // Obtener la lista de series favoritas del usuario
        const fetchFavoriteTvShows = async () => {
            try {
            const response = await fetch(`https://api.themoviedb.org/3/account/{account_id}/favorite/tv?api_key=${apiKey}&session_id=${sessionId}`);
            const data = await response.json();
            setFavoriteTv(data.results);
            } catch (error) {
            console.error('Error obteniendo la lista de series favoritas:', error);
            }
        };
        fetchFavoriteTvShows();
    })

return (
    <div className="favorite-tv">
            <h3>Mis Series Favoritas</h3>
            <ul>
                {favoriteTv.map(tv => (
                    <li key={tv.id}>{tv.name}</li>
                ))}
            </ul>
            </div>
)
}

FavoriteTvShows.propTypes = {
    sessionId: propTypes.string.isRequired,
    apiKey: propTypes.string.isRequired
}

export default FavoriteTvShows
