"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import EditTag from "@/components/dashboard/admin/Tag/Edit/EditTag";
export default function Page() {
  return (
       <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <EditTag/>
      </Box>
      </Suspense>
  );
}
