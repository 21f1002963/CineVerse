import ListingSection from "@/components/section/Listing_section";
import { ENDPOINT } from "@/lib/api";
import React from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

const safeFetch = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, { cache: 'no-store' });
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

export default async function Home() {
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
  ];

  const [
    bannerData,
    ...categoryData
  ] = await Promise.all([
    safeFetch(ENDPOINT.discoverTrending("movie")),
    ...list.map(item => safeFetch(item.endpoint))
  ]);

  const listWithData = list.map((item, index) => ({
    ...item,
    data: categoryData[index],
  }));

  return (
    <main>
      <ListingSection 
        bannerData={bannerData}
        list={listWithData} 
      />
    </main>
  );
}