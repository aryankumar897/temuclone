"use client";

import { Suspense } from "react";
import { Box } from "@mui/material";
import VendorProfile from "@/components/dashboard/vendor/VendorProfile/Profile";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box p={2}>
        <VendorProfile />
      </Box>
    </Suspense>
  );
}
