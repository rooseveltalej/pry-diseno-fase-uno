import { useState, useEffect } from 'react';

const useFetchTrendingMovies = (apiKey) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=es-ES`);
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
  }, []);

  return { trendingMovies, error, loading, refetch: fetchTrendingMovies };
};

export default useFetchTrendingMovies;
