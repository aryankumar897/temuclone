// app/dashboard/customer/stores/page.jsx
"use client";
import { Box, Typography } from "@mui/material";

export default function StoresPage() {
  return (
    <Box p={3}>
      <Typography variant="h5">Followed Stores</Typography>

      <Typography mt={2}>
        You are not following any stores yet.
      </Typography>
    </Box>
  );
}