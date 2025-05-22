"use client";

import React from "react";
import { Button } from "./button";
import { PlusIcon } from "lucide-react";
import { api, ENDPOINT } from "@/lib/api";
import { toast } from "./use-toast";
import { useSelector } from "react-redux";

const WishlistButton = ({ wishlist }) => {
  const user = useSelector((state) => state.user);
  if (!user.isLoggedIn) return <></>;
  const addToWishList = async () => {
    try {
      const res = await api.post(ENDPOINT.addToWishlist, wishlist);
      if (res.data) {
        toast({
          title: "Added to Wishlist!",
        });
      }
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <Button className="sm:ml-auto" onClick={addToWishList}>
      <PlusIcon className="w-4 h-4 mr-2" />
      Watchlist
    </Button>
  );
};

export default WishlistButton;
