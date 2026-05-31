"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import TagTable from "@/components/dashboard/admin/Tag/List/TagTable";
export default function Page() {
  return (
          <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <TagTable/>
      </Box>
      </Suspense>
  );
}
