import ListingSection from "@/components/section/Listing_section";
import { api, ENDPOINT } from "@/lib/api";

export default function Home() {
  // Safely define list with proper error handling
  const list = [
    {
      label: "Top Rated",
      href: "top_rated",
      fetcher: async () => {
        try {
          const response = await api.get(ENDPOINT.discoverTopRated);
          return response.data?.results || [];
        } catch (error) {
          console.error("Error fetching top rated:", error);
          return [];
        }
      },
    },
    {
      label: "Trending",
      href: "trending",
      fetcher: async () => {
        try {
          const response = await api.get(ENDPOINT.discoverTrending);
          return response.data?.results || [];
        } catch (error) {
          console.error("Error fetching trending:", error);
          return [];
        }
      },
    },
  ];

  // Safe banner data fetcher
  const getBannerData = async () => {
    try {
      const response = await api.get(ENDPOINT.discoverNowPlaying, {
        params: {
          language: 'en-US',
          page: 1,
        },
      });
      return response.data?.results || [];
    } catch (error) {
      console.error("Error fetching banner data:", error);
      return [];
    }
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