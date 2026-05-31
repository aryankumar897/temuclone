"use client";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InventoryIcon from "@mui/icons-material/Inventory";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import RateReviewIcon from "@mui/icons-material/RateReview";
import PersonIcon from "@mui/icons-material/Person";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StoreIcon from "@mui/icons-material/Store";
import HistoryIcon from "@mui/icons-material/History";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LogoutIcon from "@mui/icons-material/Logout";
import LockIcon from "@mui/icons-material/Lock"; // ✅ added

import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { sidebarStyles } from "./sidebarStyles";

import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const BASE = "/dashboard/customer";

export default function Sidebar({ setOpen }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeTab = searchParams.get("tab") || "delivered";

  const go = (path) => {
    router.push(path);
    setOpen?.(false);
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });
    toast.success("logout successfully");
  };

  const orderTabs = [
    {
      label: "All orders",
      key: "all",
      icon: <InventoryIcon fontSize="small" />,
    },
    {
      label: "Processing",
      key: "processing",
      icon: <AutorenewIcon fontSize="small" />,
    },
    {
      label: "Shipped",
      key: "shipped",
      icon: <LocalShippingIcon fontSize="small" />,
    },
    {
      label: "Delivered",
      key: "delivered",
      icon: <DoneAllIcon fontSize="small" />,
    },
    {
      label: "Returns",
      key: "returns",
      icon: <AutorenewIcon fontSize="small" />,
    },
  ];

  return (
    <Box sx={sidebarStyles.container}>

      {/* ================= HOME PAGE ================= */}

<Box
  sx={{
    ...sidebarStyles.linkItem,

    mt: 1,
  }}
  onClick={() => go("/")}
>
  <StoreIcon fontSize="small" /> Go to Home
</Box>
      {/* ================= ORDERS ================= */}
      <Accordion defaultExpanded sx={sidebarStyles.accordionRoot}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={sidebarStyles.sectionTitle}>
            <ShoppingBagIcon fontSize="small" /> Your orders
          </Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ p: 0 }}>
          {orderTabs.map((item) => {
            const isActive =
              pathname === BASE &&
              (activeTab === item.key ||
                (item.key === "all" && !searchParams.get("tab")));

            return (
              <Box
                key={item.key}
                onClick={() => go(`${BASE}?tab=${item.key}`)}
                sx={{
                  ...sidebarStyles.menuItem,
                  ...(isActive ? sidebarStyles.activeItem : {}),
                }}
              >
                {item.icon}
                {item.label}
              </Box>
            );
          })}
        </AccordionDetails>
      </Accordion>

      {/* ================= OTHER LINKS ================= */}
      <Box>
        <Box
          sx={{
            ...sidebarStyles.linkItem,
            ...(pathname === `${BASE}/reviews` ? sidebarStyles.activeItem : {}),
          }}
          onClick={() => go(`${BASE}/reviews`)}
        >
          <RateReviewIcon fontSize="small" /> Your reviews
        </Box>

        <Box
          sx={{
            ...sidebarStyles.linkItem,
            ...(pathname === `${BASE}/profile` ? sidebarStyles.activeItem : {}),
          }}
          onClick={() => go(`${BASE}/profile`)}
        >
          <PersonIcon fontSize="small" /> Your profile
        </Box>

        {/* ✅ CHANGE PASSWORD */}
        <Box
          sx={{
            ...sidebarStyles.linkItem,
            ...(pathname === `${BASE}/change-password`
              ? sidebarStyles.activeItem
              : {}),
          }}
          onClick={() => go(`${BASE}/change-password`)}
        >
          <LockIcon fontSize="small" /> Change password
        </Box>

        <Box
          sx={{
            ...sidebarStyles.linkItem,
            ...(pathname === `${BASE}/coupons` ? sidebarStyles.activeItem : {}),
          }}
          onClick={() => go(`${BASE}/coupons`)}
        >
          <LocalOfferIcon fontSize="small" /> Coupons & offers
        </Box>

        <Box
          sx={{
            ...sidebarStyles.linkItem,
            ...(pathname === `${BASE}/credit` ? sidebarStyles.activeItem : {}),
          }}
          onClick={() => go(`${BASE}/credit`)}
        >
          <AccountBalanceWalletIcon fontSize="small" /> Credit balance
        </Box>

        <Box
          sx={{
            ...sidebarStyles.linkItem,
            ...(pathname === `${BASE}/stores` ? sidebarStyles.activeItem : {}),
          }}
          onClick={() => go(`${BASE}/stores`)}
        >
          <StoreIcon fontSize="small" /> Followed stores
        </Box>

        <Box
          sx={{
            ...sidebarStyles.linkItem,
            ...(pathname === `${BASE}/history` ? sidebarStyles.activeItem : {}),
          }}
          onClick={() => go(`${BASE}/history`)}
        >
          <HistoryIcon fontSize="small" /> Browsing history
        </Box>

        <Box
          sx={{
            ...sidebarStyles.linkItem,
            ...(pathname === `${BASE}/addresses`
              ? sidebarStyles.activeItem
              : {}),
          }}
          onClick={() => go(`${BASE}/addresses/list`)}
        >
          <LocationOnIcon fontSize="small" /> Addresses
        </Box>

        {/* ================= LOGOUT ================= */}
        <Box
          sx={{
            ...sidebarStyles.linkItem,
            color: "red",
            mt: 1,
          }}
          onClick={handleLogout}
        >
          <LogoutIcon fontSize="small" /> Logout
        </Box>
      </Box>
    </Box>
  );
}
