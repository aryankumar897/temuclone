"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import AttributeTable from "@/components/dashboard/admin/Attribute/List/AttributeTable";

export default function Page() {
  return (
          <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <AttributeTable />
      </Box>
      </Suspense>
  );
}
