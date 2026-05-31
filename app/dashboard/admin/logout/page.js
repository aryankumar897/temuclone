"use client";
import { Suspense } from "react";
import { Box, Typography } from "@mui/material";
import LogOut from "@/components/dashboard/admin/LogOut/Logout";
export default function Page() {
  return (
       <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <LogOut/>
      </Box>
      </Suspense>
  );
}
