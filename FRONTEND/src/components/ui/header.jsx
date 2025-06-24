"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import UserProfileSheet from "./user-profile-sheet";
import { useSelector } from "react-redux";
import { useState } from "react";

export const navLinks = [
  { name: "Home", key: "", href: "/" },
  { name: "Movies", key: "movies", href: "/movies" },
  { name: "Tv Shows", key: "tv", href: "/tv" },
  { name: "Watchlist", key: "watchlist", href: "/watchlist" },
  // { name: "Jio+", key: "jio+", href: "/jio+" },
];

const Header = () => {
  const path = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const activeTabKey = path.split("/")?.[1];
  const userData = useSelector((state) => state.user);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${searchQuery.trim()}`);
    }
  };

  return (
    <header className="bg-[#0d0e10] py-4 w-full fixed top-0 z-50  border-b-2 border-b-grey">
      <div className="lg:mx-auto mx-2 lg:px-4 flex items-center text-nowrap mr-4">
        <div className="flex items-center">
          <Link href="/" className="mr-4">
            <Image
              src="/logo.svg"
              alt="JioCinema Logo"
              width={136}
              height={36}
              className="md:h-9 md:max-w-[136px] max-w-24"
            />
          </Link>
          {/* <Link
            href="/subscription"
            className="ml-4 mr-4 md:px-4 px-4 py-1 font-medium rounded-3xl flex items-center gap-2 text-[#c1a362] border-[#c1a362] border text-sm md:text-base"
          > */}
            {/* <Image src="/crown.svg" height={16} width={16} alt="crown" />
            <span className="pr-4">
              {userData?.user?.isPremium ? "" : "Go "}Premium
            </span>
          </Link> */}
        </div>
        <nav className="lg:flex lg:space-x-4 space-x-0 hidden">
          {navLinks?.map((tab) => (
            <Link
              href={tab.href}
              key={tab.key}
              className={`px-1 py-2 font-medium text-[#b6b8b8] hover:text-white ${
                activeTabKey === tab.key
                  ? "border-b-2 border-pink-500 text-white"
                  : ""
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end w-full">
          <form
            onSubmit={handleSearch}
            className="rounded-3xl border lg:flex justify-center items-center px-4 gap-2 hidden"
          >
            <Image src="/search.svg" alt="search icon" height={20} width={20} />
            <input
              type="text"
              placeholder="Search..."
              className=" py-2 bg-transparent  text-white font-medium focus:outline-none text-sm max-w-[150px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <UserProfileSheet />
        </div>
      </div>
    </header>
  );
};

export default Header;
