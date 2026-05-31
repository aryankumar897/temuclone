"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import CreateProduct from "@/components/dashboard/admin/Products/Create/CreateProduct";

export default function Page() {
  return (
        <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <CreateProduct />
      </Box>
      </Suspense>
  );
}
