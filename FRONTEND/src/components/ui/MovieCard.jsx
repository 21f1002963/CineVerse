"use client";
import Image from 'next/image';
import Link from 'next/link';
import { media } from '@/lib/api';
import { getWatchUrl } from '@/lib/utils';

const MovieCard = ({ data }) => {
    if (!data || !data.poster_path) {
        return null; 
    }

    return (
        <Link href={getWatchUrl(data.id, data.media_type)}>
            <div className="rounded-lg overflow-hidden transform transition-transform hover:scale-105 relative">
                <Image
                    src={media(data.poster_path)}
                    alt={data.title || data.name || ''}
                    width={500}
                    height={750}
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4 opacity-0 hover:opacity-100 transition-opacity">
                    <h3 className="text-white text-lg font-bold">{data.title || data.name}</h3>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard; 