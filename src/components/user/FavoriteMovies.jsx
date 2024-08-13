import { useEffect, useState } from "react"
import propTypes from 'prop-types'
import MovieList from "../MovieList";
import './FavoriteMovies.css'

const FavoriteMovies = ({sessionId, apiKey}) => { //RECIBE EL SESSION ID Y EL API KEY
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        // Obtener la lista de películas favoritas del usuario
        const fetchFavoriteMovies = async () => {
            try {
              const response = await fetch(`https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${apiKey}&session_id=${sessionId}`);
              const data = await response.json();
              setFavoriteMovies(data.results);
            } catch (error) {
              console.error('Error obteniendo la lista de películas favoritas:', error);
            }
          };

          fetchFavoriteMovies();

    })
  return (
    <div className="favorite-movies">
        <h3>Mis Películas Favoritas</h3>
        <MovieList movies={favoriteMovies} />{/*TODO, se muestra la carta de peliculas pero no se puede ver más información */}
      </div>
  )
}

FavoriteMovies.propTypes = {
    sessionId: propTypes.string.isRequired,
    apiKey: propTypes.string.isRequired
}

export default FavoriteMovies
