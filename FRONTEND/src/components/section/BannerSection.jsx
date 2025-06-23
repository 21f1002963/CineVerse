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

  if (!trendingPosts.length) {
    return <BannerSectionFallback />;
  }

  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className="w-full px-4 md:px-0"
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
      <div className="absolute bottom-4 right-[12%] hidden md:flex">
        <CarouselPrevious className="w-[60px] h-[60px]" />
        <CarouselNext className="w-[60px] h-[60px] ml-2" />
      </div>
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