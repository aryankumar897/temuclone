"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import AttributeEdit from "@/components/dashboard/admin/Attribute/Edit/AttributeEdit";

export default function Page() {
  return (
          <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <AttributeEdit />
      </Box>
      </Suspense>
  );
}