"use client";

import { Box, Typography, IconButton,Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AttributeTableMobileCards = ({
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
            <Typography sx={styles.mobileLabel}>Name</Typography>
            <Typography sx={styles.mobileValue}>
              {row.name}
            </Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Type</Typography>
            <Typography sx={styles.mobileValue}>
              {row.type}
            </Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>
              Variant
            </Typography>
            <Typography sx={styles.mobileValue}>
              {row.isVariant ? "Yes" : "No"}
            </Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>
              Values
            </Typography>
         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
  {row.values?.slice(0, 4).map((v, i) => (
    <Chip key={i} label={v.label} size="small" />
  ))}

  {row.values?.length > 4 && (
    <Chip size="small" label={`+${row.values.length - 4}`} />
  )}
</Box>
          </Box>

          {/* ACTIONS */}
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
        <Typography align="center">No Attributes found</Typography>
      )}
    </Box>
  );
};

export default AttributeTableMobileCards;