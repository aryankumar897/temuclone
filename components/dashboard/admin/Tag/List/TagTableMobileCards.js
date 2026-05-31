"use client";

import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TagTableMobileCards = ({ data = [], styles, onDelete, onEdit }) => {
  return (
    <Box sx={styles.cardList}>
      {data.map((row) => (
        <Box key={row._id} sx={styles.card}>
          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Name</Typography>
            <Typography sx={styles.mobileValue}>{row.name}</Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Slug</Typography>
            <Typography sx={styles.mobileValue}>{row.slug}</Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Status</Typography>
            <Typography sx={styles.mobileValue}>{row.status}</Typography>
          </Box>

          {/* ✅ Actions */}
          <Box sx={styles.mobileActions}>
            <IconButton
              sx={styles.mobileActionBtn}
              onClick={() => onEdit(row._id)}
            >
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton
              sx={{
                ...styles.mobileActionBtn,
                ...styles.mobileDeleteBtn,
              }}
              onClick={() => onDelete(row._id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      ))}

      {data.length === 0 && (
        <Typography align="center">No KYC found</Typography>
      )}
    </Box>
  );
};

export default TagTableMobileCards;
