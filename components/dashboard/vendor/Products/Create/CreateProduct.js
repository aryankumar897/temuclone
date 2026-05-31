"use client";

import { useState } from "react";
import { Box, Grid } from "@mui/material";

import ProductForm from "./ProductForm";
import ProductSidebar from "./ProductSidebar";

export default function CreateProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    special_price: "",
    sku: "",
    qty: "",
    images: [],
    store_id: null,
    brand_id: "",
    category: "",
    tag_id: [],
    status: "draft", 
  });

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* LEFT */}
        <Grid size={{ xs: 12, md: 8 }}>
          <ProductForm formData={formData} setFormData={setFormData} />
        </Grid>

        {/* RIGHT */}
        <Grid size={{ xs: 12, md: 4 }}>
          <ProductSidebar formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
    </Box>
  );
}
