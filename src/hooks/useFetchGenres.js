import { useEffect, useState } from 'react';

const useFetchGenres = (apiKey, language) => {
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTVGenres] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGenres = async () => {
    try {
      const movieGenreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${language}`);
      const movieGenreData = await movieGenreResponse.json();
      setMovieGenres(movieGenreData.genres);

      const tvGenreResponse = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=${language}`);
      const tvGenreData = await tvGenreResponse.json();
      setTVGenres(tvGenreData.genres);

      setLoading(false);
    } catch (error) {
      setError('Error fetching genres');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, [language]); // Dependencia en el idioma


  return { movieGenres, tvGenres, error, loading, refetch: fetchGenres };
};

export default useFetchGenres;