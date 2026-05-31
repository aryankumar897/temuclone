import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔥 FETCH ADMIN ORDERS
export const fetchAdminOrders = createAsyncThunk(
  "adminOrders/fetchAdminOrders",

  async () => {
    const response = await fetch(`${process.env.API}/admin/orders`);

    return await response.json();
  },
);

const adminOrderSlice = createSlice({
  name: "adminOrders",

  initialState: {
    orders: [],

    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload?.orders || [];
      })

      .addCase(fetchAdminOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default adminOrderSlice.reducer;
