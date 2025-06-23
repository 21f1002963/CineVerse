"use client";

import ListingSection from "@/components/section/Listing_section";
import { api, ENDPOINT } from "@/lib/api";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await api.get(ENDPOINT.discoverTrending("movie"));
        setBannerData(response.data?.data.results || []);
      } catch (error) {
        console.error("Error fetching banner data:", error);
        setBannerData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerData();
  }, []);

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

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <main>
      <ListingSection 
        bannerData={bannerData} 
        list={list} 
      />
    </main>
  );
}