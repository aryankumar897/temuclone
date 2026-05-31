"use client";
import {
  Box,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useState } from "react";
import { useThemeMode } from "@/context/ThemeContext";

export default function TopbarAdmin({ setOpen }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { dark, toggleTheme } = useThemeMode();
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Mobile Menu */}
      <IconButton sx={{ display: { md: "none" } }} onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>

      {/* RIGHT */}
      <Box display="flex" alignItems="center" gap={2} ml="auto">
        <IconButton onClick={toggleTheme}>
          {dark ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <IconButton>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Avatar
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{ bgcolor: "#ff6a00", cursor: "pointer" }}
        >
          A
        </Avatar>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}