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
  