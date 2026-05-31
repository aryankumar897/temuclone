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
  Avatar,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { BrandTableStyles as styles } from "./BrandTableStyles";
import BrandTableMobileCards from "./BrandTableMobileCards";

import { fetchBrands, deleteBrand } from "@/slice/brandSlice";

/* ===============================
   Status Chip
================================ */
const StatusChip = ({ status }) => {
  return (
    <Chip
      size="small"
      label={status}
      sx={{
        bgcolor: status === "active" ? "#DCFCE7" : "#FEE2E2",
        color: status === "active" ? "#166534" : "#991B1B",
        fontWeight: 600,
      }}
    />
  );
};

export default function BrandTable() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { list: brands = [], loading } = useSelector(
    (state) => state.brands
  );

  // ✅ Fetch Brands
  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  // ✅ Edit
  const handleEdit = (id) => {
    router.push(`/dashboard/admin/brands/edit?id=${id}`);
  };

  // ✅ Delete
  const handleDelete = (id) => {
    if (!confirm("Delete this brand?")) return;
    dispatch(deleteBrand(id));
  };

  return (
    <Box sx={styles.wrapper}>
      {/* Header */}
      <Box sx={styles.headerRow}>
        <Typography sx={styles.headerTitle}>
          Brand Management
        </Typography>

        <Button
          variant="contained"
          size="small"
          onClick={() =>
            router.push("/dashboard/admin/brands/create")
          }
          sx={{
            textTransform: "none",
            fontWeight: 600,
            bgcolor: "#f36823",
            "&:hover": { bgcolor: "#d3541c" },
          }}
        >
          + Create Brand
        </Button>
      </Box>

      {/* ===== Desktop Table ===== */}
      <Paper sx={styles.tablePaper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.th}>Logo</TableCell>
              <TableCell sx={styles.th}>Name</TableCell>
              <TableCell sx={styles.th}>Slug</TableCell>
              <TableCell sx={styles.th}>Status</TableCell>
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
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}

            {/* Empty */}
            {!loading && brands.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Brands found
                </TableCell>
              </TableRow>
            )}

            {/* Data */}
            {!loading &&
              brands.map((row) => (
                <TableRow key={row._id} sx={styles.tr}>
                  {/* LOGO */}
                  <TableCell sx={styles.td}>
                    <Avatar
                      src={row.logo}
                      sx={{ width: 40, height: 40 }}
                    >
                      {row.name?.[0]}
                    </Avatar>
                  </TableCell>

                  <TableCell sx={styles.td}>
                    {row.name}
                  </TableCell>

                  <TableCell sx={styles.td}>
                    {row.slug}
                  </TableCell>

                  <TableCell sx={styles.td}>
                    <StatusChip status={row.status} />
                  </TableCell>

                  <TableCell sx={styles.td}>
                    {new Date(row.createdAt).toLocaleDateString(
                      "en-IN"
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell sx={styles.td} align="right">
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

      {/* ===== Mobile Cards ===== */}
      <BrandTableMobileCards
        data={brands}
        styles={styles}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </Box>
  );
}