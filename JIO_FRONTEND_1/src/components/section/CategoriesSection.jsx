import React, { Suspense } from "react";
import CategoryList, { CategoryListFallback } from "./CategoryList";

const CategorySection = ({ title, id, fetcher }) => {
  return (
    <div className="py-8 px-6">
      <h2 id={id} className="text-2xl font-medium mb-6 scroll-m-[100px]">
        {title}
      </h2>
      <Suspense fallback={<CategoryListFallback />}>
        <CategoryList fetcher={fetcher} />
      </Suspense>
    </div>
  );
};

export default CategorySection;
