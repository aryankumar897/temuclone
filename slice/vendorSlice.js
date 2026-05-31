import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// ================= FETCH SINGLE PRODUCT =================
export const fetchProductById = createAsyncThunk(
  "vendorsproducts/fetchProductById",
  async (id) => {
    try {
      const response = await fetch(`${process.env.API}/vendors/products/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      toast.error(`Error loading product: ${error.message}`);
      throw error;
    }
  }
);

// ================= FETCH ALL PRODUCTS =================
export const fetchProducts = createAsyncThunk(
  "vendorsproducts/fetchProducts",
  async () => {
    try {
      const response = await fetch(`${process.env.API}/vendors/products`);
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      toast.error(`Error loading products: ${error.message}`);
      throw error;
    }
  }
);

// ================= CREATE PRODUCT =================
export const createProduct = createAsyncThunk(
  "vendorsproducts/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.API}/vendors/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Product created successfully");
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// ================= UPDATE PRODUCT =================
export const updateProduct = createAsyncThunk(
  "vendorsproducts/updateProduct",
  async ({ id, productData }) => {
    try {
      const response = await fetch(
        `${process.env.API}/vendors/products/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Product updated successfully!");
      return data;
    } catch (error) {
      toast.error(`Error updating product: ${error.message}`);
      throw error;
    }
  }
);

// ================= DELETE PRODUCT =================
export const deleteProduct = createAsyncThunk(
  "vendorsproducts/deleteProduct",
  async (id) => {
    try {
      const response = await fetch(
        `${process.env.API}/vendors/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.status}`);
      }

      toast.success("Product deleted successfully!");
      return id;
    } catch (error) {
      toast.error(`Error deleting product: ${error.message}`);
      throw error;
    }
  }
);

// ================= SLICE =================
const productSlice = createSlice({
  name: "vendorsproducts",
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
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ALL
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.list.findIndex(
          (p) => p._id === action.payload._id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(
          (p) => p._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // FETCH SINGLE
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;

        const index = state.list.findIndex(
          (p) => p._id === action.payload._id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;