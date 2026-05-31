import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ---------------- FETCH CHECKOUT ADDRESSES ---------------- */

export const fetchCheckoutAddresses = createAsyncThunk(
  "checkoutAddress/fetchCheckoutAddresses",

  async (userId) => {
    const res = await fetch(`${process.env.API}/address/${userId}`);

    return await res.json();
  },
);

/* ---------------- SLICE ---------------- */

const checkoutAddressSlice = createSlice({
  name: "checkoutAddress",

  initialState: {
    checkoutAddresses: [],

    selectedCheckoutAddress: null,

    checkoutAddressLoading: false,
  },

  reducers: {
    setCheckoutAddress: (state, action) => {
      state.selectedCheckoutAddress = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchCheckoutAddresses.pending, (state) => {
        state.checkoutAddressLoading = true;
      })

      .addCase(fetchCheckoutAddresses.fulfilled, (state, action) => {
        state.checkoutAddressLoading = false;

        // 🔥 SAFE ARRAY
        state.checkoutAddresses = action.payload?.addresses || [];

        // 🔥 DEFAULT ADDRESS
        const defaultAddress = action.payload?.addresses?.find(
          (item) => item.is_default,
        );

        state.selectedCheckoutAddress =
          defaultAddress || action.payload?.addresses?.[0] || null;
      })

      .addCase(fetchCheckoutAddresses.rejected, (state) => {
        state.checkoutAddressLoading = false;
      });
  },
});

export const { setCheckoutAddress } = checkoutAddressSlice.actions;

export default checkoutAddressSlice.reducer;
