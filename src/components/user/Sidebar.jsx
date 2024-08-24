// Sidebar.jsx
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext'; // Asegúrate de que esta ruta sea correcta
import './css/Sidebar.css';

const Sidebar = ({ onSelectSection }) => {
    const navigate = useNavigate();
    const { language } = useLanguage(); // Obtén el idioma del contexto

    // Traducciones basadas en el idioma
    const texts = {
        myLists: language === 'es' ? 'Mis Listas' : 'My Lists',
        favoriteMovies: language === 'es' ? 'Películas Favoritas' : 'Favorite Movies',
        favoriteTvShows: language === 'es' ? 'Series Favoritas' : 'Favorite TV Shows',
        backToHome: language === 'es' ? 'Volver a la página principal' : 'Back to Home',
    };

    return (
        <div className="sidebar">
            <button onClick={() => onSelectSection('lists')}>{texts.myLists}</button>
            <button onClick={() => onSelectSection('favoriteMovies')}>{texts.favoriteMovies}</button>
            <button onClick={() => onSelectSection('favoriteTvShows')}>{texts.favoriteTvShows}</button>
            <button 
                className="back-button"
                onClick={() => navigate('/')}
            >
                {texts.backToHome}
            </button>
        </div>
    );
};

Sidebar.propTypes = {
    onSelectSection: PropTypes.func.isRequired,
};

export default Sidebar;