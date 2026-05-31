"use client";

import { Box, Paper, Typography, TextField, MenuItem } from "@mui/material";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTags } from "@/slice/tagSlice";
import { fetchBrands } from "@/slice/brandSlice";

import FormMultiSelect from "@/components/form/FormMultiSelect";

import CategorySelector from "./CategorySelector";
const ProductSidebar = ({ formData, setFormData }) => {
  const dispatch = useDispatch();

  const { list: tags = [] } = useSelector((state) => state.tags);
  const { list: brands = [] } = useSelector((state) => state.brands);

  //const [stores, setStores] = useState([]);

  // 🔥 FETCH TAG + BRAND (Redux)
  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchBrands());
  }, [dispatch]);

  // 🔥 FETCH STORE (manual API)
  // useEffect(() => {
  //   const fetchStores = async () => {
  //     try {
  //       const res = await fetch(`${process.env.API}/admin/stores`);
  //       const data = await res.json();
  //       setStores(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchStores();
  // }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {/* 🔥 STORE */}
      {/* <Paper sx={{ p: 2 }}>
        <Typography mb={1}>Store</Typography>
        <TextField
          select
          fullWidth
          size="small"
          label="Select store"
          name="store_id"
          value={formData.store_id ?? "admin"} 
          onChange={(e) => {
            const value = e.target.value;

            setFormData((prev) => ({
              ...prev,
              store_id: value === "admin" ? null : value,
            }));
          }}
        >

          <MenuItem value="admin">Admin</MenuItem>

      
          {stores.map((store) => (
            <MenuItem key={store._id} value={store._id}>
              {store.name}
            </MenuItem>
          ))}
        </TextField>
      </Paper> */}

      {/* 🔥 CATEGORY (later) */}
      {/* <Paper sx={{ p: 2 }}>
        <Typography mb={1}>Category</Typography>

        <TextField
          select
          fullWidth
          size="small"
          label="Select category"
          name="category"
          value={formData.category || ""}
          onChange={handleChange}
        >
          <MenuItem value="">Select category</MenuItem>
        </TextField>
      </Paper> */}

      {/* 🔥 BRAND (single select) */}
      <Paper sx={{ p: 2 }}>
        <Typography mb={1}>Brand</Typography>

        <TextField
          select
          fullWidth
          size="small"
          label="Select brand"
          name="brand_id"
          value={formData.brand_id || ""}
          onChange={handleChange}
        >
          {brands.map((brand) => (
            <MenuItem key={brand._id} value={brand._id}>
              {brand.name}
            </MenuItem>
          ))}
        </TextField>
      </Paper>

      {/* 🔥 TAGS (multi select) */}
      <Paper sx={{ p: 2 }}>
        <Typography mb={1}>Tags</Typography>

        <FormMultiSelect
          label="Select Tags"
          value={formData.tag_id || []}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              tag_id: e.target.value,
            }))
          }
          options={tags.map((tag) => ({
            label: tag.name,
            value: tag._id,
          }))}
        />
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography mb={1}>Category</Typography>

        <CategorySelector
          value={formData.category || []}
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              category: val,
            }))
          }
        />
      </Paper>
    </Box>
  );
};

export default ProductSidebar;
