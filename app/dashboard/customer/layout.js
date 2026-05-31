"use client";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Suspense } from "react";
import Sidebar from "@/components/dashboard/customer/Sidebar";
import styles from "./styles";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box sx={styles.wrapper}>
        {/* ✅ MOBILE HEADER (NO OVERLAP NOW) */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            gap: "10px",
            padding: "12px 16px",
            borderBottom: "1px solid #eee",
            backgroundColor: "#fff",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <IconButton onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Typography fontSize="16px" fontWeight={600}>
            My Account
          </Typography>
        </Box>

        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          {/* Desktop Sidebar */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Sidebar />
          </Box>

          {/* Mobile Sidebar */}
          <Drawer open={open} onClose={() => setOpen(false)}>
            <Sidebar setOpen={setOpen} />
          </Drawer>

          {/* Right Content */}
          <Box sx={{ flex: 1 }}>{children}</Box>
        </Box>
      </Box>
    </Suspense>
  );
}
