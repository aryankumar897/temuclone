"use client";

import { Box } from "@mui/material";
import AddressesCreate from "@/components/dashboard/customer/Addresses/Create/AddressesCreate";

export default function Page() {
  return (
    <Box p={2}>
      <AddressesCreate />
    </Box>
  );
}
