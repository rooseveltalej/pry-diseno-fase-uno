// UserProfile.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FavoriteMovies from './FavoriteMovies';
import FavoriteTvShows from './FavoriteTvShows';
import UserLists from './UserList';
import Sidebar from './Sidebar';
import { useLanguage } from '../../context/LanguageContext'; // Importa el hook
import './css/UserProfile.css';


const UserProfile = ({ sessionId }) => {
    const { language } = useLanguage();
    const [userInfo, setUserInfo] = useState(null);
    const [selectedSection, setSelectedSection] = useState('lists'); // Estado para controlar la sección seleccionada
    const apiKey = "YOUR_APIKEY";

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${sessionId}`);
                const data = await response.json();
                setUserInfo(data);
                console.log('User Info:', data); // Muestra la información del usuario actualizada
            } catch (error) {
                console.error('Error obteniendo la información del usuario:', error);
            }
        };
        fetchUserInfo();
    }, [sessionId, apiKey]);

    const renderSelectedSection = () => {
        switch (selectedSection) {
            case 'favoriteMovies':
                return <FavoriteMovies sessionId={sessionId} apiKey={apiKey} />;
            case 'favoriteTvShows':
                return <FavoriteTvShows sessionId={sessionId} apiKey={apiKey} />;
            case 'lists':
            default:
                return <UserLists sessionId={sessionId} apiKey={apiKey} />;
        }
    };

    // Traducciones basadas en el idioma actual
    const texts = {
        welcome: language === 'es' ? 'Bienvenido' : 'Welcome',
        country: language === 'es' ? 'País' : 'Country',
    };

    return (
        <div className="user-profile-container">
            <Sidebar onSelectSection={setSelectedSection} />
            <div className="user-content">
                {userInfo && (
                    <div className="user-info">
                        <h2 className="user-name">{texts.welcome} {userInfo.name || userInfo.username}</h2>
                        <p className="user-country">{texts.country}: {userInfo.iso_3166_1 || 'No disponible'}</p>
                    </div>
                )}
                <div className="user-section-content">
                    {renderSelectedSection()} {/* Renderizamos la sección seleccionada */}
                </div>
            </div>
        </div>
    );
}

UserProfile.propTypes = {
    sessionId: PropTypes.string.isRequired,
};

export default UserProfile;
