"use client";
import { Suspense } from "react";
import { Box, Typography } from "@mui/material";
import OrderDetails from "@/components/dashboard/admin/Orders/OrderDetails/OrderDetails";
export default function Page() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <OrderDetails />
      </Box>
      </Suspense>
  );
}
