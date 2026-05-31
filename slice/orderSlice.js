import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔥 FETCH ORDERS
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",

  async (userId) => {
    const response = await fetch(`${process.env.API}/orders/${userId}`);

    return await response.json();
  },
);

const orderSlice = createSlice({
  name: "orders",

  initialState: {
    orders: [],

    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload?.orders || [];
      })

      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;
