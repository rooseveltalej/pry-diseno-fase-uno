import { useEffect, useState } from 'react';

const useFetchTrendingMovies = (apiKey, language) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=${language}`);
      const data = await response.json();
      setTrendingMovies(data.results);
      setLoading(false);
    } catch (error) {
      setError('Error fetching trending movies');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, [language]); // Dependencia en el idioma

  return { trendingMovies, error, loading, refetch: fetchTrendingMovies };
};

export default useFetchTrendingMovies;
