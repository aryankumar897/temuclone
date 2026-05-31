"use client";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { useSession } from "next-auth/react";
import styles from "./accountMenuStyles";

export default function AccountMenu() {
const { data: session, status } = useSession();
  const router = useRouter();

const userName =
  session?.user?.name || session?.user?.email || "User";

const userEmail = session?.user?.email || "";

const getMaskedName = () => {
  if (!userEmail) return "User";
  return userEmail.slice(0, 2) + "***" + userEmail.slice(-2);
};


  const menuItems = [
    {
      label: "Your orders",
      icon: <ReceiptLongOutlinedIcon fontSize="small" />,
      link: "/orders",
    },
    {
      label: "Your reviews",
      icon: <RateReviewOutlinedIcon fontSize="small" />,
      link: "/reviews",
    },
    {
      label: "Your profile",
      icon: <PersonOutlineIcon fontSize="small" />,
      link: "/profile",
    },
    {
      label: "Coupons & offers",
      icon: <ConfirmationNumberOutlinedIcon fontSize="small" />,
      link: "/coupons",
    },
    {
      label: "Credit balance",
      icon: <AccountBalanceWalletOutlinedIcon fontSize="small" />,
      link: "/credit",
    },
    {
      label: "Followed stores",
      icon: <StorefrontOutlinedIcon fontSize="small" />,
      link: "/stores",
    },
  ];

  return (
    <Box sx={styles.menuWrapper}>
      <Box sx={styles.arrow} />

      <Box sx={styles.menu}>
        {/* PROFILE */}
        <Box sx={styles.profileSection}>
         

{session?.user?.image ? (
  <Box component="img" src={session.user.image} sx={styles.avatar} />
) : (
  <Box sx={styles.avatar}></Box>
)}

          <Typography>{getMaskedName()}</Typography>
        </Box>

        {/* VERIFY EMAIL CARD */}
        <Box sx={styles.emailCard}>
          <Box sx={styles.emailHeader}>
            Verify Your Email for Security
          </Box>

          <Box sx={styles.emailContent}>
            Verify your email <br />
            <span style={{ color: "#ff6600" }}>
            {userEmail}
            </span>{" "}
            to add an extra layer of security.

            <Box
              sx={{
                ...styles.verifyBtn,
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => router.push("/verify-email")}
            >
              Verify now
            </Box>

            <Box
              sx={{
                ...styles.editBtn,
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => router.push("/edit-email")}
            >
              Edit your email
            </Box>
          </Box>
        </Box>

        {/* MENU ITEMS */}
        {menuItems.map((item, i) => (
          <Box
            key={i}
            onClick={() => router.push(item.link)}
            sx={{
              ...styles.menuItem,
              "&:hover .menuText": {
                textDecoration: "underline",
              },
            }}
          >
            {item.icon}

            <Typography className="menuText">
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}