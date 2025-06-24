import Link from "next/link";
import React, { Suspense } from "react";
import BannerSection, { BannerSectionFallback } from "./BannerSection";
import CategorySection from "./CategoriesSection";
import QuickLinks from "./QuickLinks";

const ListingSection = ({ bannerData, list }) => {
  return (
    <section>
      {/* Quick links chips  */}
      <QuickLinks list={list} />

      {/* Banner/Hero Section  */}
      <div className="mt-2">
        <Suspense fallback={<BannerSectionFallback />}>
          <BannerSection data={bannerData} />
        </Suspense>
      </div>
      {/* Category Section */}
      {list?.map((item) => (
        <CategorySection
          key={item.label}
          id={item.href}
          title={item.label}
          data={item.data}
        />
      ))}
    </section>
  );
};

export default ListingSection;
