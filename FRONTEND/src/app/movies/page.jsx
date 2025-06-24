"use client";
import ListingSection from "@/components/section/Listing_section";
import { ENDPOINT } from "@/lib/api";
import React, { useState, useEffect } from "react";

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

const MoviesPage = () => {
  const [bannerData, setBannerData] = useState([]);
  const [listWithData, setListWithData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [
          bannerDataResponse,
          ...categoryData
        ] = await Promise.all([
          safeFetch(ENDPOINT.fetchAnimeMovies),
          ...list.map(item => safeFetch(item.endpoint))
        ]);

        setBannerData(bannerDataResponse);

        // Combine list definition with fetched data
        const listDataWithFetched = list.map((item, index) => ({
          ...item,
          data: categoryData[index],
        }));

        setListWithData(listDataWithFetched);
      } catch (error) {
        console.error('Failed to fetch movies data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-white text-center">Loading movies...</div>
      </div>
    );
  }

  return (
    <main>
      <ListingSection bannerData={bannerData} list={listWithData} />
    </main>
  );
};

export default MoviesPage;