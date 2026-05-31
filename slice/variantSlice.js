// slice/variantSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// ================= FETCH VARIANTS BY PRODUCT =================
export const fetchVariantsByProduct = createAsyncThunk(
  "variants/fetchByProduct",
  async (productId) => {
    try {
      const res = await fetch(
        `${process.env.API}/admin/variants/product/${productId}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch variants");
      }

      return await res.json();
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }
);

// ================= CREATE VARIANTS =================
export const createVariants = createAsyncThunk(
  "variants/create",
  async ({ productId, variants }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.API}/admin/variants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          variants,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Variants created successfully 🚀");
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// ================= UPDATE VARIANT =================
export const updateVariant = createAsyncThunk(
  "variants/update",
  async ({ id, variantData }) => {
    try {
      const res = await fetch(
        `${process.env.API}/admin/variants/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(variantData),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();
      toast.success("Variant updated");
      return data;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }
);

// ================= DELETE VARIANT =================
export const deleteVariant = createAsyncThunk(
  "variants/delete",
  async (id) => {
    try {
      const res = await fetch(
        `${process.env.API}/admin/variants/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Variant deleted");
      return id;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }
);

// ================= SLICE =================
const variantSlice = createSlice({
  name: "variants",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createVariants.pending, (state) => {
        state.loading = true;
      })
      .addCase(createVariants.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(createVariants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH
      .addCase(fetchVariantsByProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVariantsByProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchVariantsByProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE
      .addCase(updateVariant.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (v) => v._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteVariant.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (v) => v._id !== action.payload
        );
      });
  },
});

export default variantSlice.reducer;