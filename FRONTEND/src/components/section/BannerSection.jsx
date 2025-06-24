"use client";

import { media } from "@/lib/api";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { getWatchUrl } from "@/lib/utils";

const BannerSection = ({ data }) => {
  const trendingPosts = data || [];
  
  console.log("BannerSection received data:", data);
  console.log("trendingPosts:", trendingPosts);

  if (!trendingPosts.length) {
    console.log("No trending posts, showing fallback");
    return <BannerSectionFallback />;
  }

  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className="w-full px-4 md:px-0 group relative"
    >
      <CarouselContent className="">
        {trendingPosts?.map((vid) => (
          <CarouselItem key={vid.id} className="w-full max-w-[700px] h-[500px]">
            <Link href={getWatchUrl(vid.id, vid.media_type)}>
              <Image
                src={media(vid?.poster_path)}
                alt=""
                width={700}
                height={500}
                className="w-full h-full bg-slate-600 rounded-lg object-cover"
                quality={30}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:hidden" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:hidden" />
    </Carousel>
  );
};

export const BannerSectionFallback = () => (
  <div className="flex items-center justify-center gap-5">
    <Skeleton className="h-[500px] w-[700px] rounded-lg" />
    <Skeleton className="h-[500px] w-[700px] rounded-lg" />
    <Skeleton className="h-[500px] w-[700px] rounded-lg" />
  </div>
);

export default BannerSection;