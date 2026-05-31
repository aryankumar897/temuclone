"use client";

import { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";

import { fetchProductById, updateProduct } from "@/slice/productSlice";

import ProductForm from "@/components/dashboard/admin/Products/Create/ProductForm";
import ProductSidebar from "@/components/dashboard/admin/Products/Create/ProductSidebar";

export default function EditProductPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const { current, loading } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    special_price: "",
    sku: "",
    qty: "",
    images: [],
    store_id: null,
    brand_id: "",
    category: [],
    tag_id: [],
    status: "draft",
    slug: "",
    short_description: "",
    description: "",
  });

  // ================= FETCH =================
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  // ================= PREFILL (🔥 FIX HERE) =================
  useEffect(() => {
    if (current) {
      setFormData({
        name: current.name || "",
        price: current.price || "",
        special_price: current.special_price || "",
        sku: current.sku || "",
        qty: current.qty || "",

        // ✅ MEDIA FULL OBJECT
        images: current.media || [],

        // ✅ IDs ONLY
        brand_id: current.brand_id?._id || "",
        tag_id: current.tag_id?.map((t) => t._id) || [],
        category: current.category?.map((c) => c._id) || [],

        store_id: current.store_id || null,

        status: current.status || "draft",
        slug: current.slug || "",

        short_description: current.short_description || "",
        description: current.description || "",

        attributes: current.attributes?.map((a) => a._id.toString()) || [],

        attributeValues: current.attributeValues || {},
        customAttributes: current.customAttributes || {},
      });
    }
  }, [current]);

  console.log("formData=======", formData);
  // ================= UPDATE =================
  const handleUpdate = async (payload) => {
    try {
      await dispatch(
        updateProduct({
          id,
          productData: payload,
        }),
      ).unwrap();

      router.push("/dashboard/admin/products/list");
    } catch (err) {
      console.log("❌ Update failed:", err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Edit Product</Typography>

        <Button variant="contained" onClick={() => router.back()}>
          ← Go Back
        </Button>
      </Box>
     
      {/* SAME UI AS CREATE */}
      <Grid container spacing={3}>
        {/* LEFT */}
        <Grid size={{ xs: 12, md: 8 }}>
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleUpdate}
            isEdit={true}
          />
        </Grid>

        {/* RIGHT */}
        <Grid size={{ xs: 12, md: 4 }}>
          <ProductSidebar formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
    </Box>
  );
}
