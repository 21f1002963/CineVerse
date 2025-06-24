import React from "react";
import { media } from "@/lib/api";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { cn, getWatchUrl } from "@/lib/utils";
import { InboxIcon } from "lucide-react";

const CategoryList = ({ data: categoryPost, className }) => {
  if (!categoryPost || categoryPost.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-12">
        <InboxIcon
          className="w-24 h-24 text-slate-400 mb-6"
          strokeWidth={1.2}
        />
        <p className="text-lg text-gray-500">No items found in this category.</p>
      </div>
    );
  }

  return (
    <ul
      className={cn(
        "flex gap-4 w-full overflow-x-auto scrollbar-hide",
        className
      )}
      style={{ overflowY: 'hidden', height: 'auto' }}
    >
      {categoryPost?.map((post, index) => (
        <Link key={index} href={getWatchUrl(post.id, post.media_type)}>
          <Image
            src={media(post?.poster_path)}
            alt={post.title || post.name || "Media poster"}
            width={200}
            height={300}
            className="min-w-[200px] h-[300px] rounded-lg object-cover bg-slate-700"
            quality={30}
          />
        </Link>
      ))}
    </ul>
  );
};

export const CategoryListFallback = () => (
  <ul className="flex gap-4 w-full overflow-x-auto scrollbar-hide" style={{ overflowY: 'hidden', height: 'auto' }}>
    {new Array(12)?.fill(0)?.map((e, index) => (
      <Skeleton key={index} className="min-w-[200px] h-[300px] rounded-lg" />
    ))}
  </ul>
);

export default CategoryList;
