"use client";
import ListingSection from "@/components/section/Listing_section";
import { ENDPOINT } from "@/lib/api";
import React, { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://cineverse-8qbv.onrender.com";

// Generic error handler for API calls
const safeFetch = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`);
    if (!response.ok) {
      console.error(`API request failed for ${endpoint} with status: ${response.status}`);
      return [];
    }
    const responseData = await response.json();
    return responseData?.data?.results || [];
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return [];
  }
};

export default function Home() {
  const [bannerData, setBannerData] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const list = [
    {
      label: "Trending Movies",
      href: "trending",
      endpoint: ENDPOINT.discoverTrending("movie"),
    },
    {
      label: "Popular Movies",
      href: "popular",
      endpoint: ENDPOINT.discoverPopular("movie"),
    },
    {
      label: "Top Rated Movies", 
      href: "top_rated",
      endpoint: ENDPOINT.discoverTopRated("movie"),
    },
    {
      label: "Popular TV Shows",
      href: "popular_tv",
      endpoint: ENDPOINT.discoverPopular("tv"),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch banner data and all sections in parallel
        const [
          bannerDataResponse,
          ...categoryData
        ] = await Promise.all([
          safeFetch(ENDPOINT.discoverTrending("movie")), // Use trending movies for banner
          ...list.map(item => safeFetch(item.endpoint))
        ]);

        console.log("Home page banner data:", bannerDataResponse);
        console.log("Home page category data:", categoryData);

        setBannerData(bannerDataResponse);
        
        // Combine list definition with fetched data
        const sectionsWithData = list.map((item, index) => ({
          ...item,
          data: categoryData[index],
        }));

        setSections(sectionsWithData);
      } catch (error) {
        console.error('Failed to fetch home page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array is intentional for initial load

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-white text-center">Loading...</div>
      </div>
    );
  }

  return (
    <main>
      <ListingSection 
        bannerData={bannerData}
        list={sections} 
      />
    </main>
  );
}
