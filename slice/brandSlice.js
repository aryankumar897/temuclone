import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// ================= FETCH SINGLE BRAND =================
export const fetchBrandById = createAsyncThunk(
  "brands/fetchBrandById",
  async (id) => {
    try {
      const response = await fetch(`${process.env.API}/admin/brands/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch brand: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      toast.error(`Error loading brand: ${error.message}`);
      throw error;
    }
  }
);

// ================= FETCH ALL BRANDS =================
export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands",
  async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/brands`);
      if (!response.ok) {
        throw new Error(`Failed to fetch brands: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      toast.error(`Error loading brands: ${error.message}`);
      throw error;
    }
  }
);

// ================= CREATE BRAND =================
export const createBrand = createAsyncThunk(
  "brands/createBrand",
  async (brandData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.API}/admin/brands`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brandData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Brand created successfully");
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// ================= UPDATE BRAND =================
export const updateBrand = createAsyncThunk(
  "brands/updateBrand",
  async ({ id, brandData }) => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/brands/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(brandData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update brand: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Brand updated successfully!");
      return data;
    } catch (error) {
      toast.error(`Error updating brand: ${error.message}`);
      throw error;
    }
  }
);

// ================= DELETE BRAND =================
export const deleteBrand = createAsyncThunk(
  "brands/deleteBrand",
  async (id) => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/brands/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete brand: ${response.status}`);
      }

      toast.success("Brand deleted successfully!");
      return id;
    } catch (error) {
      toast.error(`Error deleting brand: ${error.message}`);
      throw error;
    }
  }
);

// ================= SLICE =================
const brandSlice = createSlice({
  name: "brands",
  initialState: {
    list: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ALL
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.list.findIndex(
          (b) => b._id === action.payload._id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(
          (b) => b._id !== action.payload
        );
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // FETCH SINGLE
      .addCase(fetchBrandById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrandById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;

        const index = state.list.findIndex(
          (b) => b._id === action.payload._id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(fetchBrandById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default brandSlice.reducer;