"use client";

import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import { menuGroups } from "./adminMenuGroups";

import DashboardIcon from "@mui/icons-material/Dashboard";

import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

import { sidebarStyles } from "./adminSidebarStyles";

const BASE = "/dashboard/admin";

export default function SidebarAdmin({ setOpen }) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  const [collapsed, setCollapsed] = useState(false);

  const go = (path) => {
    router.push(path);
    setOpen?.(false);
  };

  // ✅ ACTIVE GROUP CHECK
  const isActiveGroup = (paths) =>
    paths.some((p) => pathname.includes(`/${p}`));

  // ✅ MENU GROUP CONFIG (SCALABLE 🔥)

  return (
    <Box sx={sidebarStyles.container(collapsed, theme)}>
      {/* LOGO */}
      <Box sx={sidebarStyles.logo}>{!collapsed ? "🛍️ Temu Admin" : "🛍️"}</Box>

      {/* TOGGLE */}
      <Box sx={sidebarStyles.toggle}>
        <IconButton onClick={() => setCollapsed(!collapsed)}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* DASHBOARD */}
      <Tooltip title={collapsed ? "Dashboard" : ""}>
        <Box
          sx={sidebarStyles.item(pathname === BASE, collapsed, theme)}
          onClick={() => go(BASE)}
        >
          <DashboardIcon />
          {!collapsed && "Dashboard"}
        </Box>
      </Tooltip>

      {/* ================= DYNAMIC ACCORDIONS ================= */}
      {!collapsed &&
        menuGroups.map((group) => {
          const active = isActiveGroup(group.paths);

          return (
            <Accordion
              key={group.title}
              defaultExpanded={active}
              sx={sidebarStyles.accordion(active)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={sidebarStyles.accordionSummary}
              >
                <Box sx={sidebarStyles.accordionHeaderItem(active, theme)}>
                  {group.icon}
                  {group.title}
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={sidebarStyles.accordionDetails}>
                {group.items.map((item) => (
                  <Box
                    key={item.path}
                    sx={sidebarStyles.item(
                      pathname.includes(item.path),
                      false,
                      theme,
                    )}
                    onClick={() => go(`${BASE}/${item.path}`)}
                  >
                    {item.icon} {item.label}
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          );
        })}

      {/* ================= SINGLE MENU ITEMS ================= */}

      {/* <Box
        sx={sidebarStyles.item(
          pathname.includes("/products"),
          collapsed,
          theme,
        )}
        onClick={() => go(`${BASE}/products`)}
      >
        <InventoryIcon />
        {!collapsed && "Products"}
      </Box> */}

      <Box
        sx={sidebarStyles.item(pathname.includes("/orders"), collapsed, theme)}
        onClick={() => go(`${BASE}/orders`)}
      >
        <ShoppingCartIcon />
        {!collapsed && "Orders"}
      </Box>

      <Box
        sx={sidebarStyles.item(pathname.includes("/reviews"), collapsed, theme)}
        onClick={() => go(`${BASE}/reviews`)}
      >
        <ReviewsIcon />
        {!collapsed && "Reviews"}
      </Box>

    

    

      {/* ================= USER ACTIONS ================= */}
      <Box
        sx={{
          mt: "auto",
          borderTop: "1px solid #eee",
          pt: 2,
        }}
      >
        {/* Profile */}
        <Tooltip title={collapsed ? "Profile" : ""}>
          <Box
            sx={sidebarStyles.item(
              pathname.includes("/profile"),
              collapsed,
              theme,
            )}
            onClick={() => go(`${BASE}/profile`)}
          >
            <PersonIcon />
            {!collapsed && "Profile"}
          </Box>
        </Tooltip>

        {/* Change Password */}
        <Tooltip title={collapsed ? "Change Password" : ""}>
          <Box
            sx={sidebarStyles.item(
              pathname.includes("/change-password"),
              collapsed,
              theme,
            )}
            onClick={() => go(`${BASE}/change-password`)}
          >
            <LockIcon />
            {!collapsed && "Change Password"}
          </Box>
        </Tooltip>

        {/* Logout */}
        <Tooltip title={collapsed ? "Logout" : ""}>
          <Box
            sx={sidebarStyles.item(false, collapsed, theme)}
            //  onClick={handleLogout}
            onClick={() => go(`${BASE}/logout`)}
          >
            <LogoutIcon />
            {!collapsed && "Logout"}
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
}
