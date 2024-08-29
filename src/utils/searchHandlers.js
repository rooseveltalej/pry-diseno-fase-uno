export const handleMovieSearchChange = (query, searchMovie, setSearchType, setShowSearchResults) => {
    if (!query) {
      setShowSearchResults(false);
      return;
    }
    searchMovie(query);
    setSearchType('movie');
    setShowSearchResults(true);
  };
  
  export const handleTVSearchChange = (query, searchTVShows, setSearchType, setShowSearchResults) => {
    if (!query) {
      setShowSearchResults(false);
      return;
    }
    searchTVShows(query);
    setSearchType('tv');
    setShowSearchResults(true);
  };

export const handleActorSearch = async (query,getActorId, searchMoviesByActor, searchTVShowsByActor, setSearchType, setShowSearchResults) => {
    if (!query) {
      setShowSearchResults(false);
      return;
    }
  
    // Obtener el ID del actor
    const actorId = await getActorId(query);
    console.log('Actor ID:', actorId); // Verifica el ID del actor
  
    if (actorId) {
      // Buscar películas y series por ID del actor
      await searchMoviesByActor(actorId);
      await searchTVShowsByActor(actorId);
      setSearchType('actor');
      setShowSearchResults(true);
    } else {
      // Manejo si no se encuentra el actor
      setSearchType('');
      setShowSearchResults(false);
    }
  };
  