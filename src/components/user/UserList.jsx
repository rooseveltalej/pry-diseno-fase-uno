import PropTypes from 'prop-types';
import TVShowList from '../TvShowList';
import './css/FavoriteTvShow.css';
import useFetchLists from '../../hooks/useFetchLists';

const FavoriteTvShows = ({ sessionId, apiKey }) => {
    const { lists, error, loading } = useFetchLists(apiKey, sessionId);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="favorite-tvshows-container">
            <h3>Mis Listas Personalizadas</h3>
            {console.log("mi lista", lists)}
            {lists.length > 0 ? (
                lists.map((list) => (
                    <div key={list.id} className="list-item">
                        <h4>{list.name}</h4>
                        <p>{list.description}</p>
                        {list.items && list.items.length > 0 ? (
                            <TVShowList shows={list.items} />
                        ) : (
                            <p>No hay series en esta lista.</p>
                        )}
                    </div>
                ))
            ) : (
                <p>No has creado ninguna lista personalizada.</p>
            )}
        </div>
    );
};

FavoriteTvShows.propTypes = {
    sessionId: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired
};

export default FavoriteTvShows;
