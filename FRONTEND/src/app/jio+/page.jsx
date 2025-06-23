'use client'; // Add this at the top

import { useEffect, useState } from 'react';
import { api, ENDPOINT, getStreamingVideoThumbnail } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { PlayCircleIcon } from "lucide-react";

export default function JioPlusPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get(ENDPOINT.fetchAllStreamingVideos);
        setVideos(response.data?.data || []);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading videos</div>;
  return (
    <main className="h-screen mt-20 p-8">
      <h1 className="text-2xl font-medium mb-6">Jio+ Premium Videos</h1>
      <ul
        className={cn("flex gap-4 w-full overflow-scroll scrollbar-hide p-4")}
      >
        {videos?.map((video, index) => (
          <Link
            key={index}
            href={`jio+/watch?id=${video.id}`}
            className="relative flex items-center justify-center"
          >
            <Image
              src={getStreamingVideoThumbnail(video.id)}
              alt=""
              width={200}
              height={300}
              className="min-w-[200px] h-[300px] rounded-lg object-cover"
              quality={30}
            />
            <PlayCircleIcon className="absolute" />
          </Link>
        ))}
      </ul>
    </main>
  );
}
