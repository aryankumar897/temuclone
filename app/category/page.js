"use client";
export const dynamic = "force-dynamic";
import TopBar from "@/components/topbar/TopBar";

import Header from "@/components/layout/Header/Header";

import CategoryProduct from "@/components/categoryproduct/CategoryProduct";
export default function CategoryPage() {
  return (
    <>
      <TopBar />
      <Header />
      <CategoryProduct />
    </>
  );
}
