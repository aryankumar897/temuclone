// slice/couponSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// ================= FETCH SINGLE COUPON =================
export const fetchCouponById = createAsyncThunk(
  "coupons/fetchCouponById",
  async (id) => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/coupons/${id}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch coupon: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      toast.error(`Error loading coupon: ${error.message}`);
      throw error;
    }
  }
);

// ================= FETCH ALL COUPONS =================
export const fetchCoupons = createAsyncThunk(
  "coupons/fetchCoupons",
  async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/coupons`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch coupons: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      toast.error(`Error loading coupons: ${error.message}`);
      throw error;
    }
  }
);

// ================= CREATE COUPON =================
export const createCoupon = createAsyncThunk(
  "coupons/createCoupon",
  async (couponData, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${process.env.API}/admin/coupons`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(couponData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Coupon created successfully!");
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// ================= UPDATE COUPON =================
export const updateCoupon = createAsyncThunk(
  "coupons/updateCoupon",
  async ({ id, couponData }) => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/coupons/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(couponData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update coupon: ${response.status}`);
      }

      const data = await response.json();

      toast.success("Coupon updated successfully!");
      return data;
    } catch (error) {
      toast.error(`Error updating coupon: ${error.message}`);
      throw error;
    }
  }
);

// ================= DELETE COUPON =================
export const deleteCoupon = createAsyncThunk(
  "coupons/deleteCoupon",
  async (id) => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/coupons/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete coupon: ${response.status}`);
      }

      toast.success("Coupon deleted successfully!");
      return id;
    } catch (error) {
      toast.error(`Error deleting coupon: ${error.message}`);
      throw error;
    }
  }
);

// ================= SLICE =================
const couponSlice = createSlice({
  name: "coupons",

  initialState: {
    list: [],
    current: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================= CREATE =================
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })

      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= FETCH ALL =================
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ================= UPDATE =================
      .addCase(updateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.list.findIndex(
          (c) => c._id === action.payload._id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(updateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ================= DELETE =================
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;

        state.list = state.list.filter(
          (c) => c._id !== action.payload
        );
      })

      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ================= FETCH SINGLE =================
      .addCase(fetchCouponById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCouponById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;

        const index = state.list.findIndex(
          (c) => c._id === action.payload._id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(fetchCouponById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default couponSlice.reducer;