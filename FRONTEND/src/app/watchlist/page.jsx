"use client";

import { useSelector } from "react-redux";
import MovieCard from "@/components/ui/MovieCard";

const Page = () => {
  const user = useSelector((state) => state.user.user);
  const wishlist = user?.wishList?.map(item => item.wishlistItem || item) || [];

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-2xl font-bold mb-4">Your Watchlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {wishlist.map((item) => (
            <MovieCard key={item.id} data={item} />
          ))}
        </div>
      ) : (
        <p className="text-white">Your watchlist is empty.</p>
      )}
    </div>
  );
};

export default Page;
