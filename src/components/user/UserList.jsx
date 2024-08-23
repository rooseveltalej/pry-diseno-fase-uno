import { useState } from 'react';
import PropTypes from 'prop-types';
import TVShowList from '../TvShowList';
import MovieList from '../MovieList';
import MovieModal from '../MovieModal';
import TvShowModal from '../TvShowModal';
import './css/FavoriteTvShow.css';
import useFetchLists from '../../hooks/useFetchLists';
import { closeModal, closeModalShow, showMovieDetails, showTvShowDetails } from '../../utils/modalHandlers';

const UserList = ({ sessionId, apiKey }) => {
    const { lists, error, loading } = useFetchLists(apiKey, sessionId);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedShow, setSelectedShow] = useState(null);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="favorite-tvshows-container">
            <h3>Mis Listas Personalizadas</h3>
            {lists.length > 0 ? (
                lists.map((list) => {
                    const tvShows = list.items.filter(item => item.media_type === 'tv');
                    const movies = list.items.filter(item => item.media_type === 'movie');

                    return (
                        <div key={list.id} className="list-item">
                            <h4>{list.name}</h4>
                            <p>{list.description}</p>
                            
                            {tvShows.length > 0 ? (
                                <>
                                    <h5>Series de TV</h5>
                                    <TVShowList 
                                        shows={tvShows} 
                                        onShowClick={(showId) => showTvShowDetails(showId, apiKey, setSelectedShow)} 
                                    />
                                </>
                            ) : (
                                <p>No hay series en esta lista.</p>
                            )}

                            {movies.length > 0 ? (
                                <>
                                    <h5>Películas</h5>
                                    <MovieList 
                                        movies={movies} 
                                        onMovieClick={(movieId) => showMovieDetails(movieId, apiKey, setSelectedMovie, setSelectedShow)} 
                                    />
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
            {selectedShow && <TvShowModal show={selectedShow} onClose={() => closeModalShow(setSelectedShow)} apiKey={apiKey} />}
            {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => closeModal(setSelectedMovie)} apiKey={apiKey} />}
        </div>
    );
};

UserList.propTypes = {
    sessionId: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired
};

export default UserList;
