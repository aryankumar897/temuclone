"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import AttributeCreate from "@/components/dashboard/admin/Attribute/Create/AttributeCreate";

export default function Page() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <AttributeCreate />
      </Box>
      </Suspense>
  );
}