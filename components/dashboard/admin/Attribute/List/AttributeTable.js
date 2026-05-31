"use client";

import { Button } from "@mui/material";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  CircularProgress,
    IconButton,
  
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { fetchAttributes, deleteAttribute } from "@/slice/attributeSlice";

import { AttributeTableStyles as styles } from "./AttributeTableStyles";
import AttributeTableMobileCards from "./AttributeTableMobileCards";

/* ===============================
   Type Chip
================================ */
const TypeChip = ({ type }) => {
  const colors = {
    select: { bg: "#DBEAFE", color: "#1E3A8A" },
    text: { bg: "#F3E8FF", color: "#6B21A8" },
    number: { bg: "#FEF3C7", color: "#92400E" },
    color: { bg: "#DCFCE7", color: "#166534" },
  };

  return (
    <Chip
      size="small"
      label={type}
      sx={{
        bgcolor: colors[type]?.bg,
        color: colors[type]?.color,
        fontWeight: 600,
      }}
    />
  );
};

export default function AttributeTable() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { list: attributes = [], loading } = useSelector(
    (state) => state.attributes,
  );

  useEffect(() => {
    dispatch(fetchAttributes());
  }, [dispatch]);

  const handleEdit = (id) => {
    router.push(`/dashboard/admin/attributes/edit?id=${id}`);
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this attribute?")) return;
    dispatch(deleteAttribute(id));
  };

  return (
    <Box sx={styles.wrapper}>
      {/* HEADER */}
      <Box sx={styles.headerRow}>
        <Typography sx={styles.headerTitle}>Attribute Management</Typography>

        <Button
          variant="contained"
          size="small"
          onClick={() => router.push("/dashboard/admin/attributes/create")}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            bgcolor: "#f36823",
            "&:hover": { bgcolor: "#d3541c" },
          }}
        >
          + Create Attribute
        </Button>
      </Box>

      {/* TABLE */}
      <Paper sx={styles.tablePaper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.th}>Name</TableCell>
              <TableCell sx={styles.th}>Slug</TableCell>
              <TableCell sx={styles.th}>Type</TableCell>
              <TableCell sx={styles.th}>Variant</TableCell>
              <TableCell sx={styles.th}>Values</TableCell>
              <TableCell sx={styles.th}>Created</TableCell>
              <TableCell sx={styles.th} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Loading */}
            {loading && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}

            {/* Empty */}
            {!loading && attributes.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No Attributes found
                </TableCell>
              </TableRow>
            )}

            {/* DATA */}
            {!loading &&
              attributes.map((row) => (
                <TableRow key={row._id} sx={styles.tr}>
                  <TableCell sx={styles.td}>{row.name}</TableCell>

                  <TableCell sx={styles.td}>{row.slug}</TableCell>

                  <TableCell sx={styles.td}>
                    <TypeChip type={row.type} />
                  </TableCell>

                  <TableCell sx={styles.td}>
                    <Chip
                      size="small"
                      label={row.isVariant ? "Yes" : "No"}
                      sx={{
                        bgcolor: row.isVariant ? "#DCFCE7" : "#FEE2E2",
                        color: row.isVariant ? "#166534" : "#991B1B",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  {/* VALUES */}
                  <TableCell sx={styles.td}>
                    {row.values?.length > 0 ? (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {row.values.slice(0, 4).map((v, i) => (
                          <Chip
                            key={i}
                            label={v.label}
                            size="small"
                            sx={{
                              bgcolor: "#ef9f26",
                              color: "#0F172A",
                              fontWeight: 500,
                            }}
                          />
                        ))}

                        {/* 🔥 show +more */}
                        {row.values.length > 4 && (
                          <Chip
                            size="small"
                            label={`+${row.values.length - 4}`}
                            sx={{
                              bgcolor: "#E2E8F0",
                              fontWeight: 600,
                            }}
                          />
                        )}
                      </Box>
                    ) : (
                      "-"
                    )}
                  </TableCell>

                  <TableCell sx={styles.td}>
                    {new Date(row.createdAt).toLocaleDateString("en-IN")}
                  </TableCell>

                  {/* ACTION */}
                  <TableCell align="right" sx={styles.td}>
                    <IconButton
                      onClick={() => handleEdit(row._id)}
                      sx={{ color: "#2563EB" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      onClick={() => handleDelete(row._id)}
                      sx={{ color: "#B91C1C" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>

      {/* MOBILE */}
      <AttributeTableMobileCards
        data={attributes}
        styles={styles}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </Box>
  );
}
