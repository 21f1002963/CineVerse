import axios from "axios";

export const ENDPOINT= {
    //Auth
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout",
    user: "/user",
    forgetPassword: "/auth/forgetpassword",
    resetPassword: "/auth/resetpassword",
    //Discover
    discoverNowPlaying: "/movie/now_playing",
    discoverPopular: "/movie/popular",
    discoverTopRated: "/movie/top_rated",
    discoverUpcoming: "/movie/upcoming",
    //Movies
    // fetchActionMovies: "/movies/action",
    // fetchComedyMovies: "/movies/comedy",
    // fetchHorrorMovies: "/movies/horror",
    // fetchRomanceMovies: "/movies/romance",
    // fetchAnimeMovies: "/movies/anime",
    getMovieDetails: (id) => `/movie/${id}`,
    //TV Shows
    // fetchActionTvShows: `/tv/action`,
    // fetchComedyTvShows: `/tv/comedy`,
    // fetchCrimeTvShows: `/tv/crime`,
    // fetchDramaTvShows: `/tv/drama`,
    // fetchMysteryTvShows: `/tv/mystery`,
    getTvShowsDetails: (id) => `/tv/${id}`,
    //User
    addToWishList: "/user/wishlist",
    getWishList: "/user/wishlist",
    //Payments
    payment: "/payment/order",
    updatePremium: "/payment/update_premium_access",
    //Streaming
    fetchAllStreamingVideos: "/video",
    fetchStreamingVideo: (id) => `/video?id=${id}`,
    fetchVideoThumbnail: (id) => `/video/thumbnail?videoId=${id}`
}

export const TMDB_API_BASE_URL = process.env.TMDB_API_BASE_URL;
export const TMDB_API_KEY = process.env.TMDB_API_KEY;

export const media = (path) => `https://image.tmdb.org/t/p/original` + path;

export const getStreamingVideoThumbnail = (id) =>
  TMDB_API_BASE_URL + ENDPOINT.fetchVideoThumbnail(id);

export const api = axios.create({
  baseURL: TMDB_API_BASE_URL,
  params: {
    api_key: TMDB_API_KEY, 
  },
});

