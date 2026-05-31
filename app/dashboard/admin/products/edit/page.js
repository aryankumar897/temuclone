"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import EditProduct from "@/components/dashboard/admin/Products/Edit/EditProduct";

export default function Page() {
  return (
     <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <EditProduct />
      </Box>
      </Suspense>
  );
}
