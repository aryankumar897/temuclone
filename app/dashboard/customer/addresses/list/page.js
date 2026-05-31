"use client";

import { Box } from "@mui/material";
import AddressesTable from "@/components/dashboard/customer/Addresses/List/AddressesTable";

export default function Page() {
  return (
    <Box p={2}>
      <AddressesTable />
    </Box>
  );
}
