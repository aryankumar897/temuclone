"use client";

import { Box } from "@mui/material";
import CreateVariant from "@/components/dashboard/vendor/Products/Variants/CreateVariant";
import { Suspense } from "react";
export default function Page() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <CreateVariant />
      </Box>
      </Suspense>
  );
}
