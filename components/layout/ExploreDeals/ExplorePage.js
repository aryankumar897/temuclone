"use client";

import { useState } from "react";
import CategoryExplore from "@/components/layout/CategoryExplore/CategoryExplore";
import ExploreProducts from "./ExploreProducts";

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <CategoryExplore
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <ExploreProducts selectedCategory={selectedCategory} />
    </>
  );
}
