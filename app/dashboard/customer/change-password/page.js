"use client";
import { Suspense } from "react";
import {Box} from "@mui/material";
import ChangePassword  from "@/components/dashboard/customer/ChangePassword/ChangePassword";
export default function Page() {
  return (
        <Suspense fallback={<div>Loading...</div>}>
    <Box p={2}>
      <ChangePassword />
      </Box>
      </Suspense>
  );
}
