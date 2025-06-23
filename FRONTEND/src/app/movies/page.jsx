import ListingSection from "@/components/section/Listing_section";
import { api, ENDPOINT } from "@/lib/api";
import React from "react";

// Cache API responses or set revalidation time
export const revalidate = 3600; // Revalidate every hour

// Generic error handler for API calls
const safeFetch = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data?.data?.results || []; // Fallback to empty array
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return []; // Return empty array on error
  }
};

const MoviesPage = () => {
  const list = [
    {
      label: "Top Comedy Movies",
      href: "comedy",
      fetcher: () => safeFetch(ENDPOINT.fetchComedyMovies),
    },
    {
      label: "Top Horror Movies",
      href: "horror",
      fetcher: () => safeFetch(ENDPOINT.fetchHorrorMovies),
    },
    {
      label: "Top Romance Movies",
      href: "romance",
      fetcher: () => safeFetch(ENDPOINT.fetchRomanceMovies),
    },
    {
      label: "Top Action Movies",
      href: "action",
      fetcher: () => safeFetch(ENDPOINT.fetchActionMovies),
    },
  ];

  const getBannerData = async () => {
    return await safeFetch(ENDPOINT.fetchAnimeMovies);
  };

  return (
    <main>
      <ListingSection bannerFetcher={getBannerData} list={list} />
    </main>
  );
};

export default MoviesPage;