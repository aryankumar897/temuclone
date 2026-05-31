"use client";
import { Suspense } from "react";
import TopBar from "@/components/topbar/TopBar";

import Header from "@/components/layout/Header/Header";

import CategoryProduct from "@/components/categoryproduct/CategoryProduct";
export default function CategoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TopBar />
      <Header />
      <CategoryProduct />
    </Suspense>
  );
}
