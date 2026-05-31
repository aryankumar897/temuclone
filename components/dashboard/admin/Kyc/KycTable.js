"use client";

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

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { kycTableStyles as styles } from "./kycTableStyles";
import KycTableMobileCards from "./KycTableMobileCards";

/* ===============================
   Status Chip
================================ */
const StatusChip = ({ status }) => {
  const map = {
    pending: { bg: "#FEF9C3", color: "#854D0E" },
    approved: { bg: "#DCFCE7", color: "#166534" },
    rejected: { bg: "#FEE2E2", color: "#991B1B" },
  };

  const s = map[status] || map.pending;

  return (
    <Chip
      size="small"
      label={status}
      sx={{
        bgcolor: s.bg,
        color: s.color,
        fontWeight: 600,
      }}
    />
  );
};

export default function KycTable() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // ✅ Fetch KYC
  useEffect(() => {
    const fetchKyc = async () => {
      try {
        const res = await fetch(`${process.env.API}/admin/kyc`);
        const data = await res.json();

        if (data.success) setList(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchKyc();
  }, []);

  // ✅ Edit → redirect
  const handleEdit = (id) => {
    router.push(`/dashboard/admin/kyc/update-status?id=${id}`);
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!confirm("Delete this KYC?")) return;

    try {
      const res = await fetch(`/api/kyc/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setList((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={styles.wrapper}>
      {/* Header */}
      <Box sx={styles.headerRow}>
        <Typography sx={styles.headerTitle}>KYC Verification</Typography>
      </Box>

      {/* ===== Desktop Table ===== */}
      <Paper sx={styles.tablePaper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.th}>Name</TableCell>
              <TableCell sx={styles.th}>Document</TableCell>
              <TableCell sx={styles.th}>Number</TableCell>
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
            {!loading && list.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No KYC found
                </TableCell>
              </TableRow>
            )}

            {/* Data */}
            {list.map((row) => (
              <TableRow key={row._id} sx={styles.tr}>
                <TableCell sx={styles.td}>{row.full_name}</TableCell>

                <TableCell sx={styles.td}>{row.document_type}</TableCell>

                <TableCell sx={styles.td}>{row.document_number}</TableCell>

                <TableCell sx={styles.td}>
                  <StatusChip status={row.status} />
                </TableCell>

                <TableCell sx={styles.td}>
                  {new Date(row.createdAt).toLocaleDateString("en-IN")}
                </TableCell>

                {/* ✅ Actions */}
                <TableCell sx={styles.td} align="right">
                  <IconButton
                    sx={{
                      ...styles.actionBtn,
                      color: "#2563EB", // 🔵 blue
                    }}
                    onClick={() => handleEdit(row._id)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    sx={{ color: "#B91C1C" }}
                    onClick={() => handleDelete(row._id)}
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
      <KycTableMobileCards
        data={list}
        styles={styles}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </Box>
  );
}
