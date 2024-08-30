import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext'; // Asegúrate de que esta ruta sea correcta
import { useState, useEffect } from 'react';
import './css/Sidebar.css';

const Sidebar = ({ onSelectSection }) => {
    const navigate = useNavigate();
    const { language } = useLanguage(); // Obtén el idioma del contexto
    const [activeButton, setActiveButton] = useState('lists'); // Estado para el botón activo

    // Traducciones basadas en el idioma
    const texts = {
        myLists: language === 'es' ? 'Mis Listas' : 'My Lists',
        favoriteMovies: language === 'es' ? 'Películas Favoritas' : 'Favorite Movies',
        favoriteTvShows: language === 'es' ? 'Series Favoritas' : 'Favorite TV Shows',
        backToHome: language === 'es' ? 'Volver a la página principal' : 'Back to Home',
    };

    useEffect(() => {
        onSelectSection('lists'); // Selecciona 'lists' por defecto al cargar el componente
    }, [onSelectSection]);

    const handleButtonClick = (section) => {
        setActiveButton(section);
        onSelectSection(section);
    };

    return (
        <div className="sidebar bg-dark text-white d-flex flex-column">
            <button 
                className={`btn btn-dark ${activeButton === 'lists' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('lists')}
            >
                {texts.myLists}
            </button>
            <button 
                className={`btn btn-dark ${activeButton === 'favoriteMovies' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('favoriteMovies')}
            >
                {texts.favoriteMovies}
            </button>
            <button 
                className={`btn btn-dark ${activeButton === 'favoriteTvShows' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('favoriteTvShows')}
            >
                {texts.favoriteTvShows}
            </button>
            <button 
                className="btn btn-danger mt-auto"
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
