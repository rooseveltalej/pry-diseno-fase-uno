import { useState } from 'react';

const useSearchTVShows = (apiKey, language) => {
  const [shows, setShows] = useState([]);

  const searchTVShows = async (query, genre = '', actor = '') => {
    try {
      let url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=${language}&query=${query}`;
      if (genre) url += `&with_genres=${genre}`;
      if (actor) {
        const actorResponse = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${apiKey}&language=${language}&query=${actor}`);
        const actorData = await actorResponse.json();
        const actorId = actorData.results[0]?.id;
        if (actorId) {
          url += `&with_cast=${actorId}`;
        }
      }
      const response = await fetch(url);
      const data = await response.json();
      setShows(data.results);
    } catch (error) {
      console.error('Error fetching TV shows:', error);
    }
  };

  return { shows, searchTVShows };
};

export default useSearchTVShows;
