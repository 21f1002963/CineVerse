import { api, ENDPOINT } from "@/lib/api";
import WatchPage from "@/components/section/WatchPage";

export const dynamic = "force-dynamic";

const Page = async ({ searchParams: { id } }) => {
    let details = null;
    try {
        if (id) {
            const response = await api.get(ENDPOINT.getTvShowsDetails(id), { cache: 'no-store' });
            details = response.data?.data;
        }
    } catch (error) {
        console.error("Failed to fetch TV show details:", error);
    }

    return <WatchPage details={details} media_type="tv" id={id} />;
};

export default Page;
