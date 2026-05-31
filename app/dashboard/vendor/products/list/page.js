"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import ListTable from "@/components/dashboard/vendor/Products/List/ListTable";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box p={2}>
        <ListTable />
      </Box>
    </Suspense>
  );
}
