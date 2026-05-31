"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import BrandCreate from "@/components/dashboard/admin/Brand/Create/BrandCreate";

export default function Page() {
  return (
     <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <BrandCreate />
      </Box>
      </Suspense>
  );
}