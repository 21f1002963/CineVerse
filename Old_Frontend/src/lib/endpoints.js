import { get } from "http";

export const ENDPOINT= {
    //Auth
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout",
    user: "/user",
    forgetPassword: "/auth/forgetpassword",
    resetPassword: "/auth/resetpassword",
    //Discover
    discoverNowPlaying: "/discover/movie/now_playing",
    discoverTrending: "/discover/movie/trending",
    discoverTopRated: "/discover/movie/top_rated",
    discoverUpcoming: "/discover/movie/upcoming",
    //Movies
    fetchActionMovies: "/movies/action",
    fetchComedyMovies: "/movies/comedy",
    fetchHorrorMovies: "/movies/horror",
    fetchRomanceMovies: "/movies/romance",
    fetchAnimeMovies: "/movies/anime",

    getMovieDetails: (id) => `/movie/details?id=${id}`,
    getTvShowsDetails: (id) => `/tv/details?id=${id}`,

    //User
    user: "/user",
    addToWishList: "/user/addtowishlist",
    getWishList: "/user/getwishlist",

    //Payments
    payment: "/payment/order",
    updatePremium: "/payment/update_premium_access",

    //Streaming
    fetchAllStreamingVideos: "/video",
    fetchStreamingVideo: (id) => `/video/id=${id}`
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;