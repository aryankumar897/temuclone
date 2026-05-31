// app/dashboard/customer/credit/page.jsx
"use client";
import { Box, Typography } from "@mui/material";

export default function CreditPage() {
  return (
    <Box p={3}>
      <Typography variant="h5">Credit Balance</Typography>

      <Typography mt={2}>₹0.00</Typography>
    </Box>
  );
}