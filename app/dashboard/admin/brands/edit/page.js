"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import EditBrand from "@/components/dashboard/admin/Brand/Edit/EditBrand";

export default function Page() {
  return (
     <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <EditBrand />
      </Box>
      </Suspense>
  );
}