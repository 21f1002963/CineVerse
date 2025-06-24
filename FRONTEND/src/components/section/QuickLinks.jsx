"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const QuickLinks = ({ list }) => {
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    if (list && list.length > 0) {
      setActiveLink(list[0].href);
    }
  }, [list]);

  useEffect(() => {
    if (typeof window === "undefined" || !list || list.length === 0) return;

    const sections = list.map(item => document.getElementById(item.href)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach(section => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach(section => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [list]);

  const handleClick = (href) => {
    setActiveLink(href);
  };

  return (
    <div className="sticky top-[72px] z-10 bg-black/40">
      <div className="p-3 sm:p-4 flex gap-2 sm:gap-4 items-center text-nowrap overflow-x-auto scrollbar-hide">
        {list?.map((item) => (
          <Link
            key={item.href}
            href={`#${item.href}`}
            scroll={true}
            onClick={() => handleClick(item.href)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
              activeLink === item.href
                ? "bg-white text-black"
                : "bg-white/15 text-white hover:bg-white/25"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks; 