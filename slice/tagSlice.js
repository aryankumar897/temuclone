// slice/tagSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


import toast from 'react-hot-toast';

// ================= FETCH SINGLE TAG =================
export const fetchTagById = createAsyncThunk(
  "tags/fetchTagById",
  async (id) => {
    try {
      const response = await fetch(`${process.env.API}/admin/tags/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch tag: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      toast.error(`Error loading tag: ${error.message}`);
      throw error;
    }
  }
);

// ================= FETCH ALL TAGS =================
export const fetchTags = createAsyncThunk(
  "tags/fetchTags",
  async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/tags`);
      if (!response.ok) {
        throw new Error(`Failed to fetch tags: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      toast.error(`Error loading tags: ${error.message}`);
      throw error;
    }
  }
);

// ================= CREATE TAG =================
export const createTag = createAsyncThunk(
  "tags/createTag",
  async (tagData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.API}/admin/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tagData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Tag created successfully");
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// ================= UPDATE TAG =================
export const updateTag = createAsyncThunk(
  "tags/updateTag",
  async ({ id, tagData }) => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/tags/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tagData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update tag: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Tag updated successfully!");
      return data;
    } catch (error) {
      toast.error(`Error updating tag: ${error.message}`);
      throw error;
    }
  }
);

// ================= DELETE TAG =================
export const deleteTag = createAsyncThunk(
  "tags/deleteTag",
  async (id) => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/tags/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete tag: ${response.status}`);
      }

      toast.success("Tag deleted successfully!");
      return id;
    } catch (error) {
      toast.error(`Error deleting tag: ${error.message}`);
      throw error;
    }
  }
);

// ================= SLICE =================
const tagSlice = createSlice({
  name: "tags",
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
      .addCase(createTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ALL
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE
      .addCase(updateTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.list.findIndex(
          (t) => t._id === action.payload._id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE
      .addCase(deleteTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((t) => t._id !== action.payload);
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // FETCH SINGLE
      .addCase(fetchTagById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTagById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;

        const index = state.list.findIndex(
          (t) => t._id === action.payload._id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(fetchTagById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tagSlice.reducer;