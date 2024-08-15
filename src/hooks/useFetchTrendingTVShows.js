import { useState, useEffect } from 'react';

const useFetchTrendingTVShows = (apiKey) => {
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTrendingTVShows = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=es-ES`);
      const data = await response.json();
      setTrendingTVShows(data.results);
      setLoading(false);
    } catch (error) {
      setError('Error fetching trending TV shows');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingTVShows();
  }, []);

  return { trendingTVShows, error, loading, refetch: fetchTrendingTVShows };
};

export default useFetchTrendingTVShows;
