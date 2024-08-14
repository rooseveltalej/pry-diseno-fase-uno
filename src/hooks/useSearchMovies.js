import { useState } from 'react';

const useSearchMovies = (apiKey) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchMovie = async (query = '', genreId = '') => {
    try {
      setLoading(true);
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${query}`;
      if (genreId) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&with_genres=${genreId}&query=${query}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
      setLoading(false);
    } catch (error) {
      setError('Error searching movies');
      setLoading(false);
    }
  };

  return { movies, error, loading, searchMovie };
};

export default useSearchMovies;
