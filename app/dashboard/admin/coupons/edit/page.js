"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import CouponsEdit from "@/components/dashboard/admin/Coupons/Edit/CouponsEdit";

export default function Page() {
  return (
          <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <CouponsEdit />
      </Box>
      </Suspense>
  );
}
