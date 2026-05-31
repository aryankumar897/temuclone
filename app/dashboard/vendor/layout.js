"use client";
import { Box } from "@mui/material";
import SidebarVendor from "@/components/dashboard/vendor/SidebarVendor";

// ✅ import styles
import styles from "./vendorLayoutStyles";

export default function Layout({ children }) {
  return (
    <Box sx={styles.root}>
      {/* CENTER WRAPPER */}
      <Box sx={styles.wrapper}>
        
        {/* MAIN FLEX LAYOUT */}
        <Box sx={styles.layout}>
          
          {/* Sidebar */}
          <SidebarVendor />

          {/* Content */}
          <Box sx={styles.content}>
            {children}
          </Box>
        </Box>

      </Box>
    </Box>
  );
}