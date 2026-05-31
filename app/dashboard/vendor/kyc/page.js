"use client";
import { Suspense } from "react";
import { Box, Typography } from "@mui/material";

import Kyc from "@/components/dashboard/vendor/Kyc/Kyc";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box p={2}>
        <Kyc />
      </Box>
    </Suspense>
  );
}
