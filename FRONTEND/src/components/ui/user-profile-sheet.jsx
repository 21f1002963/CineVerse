"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "./sheet";
import Image from "next/image";
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { userLoggedOutDetails } from "@/redux/userSlice";
import { api, ENDPOINT } from "@/lib/api";
import { navLinks } from "./header";
import { toast } from "./use-toast";

const UserProfileSheet = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useSelector((state) => state.user);

  const handleClick = async () => {
    try {
      const res = await api.get(ENDPOINT.logout);
      if (res.data.status === "success") {
        dispatch(userLoggedOutDetails());
        router.push("/");
        toast({ title: "Logout successful!" });
      }
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        {!userData.isLoggedIn ? (
          <Image
            src="/profile.avif"
            alt="Profile Icon"
            className="ml-4 h-10 w-10 rounded-full"
            width={40}
            height={40}
          />
        ) : (
          <div className="ml-4 h-10 w-10 rounded-full bg-[#0059A3] text-xl font-semibold flex items-center justify-center">
            {userData.user ? userData.user.name.charAt(0).toUpperCase() : ""}
          </div>
        )}
      </SheetTrigger>
      <SheetContent side={"right"} className="px-6 bg-white/10 backdrop-blur-lg shadow-2xl rounded-l-2xl border-0 min-w-[340px]">
        <SheetTitle className="sr-only">User Profile</SheetTitle>
        <SheetDescription className="sr-only">
          View and manage your user profile, subscription, and settings.
        </SheetDescription>
        <div className="bg-slate-700/40 p-8 flex flex-col items-center gap-3 mt-[50px] rounded-2xl shadow-lg">
          {!userData.isLoggedIn ? (
            <Image
              src="/profile.avif"
              alt="Profile Icon"
              className="h-[120px] w-[120px] rounded-full -mt-[70px] border-4 border-white/30 shadow-xl object-cover"
              width={120}
              height={120}
            />
          ) : (
            <div className="relative h-[120px] w-[120px] rounded-full -mt-[70px] bg-gradient-to-br from-pink-600 via-pink-400 to-pink-700 text-4xl font-extrabold flex items-center justify-center border-4 border-white/30 shadow-xl">
              {userData.user ? userData.user.name.charAt(0).toUpperCase() : ""}
            </div>
          )}
          <p className="text-2xl font-extrabold capitalize text-white mt-2">
            {userData.isLoggedIn ? userData.user?.name : "Guest"}
          </p>
          {!userData.isLoggedIn ? (
            <Link
              href={"/login"}
              className="rounded-full font-semibold mt-4 text-base px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white shadow transition-all"
              onClick={() => {
                setOpen(false);
              }}
            >
              Login
            </Link>
          ) : (
            <div className="flex flex-col gap-2 w-full items-center mt-2">
              <Link
                href="/resetPassword"
                className="text-gray-300 hover:text-pink-400 hover:underline text-sm transition-all"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Reset Password
              </Link>
              <button
                className="rounded-full font-semibold mt-2 text-base px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white shadow transition-all"
                onClick={handleClick}
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="my-6 border-t border-white/20" />
        
        <div className="divide-y divide-white/10 rounded-xl overflow-hidden bg-white/5 shadow">
          {/* <Link
            href={"/subscription"}
            className="flex items-center justify-between px-4 py-4 text-base font-medium text-white hover:bg-pink-600/20 transition-all"
            onClick={() => {
              setOpen(false);
            }}
          >
            Subscribe Now
            <ChevronRightIcon className="w-6 h-6" />
          </Link> */}
          <div>
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.key}
                className="flex items-center justify-between px-4 py-4 text-base font-medium text-white hover:bg-pink-600/20 transition-all"
                onClick={() => {
                  setOpen(false);
                }}
              >
                {link.name}
                <ExternalLinkIcon className="w-4 h-4" />
              </Link>
            ))}
          </div>
          
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserProfileSheet;
