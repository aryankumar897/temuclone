"use client";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SecurityModal from "./SecurityModal";
import styles from "./temuBannerstyles";

export default function TemuBanner() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={styles.wrapper}>
        {/* TOP GREEN BAR */}
        <Box sx={styles.topBar}>
          {/* LEFT */}
          <Box sx={styles.left}>
            <VerifiedOutlinedIcon sx={styles.icon} />
            <Typography sx={styles.title}>Why choose Temu?</Typography>
          </Box>

          {/* RIGHT ITEMS */}
          <Box sx={styles.rightItems}>
            <Box sx={styles.feature}>
              <SecurityOutlinedIcon sx={styles.icon} />
              <Typography sx={styles.featureText}>Secure privacy</Typography>
            </Box>

            <Box sx={styles.divider} />

            <Box sx={styles.feature}>
              <CreditCardOutlinedIcon sx={styles.icon} />
              <Typography sx={styles.featureText}>Safe payments</Typography>
            </Box>

            <Box sx={styles.divider} />

            <Box sx={styles.feature}>
              <LocalShippingOutlinedIcon sx={styles.icon} />
              <Typography sx={styles.featureText}>
                Delivery guarantee
              </Typography>

              <ChevronRightIcon sx={styles.arrow} />
            </Box>
          </Box>
        </Box>

        {/* BOTTOM MESSAGE */}
        <Box sx={styles.bottomBar} onClick={handleOpen}  >
          <Box sx={styles.messageLeft}>
            <NotificationsActiveOutlinedIcon sx={styles.bellIcon} />
            <Typography sx={styles.messageText}>
              Be wary of messages about delivery issues claiming to be from
              USPS.
            </Typography>
          </Box>

          <Box sx={styles.view} >
            <Typography sx={styles.viewText}>View</Typography>

            <ChevronRightIcon sx={styles.viewArrow} />
          </Box>
        </Box>
      </Box>

      <SecurityModal open={open} handleClose={handleClose} />
    </>
  );
}
