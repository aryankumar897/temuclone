"use client";
import { Suspense } from "react";
import { Box } from "@mui/material";
import ProfileUpdate from "@/components/dashboard/customer/Profile/Profile"
export default function Page() {
  return (
     <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <ProfileUpdate/>
      </Box>
      </Suspense>
  );
}
