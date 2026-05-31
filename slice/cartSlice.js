import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import toast from "react-hot-toast";

/* ---------------- FETCH CART ---------------- */

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",

  async (userId) => {
    const res = await fetch(`${process.env.API}/cart/${userId}`);

    return await res.json();
  },
);

/* ---------------- ADD TO CART ---------------- */

export const addToCart = createAsyncThunk(
  "cart/addToCart",

  async (cartData) => {
    const res = await fetch(`${process.env.API}/cart`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(cartData),
    });

    const data = await res.json();

    if (!data.success) {
      toast.error(data.message || "Failed to add cart");

      return thunkAPI.rejectWithValue(data);
    }

    // ✅ SUCCESS
    toast.success("Added to cart");

    return data;
  },
);

/* ---------------- UPDATE QTY ---------------- */

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",

  async (cartData) => {
    const res = await fetch(`${process.env.API}/cart/update`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(cartData),
    });

    return await res.json();
  },
);

/* ---------------- REMOVE ---------------- */

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",

  async (cartData) => {
    const res = await fetch(`${process.env.API}/cart/remove`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(cartData),
    });

    toast.success("Removed from cart");

    return await res.json();
  },
);

/* ---------------- APPLY COUPON ---------------- */

export const applyCoupon = createAsyncThunk(
  "cart/applyCoupon",

  async (couponData, thunkAPI) => {
    try {
      const res = await fetch(`${process.env.API}/cart/apply-coupon`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(couponData),
      });

      const data = await res.json();

      // ❌ ERROR
      if (!data.success) {
        toast.error(data.message);

        return thunkAPI.rejectWithValue(data);
      }

      // ✅ SUCCESS
      toast.success("Coupon applied");

      return data;
    } catch (error) {
      toast.error("Something went wrong");

      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/* ---------------- REMOVE COUPON ---------------- */

export const removeCoupon = createAsyncThunk(
  "cart/removeCoupon",

  async (couponData) => {
    const res = await fetch(`${process.env.API}/cart/remove-coupon`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(couponData),
    });

    const data = await res.json();

    toast.success("Coupon removed");

    return data;
  },
);

/* ---------------- SLICE ---------------- */

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cart: null,

    loading: false,

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;

        state.cart = action.payload.cart;
      })

      // ADD
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
      })

      // UPDATE
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
      })

      // REMOVE
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
      })

      // APPLY COUPON
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
      })

      // REMOVE COUPON
      .addCase(removeCoupon.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
      });
  },
});

export default cartSlice.reducer;
