"use client";

import { Box } from "@mui/material";
import AttributeTable from "@/components/dashboard/admin/Attribute/List/AttributeTable";

export default function Page() {
  return (
    <Box p={2}>
      <AttributeTable />
    </Box>
  );
}
