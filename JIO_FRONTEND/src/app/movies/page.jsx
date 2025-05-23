import ListingSection from "@/components/section/Listing_section";
import { api, ENDPOINT } from "@/lib/api";
import React from "react";


const MoviesPage = (props) => {
  const list = [
    {
      label: "Top Comedy Movies",
      href: "comedy",
      fetcher: async () => {
        return (await api.get(ENDPOINT.fetchComedyMovies)).data.data?.results;
      },
    },
    {
      label: "Top Horror Movies",
      href: "horror",
      fetcher: async () => {
        return (await api.get(ENDPOINT.fetchHorrorMovies)).data.data?.results;
      },
    },
    {
      label: "Top Romance Movies",
      href: "romance",
      fetcher: async () => {
        return (await api.get(ENDPOINT.fetchRomanceMovies)).data.data?.results;
      },
    },
    {
      label: "Top Action Movies",
      href: "action",
      fetcher: async () => {
        return (await api.get(ENDPOINT.fetchActionMovies)).data.data?.results;
      },
    },
    
  ];
  const getBannerData = async () => {
    return (await api.get(ENDPOINT.fetchAnimeMovies)).data?.data?.results;
  };

  return (
    <main>
      <ListingSection bannerFetcher={getBannerData} list={list} />
    </main>
  );
};

export default MoviesPage;
