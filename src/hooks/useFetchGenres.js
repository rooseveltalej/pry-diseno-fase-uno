import { useEffect, useState } from 'react';

const useFetchData = (apiKey, language) => {
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTVGenres] = useState([]);
  const [people, setPeople] = useState([]); // Nuevo estado para almacenar personas
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Obtener géneros de películas
      const movieGenreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${language}`);
      const movieGenreData = await movieGenreResponse.json();
      setMovieGenres(movieGenreData.genres);

      // Obtener géneros de series de TV
      const tvGenreResponse = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=${language}`);
      const tvGenreData = await tvGenreResponse.json();
      setTVGenres(tvGenreData.genres);

      // Obtener personas (actores, directores, etc.)
      const peopleResponse = await fetch(`https://api.themoviedb.org/3/search/person?include_adult=false&language=${language}&page=1&api_key=${apiKey}`);
      const peopleData = await peopleResponse.json();
      setPeople(peopleData.results); // Asume que `results` contiene la lista de personas

      setLoading(false);
    } catch (error) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [language]); // Dependencia en el idioma

  return { movieGenres, tvGenres, people, error, loading, refetch: fetchData };
};

export default useFetchData;
