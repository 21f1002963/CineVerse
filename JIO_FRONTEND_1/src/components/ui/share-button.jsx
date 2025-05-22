"use client";

import React from "react";
import { Button } from "./button";
import { Share2Icon } from "lucide-react";
import { toast } from "./use-toast";


const ShareButton = () => {
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast({ title: "URL copied to clipboard" });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast({ title: "Failed to copy URL" });
      });
  };
  return (
    <Button onClick={handleShare}>
      <Share2Icon className="w-4 h-4 mr-2" />
      Share
    </Button>
  );
};

export default ShareButton;
