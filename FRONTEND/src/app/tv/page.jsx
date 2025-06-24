"use client";
import ListingSection from "@/components/section/Listing_section";
import { ENDPOINT } from "@/lib/api";
import React, { useState, useEffect } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://cineverse-8qbv.onrender.com";

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

const TvShowsPage = () => {
  const [bannerData, setBannerData] = useState([]);
  const [listWithData, setListWithData] = useState([]);
  const [loading, setLoading] = useState(true);

  const list = [
    {
      label: "Comedy",
      href: "comedy",
      endpoint: ENDPOINT.fetchComedyTvShows,
    },
    {
      label: "Crime",
      href: "crime",
      endpoint: ENDPOINT.fetchCrimeTvShows,
    },
    {
      label: "Drama",
      href: "drama",
      endpoint: ENDPOINT.fetchDramaTvShows,
    },
    {
      label: "Action",
      href: "action",
      endpoint: ENDPOINT.fetchActionTvShows,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          bannerDataResponse,
          ...categoryData
        ] = await Promise.all([
          safeFetch(ENDPOINT.fetchMysteryTvShows),
          ...list.map(item => safeFetch(item.endpoint))
        ]);

        setBannerData(bannerDataResponse);

        const listDataWithFetched = list.map((item, index) => ({
          ...item,
          data: categoryData[index],
        }));

        setListWithData(listDataWithFetched);
      } catch (error) {
        console.error('Failed to fetch TV shows data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-white text-center">Loading TV shows...</div>
      </div>
    );
  }

  return (
    <main>
      <ListingSection bannerData={bannerData} list={listWithData} />
    </main>
  );
};

export default TvShowsPage;