// app/dashboard/admin/address/list/page.js

"use client";

import { useEffect } from "react";

import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  IconButton,
  Button,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";

import {
  fetchAddresses,
  deleteAddress,
} from "@/slice/addressSlice";

import styles from "./addressStyles";

export default function AddressListPage() {
  const dispatch = useDispatch();

  const router = useRouter();

  const {
    list = [],
  } = useSelector(
    (state) => state.addresses
  );

  // ================= FETCH =================
  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  // ================= EDIT =================
  const handleEdit = (id) => {
    router.push(
      `/dashboard/customer/addresses/edit?id=${id}`
    );
  };

  // ================= DELETE =================
  const handleDelete = (id) => {
    if (!confirm("Delete address?")) return;

    dispatch(deleteAddress(id));
  };

  return (
    <Box sx={styles.page}>
      {/* HEADER */}
      <Box sx={styles.header}>
        <Typography sx={styles.title}>
          Address Management
        </Typography>

        <Button
          variant="contained"
          onClick={() =>
            router.push(
              "/dashboard/customer/addresses/create"
            )
          }
        >
          + Create Address
        </Button>
      </Box>

      {/* CARDS */}
      <Grid container spacing={2}>
        {list.map((item) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={item._id}
          >
            <Paper sx={styles.addressCard}>
              {/* NAME */}
              <Typography sx={styles.name}>
                {item.full_name}
              </Typography>

              {/* PHONE */}
              <Typography sx={styles.phone}>
                {item.phone}
              </Typography>

              {/* ADDRESS */}
              <Typography sx={styles.address}>
                {item.address_line_1}
                <br />

                {item.address_line_2 &&
                  item.address_line_2}

                <br />

                {item.landmark &&
                  `${item.landmark}, `}

                {item.city}, {item.state}
                <br />

                {item.country} -{" "}
                {item.pincode}
              </Typography>

              {/* CHIPS */}
              <Box sx={styles.chipRow}>
                <Chip
                  size="small"
                  label={item.address_type}
                  sx={{
                    bgcolor: "#DBEAFE",
                    color: "#1D4ED8",
                    fontWeight: 600,
                  }}
                />

                {item.is_default && (
                  <Chip
                    size="small"
                    label="Default"
                    sx={{
                      bgcolor: "#DCFCE7",
                      color: "#166534",
                      fontWeight: 600,
                    }}
                  />
                )}
              </Box>

              {/* ACTIONS */}
              <Box sx={styles.actionRow}>
                <IconButton
                  onClick={() =>
                    handleEdit(item._id)
                  }
                  sx={{
                    color: "#2563EB",
                  }}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  onClick={() =>
                    handleDelete(item._id)
                  }
                  sx={{
                    color: "#DC2626",
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}