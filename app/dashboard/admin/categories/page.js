"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import CreateCategory from "@/components/dashboard/admin/Categories/Create/CreateCategory";

export default function Page() {
  return (
          <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <CreateCategory />
    </Box>
    </Suspense>
  );
}
