"use client";

import { Box } from "@mui/material";
import CouponsCreate from "@/components/dashboard/admin/Coupons/Create/CouponsCreate";

export default function Page() {
  return (
    <Box p={2}>
      <CouponsCreate/>
    </Box>
  );
}