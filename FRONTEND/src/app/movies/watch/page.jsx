import { api, ENDPOINT } from "@/lib/api";
import WatchPage from "@/components/section/WatchPage";

export const dynamic = "force-dynamic";

const Page = async ({ searchParams }) => {
  const id = searchParams?.id;
  let details = null;
  try {
    const response = await api.get(ENDPOINT.getMovieDetails(id), { cache: 'no-store' });
    details = response.data?.data?.results?.[0];
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
  }

  return <WatchPage details={details} media_type="movie" />;
};

export default Page;
