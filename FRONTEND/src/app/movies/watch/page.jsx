import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import ShareButton from "@/components/ui/share-button";
import WishlistButton from "@/components/ui/wishlist-button";
import { api, ENDPOINT } from "@/lib/api";
import { FilmIcon, Star } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async ({ searchParams }) => {
  const id = searchParams?.id;
  if (!id) {
    return <VideoUnavailable />;
  }

  let details = null;
  try {
    const response = await api.get(ENDPOINT.getMovieDetails(id), { cache: 'no-store' });
    details = response.data?.data?.results?.[0];
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
  }

  return (
    <div className="pt-16 lg:pt-20 pb-8">
      {details ? (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="w-full aspect-video rounded-md overflow-hidden bg-slate-900">
            <iframe
              title={details.name || details.title}
              src={`https://www.youtube-nocookie.com/embed/${details.key}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="mt-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {details.name || details.title}
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-2 items-center mt-2 text-slate-300">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-white">
                  {details.vote_average?.toFixed(1)}
                </span>
                <span className="text-xs text-slate-400">/ 10</span>
              </div>
              <div className="text-sm">
                <span className="text-slate-400">Released: </span>
                <span className="font-medium text-slate-200">
                  {new Date(
                    details.release_date || details.first_air_date
                  ).getFullYear()}
                </span>
              </div>
              {details.runtime && (
                <div className="text-sm">
                  <span className="text-slate-400">Duration: </span>
                  <span className="font-medium text-slate-200">{details.runtime} min</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {details.genres?.map((genre) => (
                <Badge
                  key={genre.id}
                  variant="outline"
                  className="border-slate-700 bg-slate-800 text-slate-300 text-xs"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-center mt-4">
            <WishlistButton
              wishlist={{
                id: id,
                poster_path: details.poster_path,
                name: details.name || details.title,
                media_type: "movie",
              }}
            />
            <ShareButton />
          </div>
          <div className="mt-6 max-w-4xl">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
              Storyline
            </h2>
            <p className="mt-3 text-slate-400 leading-relaxed text-sm">
              {details.overview}
            </p>
          </div>
        </div>
      ) : (
        <VideoUnavailable />
      )}
    </div>
  );
};

const VideoUnavailable = () => (
  <div className="w-full h-screen flex flex-col gap-4 items-center justify-center text-slate-500 -mt-20">
    <FilmIcon className="w-20 h-20" />
    <p>This video is currently unavailable.</p>
    <Link href={"/"} className={buttonVariants()}>
      Go Home
    </Link>
  </div>
);

export default page;
