import ListingSection from '@/components/section/Listing_section'
import { api, ENDPOINT } from '@/lib/api';
import React from 'react'

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

export const revalidate = 3600; // Revalidate data every hour

const TvShows = () => {
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

  const getBannerData = async () => {
    return await fetchWithRetry(ENDPOINT.fetchMysteryTvShows);
  };

  return (
    <main>
      <ListingSection 
        bannerFetcher={getBannerData} 
        list={list}
        fallbackData={[]}
      />
    </main>
  );
}

export default TvShows;