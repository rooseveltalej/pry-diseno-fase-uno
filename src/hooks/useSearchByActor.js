import { useState } from 'react';

const useSearchByActor = (apiKey, language) => {
  const [actorMovies, setActorMovies] = useState([]);
  const [actorTvShows, setActorTvShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener el ID del actor a partir de su nombre
  const getActorId = async (actorName) => {

    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${apiKey}&language=${language}&query=${actorName}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].id; // Devuelve el ID del primer resultado (actor encontrado)
      } else {
        return null; // No se encontró al actor
      }
    } catch (error) {
      console.error('Error fetching actor ID:', error);
      return null;
    }
  };

  // Función para buscar películas en las que ha participado el actor
  const searchMoviesByActor = async (actorId) => {

    if (!actorId) return; // Validar que actorId no sea nulo o indefinido

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${apiKey}&language=${language}`);
      if (response.ok) {
        const data = await response.json();
        setActorMovies(data.cast || []); // `data.cast` contiene las películas en las que ha participado el actor
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error searching movies by actor:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Función para buscar series en las que ha participado el actor
  const searchTVShowsByActor = async (actorId) => {
    if (!actorId) return; // Validar que actorId no sea nulo o indefinido

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.themoviedb.org/3/person/${actorId}/tv_credits?api_key=${apiKey}&language=${language}`);
      if (response.ok) {
        const data = await response.json();
        setActorTvShows(data.cast || []); // `data.cast` contiene las series en las que ha participado el actor
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error searching TV shows by actor:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };


  return {

    actorMovies,
    actorTvShows,
    loading,
    error,
    getActorId,
    searchMoviesByActor,
    searchTVShowsByActor,
  };
};

export default useSearchByActor;
