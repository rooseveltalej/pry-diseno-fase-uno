import { useState } from 'react';

const useSearchMovies = (apiKey) => {
  const [movies, setMovies] = useState([]);

  const searchMovie = async (query = '', genreId = '') => {
    try {
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${query}`;
      
      // Si el genreId está presente, usamos la URL de descubrimiento en lugar de la búsqueda
      if (genreId) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&with_genres=${genreId}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return { movies, searchMovie };
};

export default useSearchMovies;
