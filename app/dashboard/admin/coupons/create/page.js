"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import CouponsCreate from "@/components/dashboard/admin/Coupons/Create/CouponsCreate";

export default function Page() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <CouponsCreate/>
      </Box>
      </Suspense>
  );
}