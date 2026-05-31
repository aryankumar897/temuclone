"use client";

import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const MAX_VIDEO_SIZE = 20 * 1024 * 1024;

const FormFileUpload = ({ label = "Upload Media", onChange, value = [] }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (value?.length) {
      setItems((prev) => {
        // avoid overriding already uploaded items
        if (prev.length > 0) return prev;

        return value.map((item) => ({
          _id: item._id || item,
          url: item.url || item, // fallback if only id (optional)
          type: item.type || "image",
          loading: false,
        }));
      });
    }
  }, [value]);

  // ✅ VALIDATION
  const validateFile = (file) => {
    if (file.type.startsWith("image")) {
      if (file.size > MAX_IMAGE_SIZE) {
        toast.error(`${file.name} too large (max 2MB)`);
        return false;
      }
    } else if (file.type.startsWith("video")) {
      if (file.size > MAX_VIDEO_SIZE) {
        toast.error(`${file.name} too large (max 20MB)`);
        return false;
      }
    } else {
      toast.error("Only image/video allowed");
      return false;
    }
    return true;
  };

  // 🔥 UPLOAD
  const uploadFile = async (file, index) => {
    const formData = new FormData();
    formData.append("files", file);

    const toastId = toast.loading(`Uploading ${file.name}...`);

    try {
      const res = await fetch(`${process.env.API}/admin/media`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      const uploaded = data[0];

      setItems((prev) => {
        const updated = [...prev];

        updated[index] = {
          ...uploaded,
          loading: false,
          type: uploaded.type || "image",
        };

        // ✅ FIXED (no stale state)
        onChange(updated.map((i) => i?._id).filter(Boolean));

        return updated;
      });

      toast.success(`${file.name} uploaded`, { id: toastId });
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error(`${file.name} upload failed`, { id: toastId });

      // ❗ remove failed item
      setItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // 🔥 HANDLE FILES
  const handleFiles = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    const validFiles = fileArray.filter(validateFile);

    if (!validFiles.length) return;

    const newItems = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
      loading: true,
    }));

    const startIndex = items.length;

    setItems((prev) => [...prev, ...newItems]);

    newItems.forEach((item, i) => {
      uploadFile(item.file, startIndex + i);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
  };

  // 🔥 DELETE
  const handleDelete = async (index) => {
    const item = items[index];

    const toastId = toast.loading("Deleting...");

    try {
      if (item?._id) {
        const res = await fetch(`${process.env.API}/admin/media/${item._id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err?.error || "Delete failed");
        }
      }

      setItems((prev) => {
        const updated = prev.filter((_, i) => i !== index);

        // ✅ FIXED state sync
        onChange(updated.map((i) => i?._id).filter(Boolean));

        return updated;
      });

      toast.success("Deleted successfully", { id: toastId });
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.message || "Delete failed", { id: toastId });
    }
  };

  return (
    <Box>
      {/* ✅ TOASTER */}

      {/* DROP ZONE */}
      <Box
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        sx={{
          border: "2px dashed #f06b18",
          p: 4,
          textAlign: "center",
          cursor: "pointer",
          mt: 3,
          borderRadius: 2,
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 40, color: "#f06b18" }} />
        <Typography>{label}</Typography>

        <input
          type="file"
          multiple
          hidden
          id="fileInput"
          accept="image/*,video/*"
          onChange={handleChange}
        />

        <label htmlFor="fileInput">
          <Typography variant="caption">Click or Drag & Drop</Typography>
        </label>
      </Box>

      {/* GRID */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          gap: 2,
          mt: 2,
        }}
      >
        {items.map((item, i) => (
          <Box
            key={i}
            sx={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid #ddd",
            }}
          >
            {/* IMAGE */}
            {item.type === "image" && (
              <img
                src={item.url}
                style={{
                  width: "100%",
                  height: 100,
                  objectFit: "cover",
                }}
              />
            )}

            {/* VIDEO */}
            {item.type === "video" && (
              <video
                src={item.url}
                style={{
                  width: "100%",
                  height: 100,
                  objectFit: "cover",
                }}
                controls
              />
            )}

            {/* LOADER */}
            {item.loading && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={24} />
              </Box>
            )}

            {/* DELETE */}
            {!item.loading && (
              <IconButton
                size="small"
                onClick={() => handleDelete(i)}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  background: "#fff",
                }}
              >
                <DeleteIcon color="error" fontSize="small" />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FormFileUpload;
