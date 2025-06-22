// Placeholder TMDB services module
// Replace with real TMDB API integration as needed

module.exports = {
  tmdbAPI: {},
  TMDB_ENDPOINT: {
    fetchMovieDetails: (id) => `/movie/${id}`,
    fetchTvShowDetails: (id) => `/tv/${id}`,
  },
};
