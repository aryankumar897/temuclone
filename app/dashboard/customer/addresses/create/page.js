"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import AddressesCreate from "@/components/dashboard/customer/Addresses/Create/AddressesCreate";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box p={2}>
        <AddressesCreate />
      </Box>
    </Suspense>
  );
}
