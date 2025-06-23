"use client";

import ListingSection from '@/components/section/Listing_section'
import { api, ENDPOINT } from '@/lib/api';
import React, { useEffect, useState } from 'react'

// Add retry mechanism for API calls
const fetchWithRetry = async (endpoint, retries = 3) => {
  try {
    const response = await api.get(endpoint);
    return response.data?.data?.results || [];
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying ${endpoint}, attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchWithRetry(endpoint, retries - 1);
    }
    console.error(`Failed to fetch ${endpoint}:`, error);
    return [];
  }
};

const TvShows = () => {
  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const data = await fetchWithRetry(ENDPOINT.fetchMysteryTvShows);
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
      label: "Comedy",
      href: "comedy",
      fetcher: () => fetchWithRetry(ENDPOINT.fetchComedyTvShows),
    },
    {
      label: "Crime",
      href: "crime",
      fetcher: () => fetchWithRetry(ENDPOINT.fetchCrimeTvShows),
    },
    {
      label: "Drama",
      href: "drama",
      fetcher: () => fetchWithRetry(ENDPOINT.fetchDramaTvShows),
    },
    {
      label: "Action",
      href: "action",
      fetcher: () => fetchWithRetry(ENDPOINT.fetchActionTvShows),
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

export default TvShows;