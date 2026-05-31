// app/dashboard/customer/coupons/page.jsx
"use client";
import { Box, Typography, Paper } from "@mui/material";

export default function CouponsPage() {
  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Coupons & Offers
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Typography>No coupons available right now.</Typography>
      </Paper>
    </Box>
  );
}