"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import TagCreate from "@/components/dashboard/admin/Tag/Create/TagCreate";
export default function Page() {
  return (

        <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <TagCreate />
      </Box>
      </Suspense>
  );
}
