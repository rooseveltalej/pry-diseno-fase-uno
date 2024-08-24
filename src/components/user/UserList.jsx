// UserList.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import TVShowList from '../TvShowList';
import MovieList from '../MovieList';
import MovieModal from '../MovieModal';
import TvShowModal from '../TvShowModal';
import './css/FavoriteTvShow.css';
import useFetchLists from '../../hooks/useFetchLists';
import { closeModal, closeModalShow, showMovieDetails, showTvShowDetails } from '../../utils/modalHandlers';
import { useLanguage } from '../../context/LanguageContext'; // Importa el hook

const UserList = ({ sessionId, apiKey }) => {
    const { language } = useLanguage();
    const { lists, error, loading } = useFetchLists(apiKey, sessionId);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedShow, setSelectedShow] = useState(null);

    // Text translations
    const texts = {
        personalizedLists: language === 'es' ? 'Mis Listas Personalizadas' : 'My Custom Lists',
        noLists: language === 'es' ? 'No has creado ninguna lista personalizada.' : 'You have not created any custom lists.',
        noTvShows: language === 'es' ? 'No hay series en esta lista.' : 'There are no TV shows in this list.',
        noMovies: language === 'es' ? 'No hay películas en esta lista.' : 'There are no movies in this list.',
        show: language === 'es' ? 'Series de TV' : 'TV Shows',
        movie: language === 'es' ? 'Películas' : 'Movies',
    };

    if (loading) {
        return <p>{language === 'es' ? 'Cargando...' : 'Loading...'}</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="favorite-tvshows-container">
            <h3>{texts.personalizedLists}</h3>
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
                                    <h5>{texts.show}</h5>
                                    <TVShowList 
                                        shows={tvShows} 
                                        onShowClick={(showId) => showTvShowDetails(showId, apiKey, setSelectedShow, language)}
                                        language={language}
                                    />
                                </>
                            ) : (
                                <p>{texts.noTvShows}</p>
                            )}

                            {movies.length > 0 ? (
                                <>
                                    <h5>{texts.movie}</h5>
                                    <MovieList 
                                        movies={movies} 
                                        onMovieClick={(movieId) => showMovieDetails(movieId, apiKey, setSelectedMovie, setSelectedShow, language)}
                                        language={language}
                                    />
                                </>
                            ) : (
                                <p>{texts.noMovies}</p>
                            )}
                        </div>
                    );
                })
            ) : (
                <p>{texts.noLists}</p>
            )}
            {selectedShow && <TvShowModal show={selectedShow} onClose={() => closeModalShow(setSelectedShow)} apiKey={apiKey} language={language} />}
            {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => closeModal(setSelectedMovie)} apiKey={apiKey} language={language} />}
        </div>
    );
};

UserList.propTypes = {
    sessionId: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired
};

export default UserList;
