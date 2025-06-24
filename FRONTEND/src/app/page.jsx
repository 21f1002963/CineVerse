"use client";
import ListingSection from "@/components/section/Listing_section";
import { api } from "@/lib/api";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const list = [
    {
      label: "Trending Movies",
      href: "trending",
      endpoint: "/discover/trending/movie",
    },
    {
      label: "Popular Movies",
      href: "popular",
      endpoint: "/discover/popular/movie",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const results = await Promise.all(
        list.map(async (item) => {
          try {
            const response = await api.get(item.endpoint);
            return {
              ...item,
              data: response.data?.data?.results || [],
            };
          } catch (error) {
            console.error(`Failed to fetch ${item.endpoint}:`, error);
            return {
              ...item,
              data: [],
            };
          }
        })
      );
      setSections(results);
      setLoading(false);
    };

    fetchData();
  }, []);

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
        list={sections} 
      />
    </main>
  );
}
