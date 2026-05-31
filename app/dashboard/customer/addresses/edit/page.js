"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import EditAddresses from "@/components/dashboard/customer/Addresses/Edit/EditAddresses";

export default function Page() {
  return (
     <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <EditAddresses/>
      </Box>
      </Suspense>
  );
}