"use client";

import { Box, Typography } from "@mui/material";
import OrderDetails from "@/components/dashboard/admin/Orders/OrderDetails/OrderDetails";
export default function Page() {
  return (
    <Box p={2}>
      <OrderDetails />
    </Box>
  );
}
