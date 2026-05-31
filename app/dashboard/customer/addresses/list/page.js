"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import AddressesTable from "@/components/dashboard/customer/Addresses/List/AddressesTable";

export default function Page() {
  return (
        <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <AddressesTable />
      </Box>
      </Suspense>
  );
}
