"use client";

import { Box, Typography } from "@mui/material";
import AdminOrders from "@/components/dashboard/admin/Orders/AdminOrders";
export default function Page() {
  return (
    <Box p={2}>
      <AdminOrders />
    </Box>
  );
}
