"use client";

import { Button } from "@mui/material";
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VariantAccordion from "./VariantAccordion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import { ProductTableStyles as styles } from "./ProductTableStyles";

import { fetchProducts, deleteProduct } from "@/slice/productSlice";

/* ===============================
   Status Chip
================================ */
const StatusChip = ({ status }) => {
  return (
    <Chip
      size="small"
      label={status}
      sx={{
        bgcolor:
          status === "active"
            ? "#DCFCE7"
            : status === "inactive"
              ? "#FEE2E2"
              : "#FEF9C3",
        color:
          status === "active"
            ? "#166534"
            : status === "inactive"
              ? "#991B1B"
              : "#854D0E",
        fontWeight: 600,
      }}
    />
  );
};

export default function ProductTable() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { list: products = [], loading } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (id) => {
    router.push(`/dashboard/admin/products/edit?id=${id}`);
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this product?")) return;
    dispatch(deleteProduct(id));
  };

  return (
    <Box sx={styles.wrapper}>
      {/* Header */}
      <Box sx={styles.headerRow}>
        <Typography sx={styles.headerTitle}>Product Management</Typography>

        <Button
          variant="contained"
          size="small"
          onClick={() => router.push("/dashboard/admin/products/create")}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            bgcolor: "#f36823",
            "&:hover": { bgcolor: "#d3541c" },
          }}
        >
          + Create Product
        </Button>
      </Box>

      {/* Loading */}
      {loading && (
        <Box textAlign="center" mt={3}>
          <CircularProgress size={24} />
        </Box>
      )}

      {/* Empty */}
      {!loading && products.length === 0 && (
        <Typography textAlign="center">No Products found</Typography>
      )}

      {/* Accordion List */}
      {!loading &&
        products.map((row) => (
          <Accordion key={row._id} sx={styles.card}>
            {/* SUMMARY */}
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                {/* LEFT SIDE */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  {/* Thumbnail */}
                  {row.media?.[0]?.type === "image" ? (
                    <img
                      src={row.media[0].url}
                      alt="product"
                      width={45}
                      height={45}
                      style={{
                        borderRadius: 6,
                        objectFit: "cover",
                      }}
                    />
                  ) : row.media?.[0]?.type === "video" ? (
                    <video
                      src={row.media[0].url}
                      width={45}
                      height={45}
                      style={{
                        borderRadius: 6,
                        objectFit: "cover",
                      }}
                    />
                  ) : null}

                  <Box>
                    <Typography sx={styles.mobileValue}>{row.name}</Typography>

                    <Typography sx={styles.mobileLabel}>
                      ₹{row.special_price || row.price} •{" "}
                      {row.manage_stock ? `Stock: ${row.qty}` : "No Tracking"}
                    </Typography>
                  </Box>
                </Box>

                {/* STATUS */}
                <StatusChip status={row.status} />
              </Box>
            </AccordionSummary>

            {/* DETAILS */}
            <AccordionDetails>
              {/* SKU */}
              <Box sx={styles.mobileRow}>
                <Typography sx={styles.mobileLabel}>SKU</Typography>
                <Typography sx={styles.mobileValue}>
                  {row.sku || "-"}
                </Typography>
              </Box>

              {/* TYPE */}
              <Box sx={styles.mobileRow}>
                <Typography sx={styles.mobileLabel}>Product Type</Typography>
                <Typography sx={styles.mobileValue}>
                  {row.product_type}
                </Typography>
              </Box>

              {/* STOCK */}
              <Box sx={styles.mobileRow}>
                <Typography sx={styles.mobileLabel}>In Stock</Typography>
                <Typography sx={styles.mobileValue}>
                  {row.in_stock ? "Yes" : "No"}
                </Typography>
              </Box>

              {/* BRAND */}
              <Box sx={styles.mobileRow}>
                <Typography sx={styles.mobileLabel}>Brand</Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {row.brand_id?.logo && (
                    <img
                      src={row.brand_id.logo}
                      alt="brand"
                      width={20}
                      height={20}
                      style={{ borderRadius: "50%" }}
                    />
                  )}

                  <Typography sx={styles.mobileValue}>
                    {row.brand_id?.name || "-"}
                  </Typography>
                </Box>
              </Box>

              {/* CATEGORY */}
              <Box sx={styles.mobileRow}>
                <Typography sx={styles.mobileLabel}>Categories</Typography>
                <Typography sx={styles.mobileValue}>
                  {row.category?.map((c) => c.name).join(", ") || "-"}
                </Typography>
              </Box>

              {/* TAG */}
              <Box sx={styles.mobileRow}>
                <Typography sx={styles.mobileLabel}>Tags</Typography>
                <Typography sx={styles.mobileValue}>
                  {row.tag_id?.map((t) => t.name).join(", ") || "-"}
                </Typography>
              </Box>

              {/* VIEWED */}
              <Box sx={styles.mobileRow}>
                <Typography sx={styles.mobileLabel}>Viewed</Typography>
                <Typography sx={styles.mobileValue}>
                  {row.viewed || 0}
                </Typography>
              </Box>

              {/* ATTRIBUTES (COLOR SUPPORT) */}
              <Box sx={styles.mobileRow}>
                <Typography sx={styles.mobileLabel}>Attributes</Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {row.attributes?.length > 0 ? (
                    row.attributes.map((attr) => {
                      const selectedValue = row.customAttributes?.[attr._id];

                      // ✅ CASE 1: NO VALUE → show options (like Size, Color)
                      if (!selectedValue) {
                        return (
                          <Typography key={attr._id} sx={styles.mobileValue}>
                            {attr.name}:{" "}
                            {attr.values?.map((v) => v.label).join(", ") || "-"}
                          </Typography>
                        );
                      }

                      // ✅ CASE 2: VALUE EXISTS → map label
                      const matchedOption = attr.values?.find(
                        (v) => v.value === selectedValue,
                      );

                      const label = matchedOption?.label || selectedValue;

                      // 🎨 COLOR SPECIAL UI
                      if (attr.name.toLowerCase() === "color") {
                        return (
                          <Box
                            key={attr._id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 18,
                                height: 18,
                                borderRadius: "50%",
                                bgcolor: selectedValue,
                                border: "1px solid #ddd",
                              }}
                            />
                            <Typography sx={styles.mobileValue}>
                              {label}
                            </Typography>
                          </Box>
                        );
                      }

                      return (
                        <Typography key={attr._id} sx={styles.mobileValue}>
                          {attr.name}: {label}
                        </Typography>
                      );
                    })
                  ) : (
                    <Typography sx={styles.mobileValue}>-</Typography>
                  )}
                </Box>
              </Box>
              {/* MEDIA */}
              <Box sx={styles.mobileRow}>
                <Typography sx={styles.mobileLabel}>Media</Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                  {row.media?.length > 0 ? (
                    row.media.slice(0, 2).map((m) =>
                      m.type === "image" ? (
                        <img
                          key={m._id}
                          src={m.url}
                          width={40}
                          height={40}
                          style={{
                            borderRadius: 6,
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <video
                          key={m._id}
                          src={m.url}
                          width={40}
                          height={40}
                          style={{
                            borderRadius: 6,
                            objectFit: "cover",
                          }}
                        />
                      ),
                    )
                  ) : (
                    <Typography sx={styles.mobileValue}>-</Typography>
                  )}
                </Box>
              </Box>

              {/* ACTIONS */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 1,
                }}
              >
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
                <IconButton
                  onClick={() =>
                    router.push(
                      `/dashboard/admin/products/variants?id=${row._id}`,
                    )
                  }
                  sx={{ color: "#b626f4" }}
                >
                  <AutoAwesomeMotionIcon fontSize="small" />
                </IconButton>
              </Box>
              {/* VARIANTS */}
              {row.variants?.length > 0 && (
                <VariantAccordion variants={row.variants} />
              )}
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
}
