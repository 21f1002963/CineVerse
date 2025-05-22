import {Search} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../components/ui/button';

export default function Header() {
    return (
        <header className="bg-black flex items-center justify-between p-4">
            <div className='flex items-center space-x-4 lg:space-x-6'>
            <Link href="/" className='flex items-center space-x-2'>
                 <Image 
                 src="" 
                 alt="JioCinema Logo" 
                 width={40} 
                 height={40} 
                 className='w-10 h-10'/>
                 <span className='text-xl font-bold text-pink-500'>JioCinema</span>
            </Link>
            <Button
             variant='outline'
             className='hidden sm:inline-flex bg-transparent text-yellow-500 border-yellow-500 border-2 px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-black'>
                Go Premium  
            </Button>
            </div>
            <nav className='hidden md:flex items-center space-x-4 lg:space-x-6'>
                <Link href='/' className='text-white hover:text-gray-300'>Home</Link>
                <Link href='/movies' className='text-white hover:text-gray-300'>Movies</Link>
                <Link href='/tv-shows' className='text-white hover:text-gray-300'>TV Shows</Link>
                <Link href='/watchlist' className='text-pink-500'>
                Watchlist</Link>
                <Link href='/jio-plus' className='text-white hover:text-gray-300'>Jio+ </Link>
            </nav>
            <div className='flex items-center space-x-4'>
                <form className='relative hidden sm:block'>
                    <Search className='absolute left-2 top-1/2 transform-translate-y-1/2 text-gray-400'></Search>
                    <Input type='search' className='bg-gray-800  border-gray-700 text-white pl-8 focus:border-pink-500' placeholder='Search for Movies, TV Shows, Actors'/>    
                </form>  
                <Button size="icon"
                variant="ghost" className="rounded-full"
                >
                    <Image
                    src=""
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className='rounded-full'></Image>
                    <span className='sr-only'>User menu</span>
                </Button> 
            </div>
        </header>
    );
}