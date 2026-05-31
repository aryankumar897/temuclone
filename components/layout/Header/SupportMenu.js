"use client";

import { Box, Typography } from "@mui/material";

import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import styles from "./supportMenuStyles";

const menuItems = [
  {
    icon: <HeadsetMicOutlinedIcon fontSize="small" />,
    text: "Support center",
    link: "/support",
  },
  {
    icon: <ShieldOutlinedIcon fontSize="small" />,
    text: "Safety center",
    link: "/safety",
  },
  {
    icon: <ChatBubbleOutlineOutlinedIcon fontSize="small" />,
    text: "Chat with Temu",
    link: "/chat",
  },
  {
    icon: <VerifiedUserOutlinedIcon fontSize="small" />,
    text: "Temu purchase protection",
    link: "/protection",
  },
  {
    icon: <LockOutlinedIcon fontSize="small" />,
    text: "Privacy policy",
    link: "/privacy",
  },
  {
    icon: <DescriptionOutlinedIcon fontSize="small" />,
    text: "Terms of use",
    link: "/terms",
  },
];

export default function SupportMenu() {
  return (
    <Box sx={styles.menuWrapper}>
      {/* Triangle Arrow */}
      <Box sx={styles.arrow}></Box>

      {/* Menu */}
      <Box sx={styles.menu}>
        {menuItems.map((item, index) => (
          <Box
            key={index}
            component="a"
            href={item.link}
            sx={styles.menuItem}
          >
            {item.icon}

            <Typography sx={styles.text}>{item.text}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}