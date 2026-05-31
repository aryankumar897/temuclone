"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import CouponsTable from "@/components/dashboard/admin/Coupons/List/CouponsTable";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box p={2}>
        <CouponsTable />
      </Box>
    </Suspense>
  );
}
