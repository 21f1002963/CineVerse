"use client";

import ListingSection from "@/components/section/Listing_section";
import { api, ENDPOINT } from "@/lib/api";
import React, { useEffect, useState } from "react";

// Generic error handler for API calls
const safeFetch = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    console.log(`API Response for ${endpoint}:`, response.data);
    return response.data?.data?.results || []; // Fallback to empty array
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return []; // Return empty array on error
  }
};

const MoviesPage = () => {
  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        console.log("Fetching banner data from:", ENDPOINT.fetchAnimeMovies);
        const data = await safeFetch(ENDPOINT.fetchAnimeMovies);
        console.log("Banner data received:", data);
        setBannerData(data);
      } catch (error) {
        console.error("Error fetching banner data:", error);
        setBannerData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerData();
  }, []);

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

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <main>
      <ListingSection bannerData={bannerData} list={list} />
    </main>
  );
};

export default MoviesPage;