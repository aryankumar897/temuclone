"use client";

import { Box } from "@mui/material";
import EditAddresses from "@/components/dashboard/customer/Addresses/Edit/EditAddresses";

export default function Page() {
  return (
    <Box p={2}>
      <EditAddresses/>
    </Box>
  );
}