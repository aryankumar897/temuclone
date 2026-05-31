"use client";

import { Box } from "@mui/material";
import CouponsTable from "@/components/dashboard/admin/Coupons/List/CouponsTable";

export default function Page() {
  return (
    <Box p={2}>
      <CouponsTable />
    </Box>
  );
}
