import { useState } from 'react';

const useSearchTVShows = (apiKey) => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchTVShows = async (query = '', genreId = '') => {
    try {
      setLoading(true);
      let url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=es-ES&query=${query}`;
      if (genreId) {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=es-ES&with_genres=${genreId}&query=${query}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setShows(data.results);
      setLoading(false);
    } catch (error) {
      setError('Error searching TV shows');
      setLoading(false);
    }
  };

  return { shows, error, loading, searchTVShows };
};

export default useSearchTVShows;
