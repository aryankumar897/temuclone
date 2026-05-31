// slice/addressSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// ================= FETCH SINGLE ADDRESS =================
export const fetchAddressById = createAsyncThunk(
  "addresses/fetchAddressById",
  async (id) => {
    try {
      const response = await fetch(
        `${process.env.API}/customer/address/${id}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch address: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      toast.error(`Error loading address: ${error.message}`);
      throw error;
    }
  }
);

// ================= FETCH ALL ADDRESSES =================
export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async () => {
    try {
      const response = await fetch(
        `${process.env.API}/customer/address`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch addresses: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      toast.error(`Error loading addresses: ${error.message}`);
      throw error;
    }
  }
);

// ================= CREATE ADDRESS =================
export const createAddress = createAsyncThunk(
  "addresses/createAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${process.env.API}/customer/address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addressData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Address created successfully");
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// ================= UPDATE ADDRESS =================
export const updateAddress = createAsyncThunk(
  "addresses/updateAddress",
  async ({ id, addressData }) => {
    try {
      const response = await fetch(
        `${process.env.API}/customer/address/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addressData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update address: ${response.status}`);
      }

      const data = await response.json();

      toast.success("Address updated successfully!");
      return data;
    } catch (error) {
      toast.error(`Error updating address: ${error.message}`);
      throw error;
    }
  }
);

// ================= DELETE ADDRESS =================
export const deleteAddress = createAsyncThunk(
  "addresses/deleteAddress",
  async (id) => {
    try {
      const response = await fetch(
        `${process.env.API}/customer/address/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete address: ${response.status}`);
      }

      toast.success("Address deleted successfully!");
      return id;
    } catch (error) {
      toast.error(`Error deleting address: ${error.message}`);
      throw error;
    }
  }
);

// ================= SLICE =================
const addressSlice = createSlice({
  name: "addresses",

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
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })

      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ALL
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.list.findIndex(
          (a) => a._id === action.payload._id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;

        state.list = state.list.filter(
          (a) => a._id !== action.payload
        );
      })

      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // FETCH SINGLE
      .addCase(fetchAddressById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAddressById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;

        const index = state.list.findIndex(
          (a) => a._id === action.payload._id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(fetchAddressById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default addressSlice.reducer;