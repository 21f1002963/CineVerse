import axios from "axios";

const API_BASE = typeof window === "undefined"
  ? process.env.NEXT_PUBLIC_API_BASE_URL 
  : process.env.NEXT_PUBLIC_API_BASE_URL;

export const ENDPOINT= {
    //Auth
    login: "/api/auth/login",
    signup: "/api/auth/signup",
    logout: "/api/auth/logout",
    user: "/api/user",
    forgetPassword: "/api/auth/forgetpassword",
    resetPassword: "/api/auth/resetpassword",
    //Discover
    discoverNowPlaying: "/api/movies/now_playing",
    discoverPopular: (media_type) => `/api/discover/popular/${media_type}`,
    discoverTopRated: (media_type) => `/api/discover/top_rated/${media_type}`,
    discoverTrending: (media_type) => `/api/discover/trending/${media_type}`,
    discoverGenres: (media_type) => `/api/discover/genres/${media_type}`,
    discoverUpcoming: "/api/movies/upcoming",
    //Movies
    fetchActionMovies: "/api/movies/action",
    fetchComedyMovies: "/api/movies/comedy",
    fetchHorrorMovies: "/api/movies/horror",
    fetchRomanceMovies: "/api/movies/romance",
    fetchAnimeMovies: "/api/movies/anime",
    getMovieDetails: (id) => `/api/movies/${id}`,
    //TV Shows
    fetchActionTvShows: "/api/tvshows/action",
    fetchComedyTvShows: "/api/tvshows/comedy",
    fetchCrimeTvShows: "/api/tvshows/crime",
    fetchDramaTvShows: "/api/tvshows/drama",
    fetchMysteryTvShows: "/api/tvshows/mystery",
    getTvShowsDetails: (id) => `/api/tvshows/${id}`,
    //User
    addToWishList: "/api/user/wishlist",
    getWishList: "/api/user/wishlist",
    //Payments
    payment: "/api/payment/order",
    updatePremium: "/api/payment/update_premium_access",
    //Streaming
    fetchAllStreamingVideos: "/api/video",
    fetchStreamingVideo: (id) => `/api/video?id=${id}`,
    fetchVideoThumbnail: (id) => `/api/video/thumbnail?videoId=${id}`
}

export const api = axios.create({
  baseURL: API_BASE,
});

export const media = (path) => `https://image.tmdb.org/t/p/original` + path;

export const getStreamingVideoThumbnail = (id) =>
  ENDPOINT.fetchVideoThumbnail(id);

