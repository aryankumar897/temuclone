// slice/attributeSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// ================= FETCH SINGLE ATTRIBUTE =================
export const fetchAttributeById = createAsyncThunk(
  "attributes/fetchAttributeById",
  async (id) => {
    try {
      const response = await fetch(`${process.env.API}/admin/attributes/${id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch attribute: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      toast.error(`Error loading attribute: ${error.message}`);
      throw error;
    }
  }
);

// ================= FETCH ALL ATTRIBUTES =================
export const fetchAttributes = createAsyncThunk(
  "attributes/fetchAttributes",
  async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/attributes`);

      if (!response.ok) {
        throw new Error(`Failed to fetch attributes: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      toast.error(`Error loading attributes: ${error.message}`);
      throw error;
    }
  }
);

// ================= CREATE ATTRIBUTE =================
export const createAttribute = createAsyncThunk(
  "attributes/createAttribute",
  async (attributeData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.API}/admin/attributes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attributeData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Attribute created successfully");
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// ================= UPDATE ATTRIBUTE =================
export const updateAttribute = createAsyncThunk(
  "attributes/updateAttribute",
  async ({ id, attributeData }) => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/attributes/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(attributeData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update attribute: ${response.status}`);
      }

      const data = await response.json();

      toast.success("Attribute updated successfully!");
      return data;
    } catch (error) {
      toast.error(`Error updating attribute: ${error.message}`);
      throw error;
    }
  }
);

// ================= DELETE ATTRIBUTE =================
export const deleteAttribute = createAsyncThunk(
  "attributes/deleteAttribute",
  async (id) => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/attributes/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete attribute: ${response.status}`);
      }

      toast.success("Attribute deleted successfully!");
      return id;
    } catch (error) {
      toast.error(`Error deleting attribute: ${error.message}`);
      throw error;
    }
  }
);

// ================= SLICE =================
const attributeSlice = createSlice({
  name: "attributes",
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
      .addCase(createAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAttribute.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ALL
      .addCase(fetchAttributes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttributes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAttributes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE
      .addCase(updateAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAttribute.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.list.findIndex(
          (a) => a._id === action.payload._id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE
      .addCase(deleteAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAttribute.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(
          (a) => a._id !== action.payload
        );
      })
      .addCase(deleteAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // FETCH SINGLE
      .addCase(fetchAttributeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttributeById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;

        const index = state.list.findIndex(
          (a) => a._id === action.payload._id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(fetchAttributeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default attributeSlice.reducer;