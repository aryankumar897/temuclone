"use client";

import { Box } from "@mui/material";
import CreateCategory from "@/components/dashboard/admin/Categories/Create/CreateCategory";

export default function Page() {
  return (
    <Box p={2}>
      <CreateCategory />
    </Box>
  );
}
