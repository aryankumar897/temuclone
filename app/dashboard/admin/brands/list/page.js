"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import BrandTable from "@/components/dashboard/admin/Brand/List/BrandTable";

export default function Page() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <BrandTable />
      </Box>
      </Suspense>
  );
}
