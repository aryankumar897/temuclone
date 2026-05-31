import { Box, Typography } from "@mui/material";
import styles from "./cartLeftStyles";

export default function CartBanner({ icon, text }) {
  return (
    <Box sx={styles.banner}>
      <Box sx={styles.bannerIcon}>{icon}</Box>

      <Typography sx={styles.bannerText}>{text}</Typography>
    </Box>
  );
}
