"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./paymentBannerStyles";

export default function PaymentBanner() {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.container}>
        <Typography sx={styles.text}>
          Shop now, pay later with
        </Typography>

        <Box sx={styles.logos}>
          <Box sx={styles.logoWrapper}>
            <Image
              src="/images/pay5.avif"
              alt="Afterpay"
              width={80}
              height={30}
              style={styles.logoImg}
            />
          </Box>

          <Box sx={styles.logoWrapper}>
            <Image
              src="/images/pay6.avif"
              alt="Klarna"
              width={70}
              height={30}
              style={styles.logoImg}
            />
          </Box>

          <Box sx={styles.logoWrapper}>
            <Image
              src="/images/pay7.avif"
              alt="Affirm"
              width={70}
              height={30}
              style={styles.logoImg}
            />
          </Box>

          <Box sx={styles.logoWrapper}>
            <Image
              src="/images/pay8.avif"
              alt="PayPal"
              width={70}
              height={30}
              style={styles.logoImg}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}