"use client";

import { Box } from "@mui/material";
import AttributeCreate from "@/components/dashboard/admin/Attribute/Create/AttributeCreate";

export default function Page() {
  return (
    <Box p={2}>
      <AttributeCreate />
    </Box>
  );
}