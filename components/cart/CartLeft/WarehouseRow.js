import { Box, Typography } from "@mui/material";
import styles from "./cartLeftStyles";

export default function WarehouseRow({ free }) {
  return (
    <Box sx={styles.warehouseRow}>

      {free && (
        <Typography sx={styles.freeShipping}>
          ✓ Free shipping from this seller
        </Typography>
      )}

      <Typography sx={styles.warehouse}>
        Local warehouse
      </Typography>

    </Box>
  );
}