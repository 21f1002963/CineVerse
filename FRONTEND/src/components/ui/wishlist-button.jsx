"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { setWishlist } from "@/redux/userSlice";
import { Button } from "./button";

const WishlistButton = ({ media_type, id }) => {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        if (user?.wishList) {
            setIsInWishlist(user.wishList.some(item => item.id === id));
        }
    }, [user?.wishList, id]);

    const handleWishlist = async () => {
        try {
            if (isInWishlist) {
                // Note: Remove from wishlist functionality is not implemented in the backend yet.
                // This is a placeholder for the actual implementation.
                toast({
                    title: "Info",
                    description: "Remove from wishlist functionality will be added soon.",
                    variant: "info",
                });
                return;
            }

            await api.post('/user/wishlist', { id, media_type });
            const response = await api.get('/user/wishlist');
            dispatch(setWishlist(response.data.data));

            toast({
                title: "Success",
                description: "Added to your wishlist.",
                variant: "success",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to update wishlist.",
                variant: "destructive",
            });
        }
    };

    return (
        <Button
            onClick={handleWishlist}
            className="bg-gray-700 text-white hover:bg-gray-600"
        >
            {isInWishlist ? 'In Watchlist' : 'Add to Watchlist'}
        </Button>
    );
};

export default WishlistButton;
