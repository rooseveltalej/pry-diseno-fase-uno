// Sidebar.jsx
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './css/Sidebar.css'; // Asegúrate de crear este archivo para el estilo del sidebar

const Sidebar = ({ onSelectSection }) => {
    const navigate = useNavigate();
    return (
        <div className="sidebar">
            <button onClick={() => onSelectSection('lists')}>Mis Listas</button>
            <button onClick={() => onSelectSection('favoriteMovies')}>Películas Favoritas</button>
            <button onClick={() => onSelectSection('favoriteTvShows')}>Series Favoritas</button>
            {/* Agrega un botón que permita volver a la página principal */}
            <button 
                className="back-button"
            onClick={() => navigate('/')}>
                Volver a la página principal
                </button>
        </div>
    );
};

Sidebar.propTypes = {
    onSelectSection: PropTypes.func.isRequired,
};

export default Sidebar;
