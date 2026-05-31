"use client";
import { Button } from "@mui/material"; // ✅ add this import
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

import { TagTableStyles as styles } from "./TagTableStyles";
import TagTableMobileCards from "./TagTableMobileCards";

import { fetchTags, deleteTag } from "@/slice/tagSlice";

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

export default function TagTable() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { list: tags = [], loading } = useSelector((state) => state.tags);

  // ✅ Fetch Tags
  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  // ✅ Edit
  const handleEdit = (id) => {
    router.push(`/dashboard/admin/tags/edit?id=${id}`);
  };

  // ✅ Delete
  const handleDelete = (id) => {
    if (!confirm("Delete this tag?")) return;
    dispatch(deleteTag(id));
  };

  return (
    <Box sx={styles.wrapper}>
      {/* Header */}

      <Box sx={styles.headerRow}>
        <Typography sx={styles.headerTitle}>Tag Management</Typography>

        {/* ✅ CREATE TAG BUTTON */}
        <Button
          variant="contained"
          size="small"
          onClick={() => router.push("/dashboard/admin/tags/create")}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            bgcolor: "#f36823",
            "&:hover": {
              bgcolor: "#d3541c",
            },
          }}
        >
          + Create Tag
        </Button>
      </Box>

      {/* ===== Desktop Table ===== */}
      <Paper sx={styles.tablePaper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
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
                <TableCell colSpan={5} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}

            {/* Empty */}
            {!loading && tags?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Tags found
                </TableCell>
              </TableRow>
            )}

            {/* Data */}
            {!loading &&
              tags.map((row) => (
                <TableRow key={row._id} sx={styles.tr}>
                  <TableCell sx={styles.td}>{row.name}</TableCell>

                  <TableCell sx={styles.td}>{row.slug}</TableCell>

                  <TableCell sx={styles.td}>
                    <StatusChip status={row.status} />
                  </TableCell>

                  <TableCell sx={styles.td}>
                    {new Date(row.createdAt).toLocaleDateString("en-IN")}
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
      <TagTableMobileCards
        data={tags}
        styles={styles}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </Box>
  );
}
