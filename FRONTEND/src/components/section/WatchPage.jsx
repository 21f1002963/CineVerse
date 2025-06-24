"use client"
import React from 'react';
import { FilmIcon } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import WishlistButton from '../ui/wishlist-button';
import ShareButton from '../ui/share-button';
import { useSearchParams } from 'next/navigation';

const WatchPage = ({ details, media_type }) => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <main className="flex-1">
                <section className="w-full h-[50vh] md:h-[70vh] lg:h-[80vh] bg-muted">
                    {details && details?.key ? <iframe
                        title={details.name}
                        src={`https://www.youtube-nocookie.com/embed/${details.key}?autoplay=1&modestbranding=1&rel=0`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe> : <VideoUnavailable />}
                </section>
                <section className="container mx-auto py-8 px-4 md:px-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl md:text-4xl font-bold">{details?.title || details?.name}</h1>
                        <div className="flex items-center gap-4">
                            <WishlistButton media_type={media_type} id={id} />
                            <ShareButton />
                        </div>
                    </div>
                    <p className="text-muted-foreground text-lg mb-8">
                        {details?.overview}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Details</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="font-bold">Release Date:</span>
                                    <span className="text-muted-foreground ml-2">{details?.release_date}</span>
                                </div>
                                <div>
                                    <span className="font-bold">Runtime:</span>
                                    <span className="text-muted-foreground ml-2">{details?.runtime} min</span>
                                </div>
                                <div>
                                    <span className="font-bold">Genres:</span>
                                    <span className="text-muted-foreground ml-2">
                                        {details?.genres?.map(genre => genre.name).join(', ')}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-bold">Language:</span>
                                    <span className="text-muted-foreground ml-2">{details?.original_language}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

const VideoUnavailable = () => {
    return (
        <div className='w-full h-full flex flex-col gap-4 items-center justify-center text-slate-500'>
            <FilmIcon className="w-20 h-20" />
            <p>This video is currently unavailable.</p>
            <Link href={'/'} className={buttonVariants({
                variant: "outline"
            })}>Go Home</Link>
        </div>
    );
};

export default WatchPage; 