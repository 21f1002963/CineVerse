"use client";
import { api, ENDPOINT } from "@/lib/api";
import WatchPage from "@/components/section/WatchPage";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            if (id) {
                try {
                    const response = await api.get(ENDPOINT.getMovieDetails(id));
                    setDetails(response.data?.data?.results?.[0]);
                } catch (error) {
                    console.error("Failed to fetch movie details:", error);
                }
            }
            setLoading(false);
        };

        fetchDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-white text-center">Loading...</div>
            </div>
        );
    }

    return <WatchPage details={details} media_type="movie" id={id} />;
};

export default Page;
