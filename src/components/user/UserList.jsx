import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserLists = ({ sessionId, apiKey }) => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        // Obtener las listas del usuario
        const fetchUserLists = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/account/{account_id}/lists?api_key=${apiKey}&session_id=${sessionId}`);
                const data = await response.json();
                setLists(data.results);
            } catch (error) {
                console.error('Error obteniendo las listas del usuario:', error);
            }
        };

        fetchUserLists();
    }, [sessionId, apiKey]);

    return (
        <div className="user-lists-container"> {/*TODO: Esto solo muestra las listas creadas por el usuario, aún hace falta darle estilo y funcionalidad */}
            <h2>Mis Listas</h2>
            {lists.length > 0 ? (
                <ul>
                    {lists.map(list => (
                        <li key={list.id}>{list.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No hay listas disponibles.</p>
            )}
        </div>
    );
};

UserLists.propTypes = {
    sessionId: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,
};

export default UserLists;
