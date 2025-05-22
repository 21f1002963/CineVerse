import ListingSection from "@/components/section/Listing_section";
import { api, ENDPOINT } from "@/lib/api";

export default function Home() {
  const list = [
    {
      label: "Top Rated",
      href: "top_rated",
      fetcher: async () => {
        return (await api.get(ENDPOINT.discoverTopRated)).data.results;
      },
    },
    {
      label: "Trending",
      href: "trending",
      fetcher: async () => {
        return (await api.get(ENDPOINT.discoverTrending)).data.results;
      },
    },
    {
      label: "Upcoming",
      href: "upcoming",
      fetcher: async () => {
        return (await api.get(ENDPOINT.discoverUpcoming)).data.results;
      },
    },
  ];

  const getBannerData = async () => {
    return (await api.get(ENDPOINT.discoverNowPlaying, {
      params: {
        language: 'en-US',
        page: 1,
      },
    })).data?.results;
  };

  return (
    <main>
      <ListingSection bannerFetcher={getBannerData} list={list} />
    </main>
  );
}
