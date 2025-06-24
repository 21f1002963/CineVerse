import ListingSection from "@/components/section/Listing_section";
import { ENDPOINT } from "@/lib/api";
import React from "react";

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

// Generic error handler for API calls
const safeFetch = async (endpoint) => {
  try {
    // Using fetch with force-cache to leverage Next.js caching
    const response = await fetch(`${API_BASE}${endpoint}`, { cache: 'no-store' });
    if (!response.ok) {
      // Log error for easier debugging
      console.error(`API request failed for ${endpoint} with status: ${response.status}`);
      return [];
    }
    const responseData = await response.json();
    return responseData?.data?.results || []; // Fallback to empty array
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return []; // Return empty array on error
  }
};

const MoviesPage = async () => {
  const list = [
    {
      label: "Top Comedy Movies",
      href: "comedy",
      endpoint: ENDPOINT.fetchComedyMovies,
    },
    {
      label: "Top Horror Movies",
      href: "horror",
      endpoint: ENDPOINT.fetchHorrorMovies,
    },
    {
      label: "Top Romance Movies",
      href: "romance",
      endpoint: ENDPOINT.fetchRomanceMovies,
    },
    {
      label: "Top Action Movies",
      href: "action",
      endpoint: ENDPOINT.fetchActionMovies,
    },
  ];

  // Fetch all data in parallel
  const [
    bannerData,
    ...categoryData
  ] = await Promise.all([
    safeFetch(ENDPOINT.fetchAnimeMovies),
    ...list.map(item => safeFetch(item.endpoint))
  ]);

  // Combine list definition with fetched data
  const listWithData = list.map((item, index) => ({
    ...item,
    data: categoryData[index],
  }));


  return (
    <main>
      <ListingSection bannerData={bannerData} list={listWithData} />
    </main>
  );
};

export default MoviesPage;