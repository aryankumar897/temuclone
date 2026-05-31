"use client";

import { Dialog, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedIcon from "@mui/icons-material/Verified";

import styles from "./securityModalstyles";

export default function SecurityModal({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">

      <Box sx={styles.container}>

        {/* CLOSE BUTTON */}
        <IconButton sx={styles.close} onClick={handleClose}>
          <CloseIcon />
        </IconButton>

        {/* ICON */}
        <Box sx={styles.iconWrapper}>
          <VerifiedIcon sx={styles.icon} />
        </Box>

        {/* TITLE */}
        <Typography sx={styles.title}>
          Security reminder
        </Typography>

        {/* DESCRIPTION */}
        <Typography sx={styles.description}>
          Do not click on any links or pay any fees if you receive a message
          claiming to be from USPS about delivery issues due to an incorrect
          address. You should check the status of your package on Temu's order
          page or contact the courier directly. Here are some{" "}
          <span style={{ color: "#ff6a00", cursor: "pointer" }}>
            common fraud cases
          </span>{" "}
          for reference.
        </Typography>

        {/* BUTTON */}
        <Button sx={styles.okBtn} onClick={handleClose}>
          OK
        </Button>

        {/* FOOTER */}
        <Typography sx={styles.footer}>
          If you come across anything suspicious, please report it as soon as
          possible. ›
        </Typography>

      </Box>
    </Dialog>
  );
}