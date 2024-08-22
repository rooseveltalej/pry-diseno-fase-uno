export const showMovieDetails = async (movieId, apiKey, setSelectedMovie, setSelectedShow) => {
  try {
    const responseEs = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-ES&append_to_response=credits,videos,reviews`);
    const dataEs = await responseEs.json();
    
    if (!dataEs.reviews || dataEs.reviews.results.length === 0) {
      const responseEn = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=reviews`);
      const dataEn = await responseEn.json();

      dataEs.reviews = dataEn.reviews;
    }

    setSelectedMovie(dataEs);
    setSelectedShow(null);
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
};

export const showTvShowDetails = async (showId, apiKey, setSelectedShow) => {
  try {
    const responseEs = await fetch(`https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}&language=es-ES&append_to_response=credits,videos,reviews`);
    const dataEs = await responseEs.json();

    if (!dataEs.reviews || dataEs.reviews.results.length === 0) {
      const responseEn = await fetch(`https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}&language=en-US&append_to_response=reviews`);
      const dataEn = await responseEn.json();

      dataEs.reviews = dataEn.reviews;
    }

    setSelectedShow(dataEs);
  } catch (error) {
    console.error('Error fetching TV show details:', error);
  }
};

  
  export const closeModal = (setSelectedMovie) => setSelectedMovie(null);
  export const closeModalShow = (setSelectedShow) => setSelectedShow(null);