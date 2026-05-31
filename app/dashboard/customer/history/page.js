// app/dashboard/customer/history/page.jsx
"use client";
import { Box, Typography } from "@mui/material";

export default function HistoryPage() {
  return (
    <Box p={3}>
      <Typography variant="h5">Browsing History</Typography>

      <Typography mt={2}>
        No browsing history found.
      </Typography>
    </Box>
  );
}