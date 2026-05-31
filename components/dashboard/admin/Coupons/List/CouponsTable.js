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
  Button,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { CouponTableStyles as styles } from "./CouponTableStyles";

import CouponTableMobileCards from "./CouponTableMobileCards";

import {
  fetchCoupons,
  deleteCoupon,
} from "@/slice/couponSlice";

/* ===============================
   Status Chip
================================ */
const StatusChip = ({ status }) => {
  return (
    <Chip
      size="small"
      label={status ? "Active" : "Inactive"}
      sx={{
        bgcolor: status ? "#DCFCE7" : "#FEE2E2",
        color: status ? "#166534" : "#991B1B",
        fontWeight: 600,
      }}
    />
  );
};

export default function CouponTable() {
  const dispatch = useDispatch();

  const router = useRouter();

  const { list: coupons = [], loading } = useSelector(
    (state) => state.coupons
  );

  // ✅ Fetch Coupons
  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  // ✅ Edit
  const handleEdit = (id) => {
    router.push(`/dashboard/admin/coupons/edit?id=${id}`);
  };

  // ✅ Delete
  const handleDelete = (id) => {
    if (!confirm("Delete this coupon?")) return;

    dispatch(deleteCoupon(id));
  };

  return (
    <Box sx={styles.wrapper}>
      {/* Header */}
      <Box sx={styles.headerRow}>
        <Typography sx={styles.headerTitle}>
          Coupon Management
        </Typography>

        <Button
          variant="contained"
          size="small"
          onClick={() =>
            router.push(
              "/dashboard/admin/coupons/create"
            )
          }
          sx={{
            textTransform: "none",
            fontWeight: 600,
            bgcolor: "#f36823",

            "&:hover": {
              bgcolor: "#d3541c",
            },
          }}
        >
          + Create Coupon
        </Button>
      </Box>

      {/* ===== Desktop Table ===== */}
      <Paper sx={styles.tablePaper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.th}>
                Code
              </TableCell>

              <TableCell sx={styles.th}>
                Type
              </TableCell>

              <TableCell sx={styles.th}>
                Discount
              </TableCell>

              <TableCell sx={styles.th}>
                Min Order
              </TableCell>

              <TableCell sx={styles.th}>
                Usage
              </TableCell>

              <TableCell sx={styles.th}>
                Status
              </TableCell>

              <TableCell sx={styles.th}>
                Expiry
              </TableCell>

              <TableCell
                sx={styles.th}
                align="right"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Loading */}
            {loading && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  align="center"
                >
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}

            {/* Empty */}
            {!loading &&
              coupons.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    align="center"
                  >
                    No Coupons found
                  </TableCell>
                </TableRow>
              )}

            {/* Data */}
            {!loading &&
              coupons.map((row) => (
                <TableRow
                  key={row._id}
                  sx={styles.tr}
                >
                  <TableCell sx={styles.td}>
                    {row.code}
                  </TableCell>

                  <TableCell sx={styles.td}>
                    {row.discount_type}
                  </TableCell>

                  <TableCell sx={styles.td}>
                    {row.discount_type ===
                    "percentage"
                      ? `${row.discount_value}%`
                      : `₹${row.discount_value}`}
                  </TableCell>

                  <TableCell sx={styles.td}>
                    ₹{row.minimum_order_amount}
                  </TableCell>

                  <TableCell sx={styles.td}>
                    {row.used_count}/
                    {row.usage_limit}
                  </TableCell>

                  <TableCell sx={styles.td}>
                    <StatusChip
                      status={row.is_active}
                    />
                  </TableCell>

                  <TableCell sx={styles.td}>
                    {new Date(
                      row.expires_at
                    ).toLocaleDateString("en-IN")}
                  </TableCell>

                  {/* Actions */}
                  <TableCell
                    sx={styles.td}
                    align="right"
                  >
                    <IconButton
                      onClick={() =>
                        handleEdit(row._id)
                      }
                      sx={{ color: "#2563EB" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      onClick={() =>
                        handleDelete(row._id)
                      }
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
      <CouponTableMobileCards
        data={coupons}
        styles={styles}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </Box>
  );
}