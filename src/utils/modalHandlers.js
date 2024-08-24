export const showMovieDetails = async (movieId, apiKey, setSelectedMovie, setSelectedShow, language) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}&append_to_response=credits,videos,reviews`);
    const data = await response.json();
    
    setSelectedMovie(data);
    setSelectedShow(null);
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
};


export const showTvShowDetails = async (showId, apiKey, setSelectedShow, language) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}&language=${language}&append_to_response=credits,videos,reviews`);
    const data = await response.json();
    
    setSelectedShow(data);
  } catch (error) {
    console.error('Error fetching TV show details:', error);
  }
};

  
  export const closeModal = (setSelectedMovie) => setSelectedMovie(null);
  export const closeModalShow = (setSelectedShow) => setSelectedShow(null);