"use client";
import { Box, Drawer, useTheme } from "@mui/material";
import { useState } from "react";

import SidebarAdmin from "@/components/dashboard/admin/SidebarAdmin";
import TopbarAdmin from "@/components/dashboard/admin/TopbarAdmin";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {/* Desktop Sidebar */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <SidebarAdmin />
      </Box>

      {/* Mobile Drawer */}
      <Drawer open={open} onClose={() => setOpen(false)}>
        <SidebarAdmin setOpen={setOpen} />
      </Drawer>

      {/* Right */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopbarAdmin setOpen={setOpen} />
        <Box p={{ xs: 1.5, md: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
}