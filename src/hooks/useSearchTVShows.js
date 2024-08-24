import { useState } from 'react';

const useSearchTVShows = (apiKey, language) => {
  const [shows, setShows] = useState([]);

  const searchTVShows = async (query = '', genreId = '') => {
    try {
      let url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=${language}&query=${query}`;
      
      // Si el genreId está presente, usamos la URL de descubrimiento en lugar de la búsqueda
      if (genreId) {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=${language}&with_genres=${genreId}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setShows(data.results || []);
    } catch (error) {
      console.error('Error searching TV shows:', error);
    }
  };

  return { shows, searchTVShows };
};

export default useSearchTVShows;
