"use client";
import TopBar from "@/components/topbar/TopBar";
import TemuBanner from "@/components/temuBanner/TemuBanner";
import Header from "@/components/layout/Header/Header";

import PaymentBanner from "@/components/layout/PaymentBanner/PaymentBanner";
import DealsSection from "@/components/layout/DealsSection/DealsSection";

import ExploreDeals from "@/components/layout/ExploreDeals/ExploreProducts";

import CategoryExplore from "@/components/layout/CategoryExplore/CategoryExplore";
import  ExplorPage from "@/components/layout/ExploreDeals/ExplorePage"
import Footer from "@/components/layout/footer/Footer";

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <TemuBanner />
      <DealsSection />

      <PaymentBanner />

      {/* <CategoryExplore /> */}
      {/* <ExploreDeals /> */}
      <ExplorPage/>
      <Footer />
    </>
  );
}
