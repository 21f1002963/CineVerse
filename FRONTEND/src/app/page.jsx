"use client";

import ListingSection from "@/components/section/Listing_section";
import { api, ENDPOINT } from "@/lib/api";


export default function Home() {
  // Safely define list with proper error handling
  const list = [
    {
      label: "Trending Movies",
      href: "trending",
      fetcher: async () => {
        try {
          const response = await api.get(ENDPOINT.discoverTrending("movie"));
          return response.data?.data.results || [];
        } catch (error) {
          console.error("Error fetching trending movies:", error);
          return [];
        }
      },
    },
    {
      label: "Popular Movies",
      href: "popular",
      fetcher: async () => {
        try {
          const response = await api.get(ENDPOINT.discoverPopular("movie"));
          return response.data?.data.results || [];
        } catch (error) {
          console.error("Error fetching popular movies:", error);
          return [];
        }
      },
    },
  ];

  // Safe banner data fetcher
  const getBannerData = async () => {
    try {
      const response = await api.get(ENDPOINT.discoverTrending("movie"));
      return response.data?.data.results || [];
    } catch (error) {
      console.error("Error fetching banner data:", error);
      return [];
    }
  };

  return (
    <main>
      <ListingSection 
        bannerFetcher={getBannerData} 
        list={list} 
      />
    </main>
  );
}