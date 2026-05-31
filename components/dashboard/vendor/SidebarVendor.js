"use client";

import {
  Box,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SettingsIcon from "@mui/icons-material/Settings";
import VerifiedIcon from "@mui/icons-material/Verified";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { sidebarStyles } from "./vendorSidebarStyles";
import { useSession } from "next-auth/react";

const BASE = "/dashboard/vendor";

const counts = {
  products: 12,
  orders: 8,
  pending: 3,
  reviews: 5,
};

export default function SidebarVendor() {
  const { data: session } = useSession();

  // 🔥 KYC CHECK
  const isKycApproved = session?.user?.kyc_verification_status === "approved";

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [collapsed, setCollapsed] = useState(false);

  const go = (path) => router.push(path);

  const isActive = (path) => {
    if (path.includes("?")) {
      const [basePath, query] = path.split("?");
      return pathname === basePath && searchParams.toString() === query;
    }
    return pathname === path;
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });

    toast.success("logout successfully");
  };

  const renderItem = (icon, label, path, count) => {
    const active = isActive(path);

    return (
      <Tooltip title={collapsed ? label : ""} placement="right" arrow>
        <Box
          onClick={() => go(path)}
          sx={sidebarStyles.item(active, collapsed)}
        >
          <Box sx={sidebarStyles.label}>
            {icon}
            {!collapsed && label}
          </Box>

          {!collapsed && count !== undefined && (
            <Box sx={sidebarStyles.count}>{count}</Box>
          )}
        </Box>
      </Tooltip>
    );
  };

  return (
    <>
      <Box sx={sidebarStyles.container(collapsed)}>
        {/* HEADER */}
        <Box sx={sidebarStyles.toggleWrapper(collapsed)}>
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            sx={sidebarStyles.toggleBtn(collapsed)}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* SCROLL AREA */}
        <Box sx={sidebarStyles.scrollArea}>
          {renderItem(<DashboardIcon />, "Dashboard", BASE)}

          {/* PRODUCTS */}
          {!collapsed && (
            <Accordion defaultExpanded sx={sidebarStyles.accordionRoot}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={sidebarStyles.sectionTitle}>
                  <InventoryIcon fontSize="small" /> Products
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ p: 0 }}>
                {renderItem(
                  <InventoryIcon />,
                  "All Products",
                  `${BASE}/products/list`,
                  counts.products,
                )}

                {/* 🔥 KYC CONDITION APPLIED HERE */}
                {isKycApproved ? (
                  renderItem(
                    <InventoryIcon />,
                    "Add Product",
                    `${BASE}/products/create`,
                  )
                ) : (
                  <Tooltip
                    title="Complete KYC to add product"
                    placement="right"
                    arrow
                  >
                    <Box
                      sx={{
                        ...sidebarStyles.item(false, collapsed),
                        opacity: 0.5,
                        cursor: "not-allowed",
                      }}
                    >
                      <Box sx={sidebarStyles.label}>
                        <InventoryIcon />
                        {!collapsed && "Add Product"}
                      </Box>
                    </Box>
                  </Tooltip>
                )}
              </AccordionDetails>
            </Accordion>
          )}

          {/* ORDERS */}
          {!collapsed && (
            <Accordion defaultExpanded sx={sidebarStyles.accordionRoot}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={sidebarStyles.sectionTitle}>
                  <ShoppingCartIcon fontSize="small" /> Orders
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ p: 0 }}>
                {renderItem(
                  <ShoppingCartIcon />,
                  "All Orders",
                  `${BASE}/orders`,
                  counts.orders,
                )}

                {renderItem(
                  <ShoppingCartIcon />,
                  "Pending",
                  `${BASE}/orders?status=pending`,
                  counts.pending,
                )}
              </AccordionDetails>
            </Accordion>
          )}

          {/* PROFILE */}
          {renderItem(<PersonIcon />, "Profile", `${BASE}/profile`)}

          {renderItem(<StoreIcon />, "Vendor Profile", `${BASE}/store`)}

          {/* OTHER */}
          {renderItem(<AnalyticsIcon />, "Analytics", `${BASE}/analytics`)}

          {renderItem(
            <RateReviewIcon />,
            "Reviews",
            `${BASE}/reviews`,
            counts.reviews,
          )}

          {renderItem(<VerifiedIcon />, "Kyc", `${BASE}/kyc`)}

          {renderItem(<SettingsIcon />, "Address", `${BASE}/address`)}

          {renderItem(
            <LockIcon />,
            "Change Password",
            `${BASE}/change-password`,
          )}

          {/* LOGOUT */}
          <Tooltip title={collapsed ? "Logout" : ""} placement="right" arrow>
            <Box
              onClick={handleLogout}
              sx={sidebarStyles.item(false, collapsed)}
            >
              <Box sx={sidebarStyles.label}>
                <LogoutIcon />
                {!collapsed && "Logout"}
              </Box>
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
}
