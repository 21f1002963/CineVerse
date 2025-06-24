import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getWatchUrl(vidId, mediaType) {
  const prefix = mediaType === "tv" ? "tv" : "movie";
  return `/${prefix}/watch?id=${vidId}`;
}
