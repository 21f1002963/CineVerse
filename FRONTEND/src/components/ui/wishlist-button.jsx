"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api, ENDPOINT } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { setWishlist } from "@/redux/userSlice";
import { Button } from "./button";
import Link from "next/link";

const WishlistButton = ({ media_type, id }) => {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        if (user?.wishList) {
            setIsInWishlist(user.wishList.some(item => String(item.id) === String(id)));
        }
    }, [user?.wishList, id]);

    const handleWishlist = async () => {
        console.log("WishlistButton clicked:", { media_type, id, isLoggedIn, user: !!user });
        
        // Check if user is logged in
        if (!isLoggedIn || !user) {
            toast({
                title: "Login Required",
                description: "Please login to add items to your watchlist.",
                variant: "destructive",
            });
            return;
        }

        try {
            if (isInWishlist) {
                // Note: Remove from wishlist functionality is not implemented in the backend yet.
                // This is a placeholder for the actual implementation.
                toast({
                    title: "Info",
                    description: "Remove from wishlist functionality will be added soon.",
                });
                return;
            }

            // Ensure id and media_type are valid
            if (!id || !media_type) {
                toast({
                    title: "Error",
                    description: "Invalid item data. Please try again.",
                    variant: "destructive",
                });
                return;
            }

            await api.post(ENDPOINT.addToWishList, { 
                id: String(id), 
                media_type: String(media_type) 
            });
            
            // Fetch updated wishlist
            const response = await api.get(ENDPOINT.getWishList);
            dispatch(setWishlist(response.data.data));
            
            // Update local state immediately
            setIsInWishlist(true);

            toast({
                title: "Success",
                description: "Added to your wishlist.",
            });
        } catch (error) {
            console.error("Wishlist error:", error);
            
            // Handle specific authentication errors
            if (error.response?.status === 401) {
                toast({
                    title: "Authentication Required",
                    description: "Please login to add items to your watchlist.",
                    variant: "destructive",
                });
            } else if (error.response?.status === 400) {
                // Handle duplicate item error
                if (error.response?.data?.message?.includes("already in wishlist")) {
                    setIsInWishlist(true); // Update local state
                    toast({
                        title: "Already Added",
                        description: "This item is already in your wishlist.",
                    });
                } else {
                    toast({
                        title: "Error",
                        description: error.response?.data?.message || "Invalid request.",
                        variant: "destructive",
                    });
                }
            } else {
                toast({
                    title: "Error",
                    description: "Failed to update wishlist. Please try again.",
                    variant: "destructive",
                });
            }
        }
    };

    // If user is not logged in, show login prompt button
    if (!isLoggedIn || !user) {
        return (
            <Link href="/login">
                <Button variant="secondary">
                    Login to Add to Watchlist
                </Button>
            </Link>
        );
    }

    return (
        <Button
            onClick={handleWishlist}
            variant={isInWishlist ? 'default' : 'secondary'}
        >
            {isInWishlist ? 'In Watchlist' : 'Add to Watchlist'}
        </Button>
    );
};

export default WishlistButton;
