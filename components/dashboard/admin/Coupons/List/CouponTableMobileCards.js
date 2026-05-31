"use client";

import {
  Box,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CouponTableMobileCards = ({
  data = [],
  styles,
  onDelete,
  onEdit,
}) => {
  return (
    <Box sx={styles.cardList}>
      {data.map((row) => (
        <Box key={row._id} sx={styles.card}>
          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>
              Code
            </Typography>

            <Typography sx={styles.mobileValue}>
              {row.code}
            </Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>
              Type
            </Typography>

            <Typography sx={styles.mobileValue}>
              {row.discount_type}
            </Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>
              Discount
            </Typography>

            <Typography sx={styles.mobileValue}>
              {row.discount_type ===
              "percentage"
                ? `${row.discount_value}%`
                : `₹${row.discount_value}`}
            </Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>
              Status
            </Typography>

            <Chip
              size="small"
              label={
                row.is_active
                  ? "Active"
                  : "Inactive"
              }
              sx={{
                bgcolor: row.is_active
                  ? "#DCFCE7"
                  : "#FEE2E2",

                color: row.is_active
                  ? "#166534"
                  : "#991B1B",

                fontWeight: 600,
              }}
            />
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>
              Expiry
            </Typography>

            <Typography sx={styles.mobileValue}>
              {new Date(
                row.expires_at
              ).toLocaleDateString("en-IN")}
            </Typography>
          </Box>

          {/* Actions */}
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
              onClick={() =>
                onDelete(row._id)
              }
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      ))}

      {data.length === 0 && (
        <Typography align="center">
          No Coupons found
        </Typography>
      )}
    </Box>
  );
};

export default CouponTableMobileCards;