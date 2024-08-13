// UserProfile.jsx
import { useState, useEffect } from 'react';
import FavoriteMovies from './FavoriteMovies';
import FavoriteTvShows from './FavoriteTvShows';


const UserProfile = ({ sessionId }) => {
    const [userInfo, setUserInfo] = useState(null);
    const apiKey = "af7264be91d3f252b1abe33245f3b69f";

    useEffect(() => {
    // Obtener la información del usuario
    const fetchUserInfo = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${sessionId}`);
        const data = await response.json();
        setUserInfo(data);
        console.log(userInfo)
    } catch (error) {
        console.error('Error obteniendo la información del usuario:', error);
    }
    };
    fetchUserInfo();

    }, [sessionId, apiKey]);

return (
    <div className="user-profile-container">
    {userInfo && (
        <div className="user-info">
        <h2>{userInfo.name || userInfo.username}</h2>
        <p>País: {userInfo.iso_3166_1 || 'No disponible'}</p>
        </div>
    )}
        <FavoriteMovies sessionId={sessionId} apiKey={apiKey} /> {/*Traemos el componente de las peliculas favoritas y le pasamos las props de sessionId y ApiKey */}
        <FavoriteTvShows sessionId={sessionId} apiKey={apiKey} /> {/*Traemos el componente de las series favoritas y le pasamos las props de sessionId y ApiKey */}
    </div>
);
};

export default UserProfile;
