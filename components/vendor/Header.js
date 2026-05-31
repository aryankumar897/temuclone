"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { headerStyles } from "./HeaderStyles";
import SignupModal from "@/components/vendor/Hero/SignupModal";



export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <AppBar position="static" sx={headerStyles.appBar}>
        <Toolbar sx={headerStyles.toolbar}>
          {/* LEFT */}
          <Box sx={headerStyles.leftSection}>
            <Box sx={headerStyles.logoBox}>TEMU</Box>

            <Box>
              <Typography sx={headerStyles.title}>TEMU</Typography>
              <Typography sx={headerStyles.subtitle}>Seller Center</Typography>
            </Box>
          </Box>

          {/* DESKTOP MENU */}
          <Box sx={headerStyles.desktopMenu}>
            <Typography sx={headerStyles.text}>🇺🇸 United States</Typography>
            <Typography sx={headerStyles.text}>EN</Typography>
            <Typography onClick={() => setOpen(true)} sx={headerStyles.text}>
              Sign in
            </Typography>
            <Button sx={headerStyles.signUpBtn}>Sign up</Button>
          </Box>

          {/* MOBILE MENU ICON */}
          <Box sx={headerStyles.mobileMenu}>
            <IconButton onClick={handleOpen} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>

          {/* DROPDOWN MENU */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>🇺🇸 United States</MenuItem>
            <MenuItem onClick={handleClose}>EN</MenuItem>
            <MenuItem onClick={handleClose}>Sign in</MenuItem>
            <MenuItem onClick={handleClose}>Sign up</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

          <SignupModal open={open} handleClose={() => setOpen(false)} />
         
    </>
  );
}
