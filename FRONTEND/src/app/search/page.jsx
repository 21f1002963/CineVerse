"use client"
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import ListingSection from '@/components/section/Listing_section';
import { Skeleton } from '@/components/ui/skeleton';

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (query) {
            setLoading(true);
            setError(null);
            api.get(`/discover/search?query=${query}`)
                .then(res => {
                    const filteredResults = res.data.data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv');
                    setResults(filteredResults);
                    setLoading(false);
                })
                .catch(err => {
                    setError('Failed to fetch search results.');
                    setLoading(false);
                    console.error(err);
                });
        }
    }, [query]);

    if (!query) {
        return <div className="container mx-auto px-4 py-8 text-white">Please enter a search term.</div>;
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-white mb-4">Searching for &quot;{query}&quot;</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[...Array(10)].map((_, i) => <Skeleton key={i} className="h-60 w-full" />)}
                </div>
            </div>
        )
    }

    if (error) {
        return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
    }
    
    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <h1 className="text-2xl font-bold text-white mb-4">Search Results for &quot;{query}&quot;</h1>
            {results.length > 0 ? (
                <ListingSection data={results} />
            ) : (
                <p className="text-white">No results found for &quot;{query}&quot;.</p>
            )}
        </div>
    );
};

export default SearchPage; 