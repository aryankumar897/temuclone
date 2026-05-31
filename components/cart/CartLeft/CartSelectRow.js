import { Box, Checkbox, Typography, Button } from "@mui/material";
import styles from "./cartLeftStyles";

export default function CartSelectRow() {
  return (
    <Box sx={styles.selectRow}>

      <Box sx={styles.selectLeft}>
        <Checkbox defaultChecked />
        <Typography>Select all (15)</Typography>
      </Box>

      <Box sx={styles.selectRight}>
        <Button sx={styles.filterBtn}>All (15)</Button>
        <Button sx={styles.filterBtn}>Selected (15)</Button>
      </Box>

    </Box>
  );
}