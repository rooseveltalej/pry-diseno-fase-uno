import PropTypes from 'prop-types';
import TVShowList from '../TvShowList';
import MovieList from '../MovieList';
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
                lists.map((list) => {
                    // Filtrar series de TV y películas
                    const tvShows = list.items.filter(item => item.media_type === 'tv');
                    const movies = list.items.filter(item => item.media_type === 'movie');

                    return (
                        <div key={list.id} className="list-item">
                            <h4>{list.name}</h4>
                            <p>{list.description}</p>
                            
                            {tvShows.length > 0 ? (
                                <>
                                    <h5>Series de TV</h5>
                                    <TVShowList shows={tvShows} />
                                </>
                            ) : (
                                <p>No hay series en esta lista.</p>
                            )}

                            {movies.length > 0 ? (
                                <>
                                    <h5>Películas</h5>
                                    <MovieList movies={movies} />
                                </>
                            ) : (
                                <p>No hay películas en esta lista.</p>
                            )}
                        </div>
                    );
                })
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
