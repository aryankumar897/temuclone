"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import Reviews from "@/components/dashboard/admin/Reviews/Reviews";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <Reviews />
      </Box>
      </Suspense>
  );
}
