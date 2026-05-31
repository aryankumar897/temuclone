"use client";
import { Suspense } from "react";
import { Box, Typography } from "@mui/material";
import AdminOrders from "@/components/dashboard/admin/Orders/AdminOrders";
export default function Page() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <AdminOrders />
      </Box>
      </Suspense>
  );
}
