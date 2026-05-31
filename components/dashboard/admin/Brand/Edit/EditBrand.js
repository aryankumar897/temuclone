"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import {
  fetchBrandById,
  updateBrand,
} from "@/slice/brandSlice";

import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import FormButton from "@/components/form/FormButton";

import styles from "./brandstyles";

// 🔥 slug generator
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

export default function EditBrandPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const { current, loading } = useSelector(
    (state) => state.brands
  );

  const [form, setForm] = useState({
    name: "",
    slug: "",
    logo: "",
    status: "active",
  });

  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  // ================= FETCH BRAND =================
  useEffect(() => {
    if (id) {
      dispatch(fetchBrandById(id));
    }
  }, [id, dispatch]);

  // ================= SET DATA =================
  useEffect(() => {
    if (current) {
      setForm({
        name: current.name || "",
        slug: current.slug || "",
        logo: current.logo || "",
        status: current.status || "active",
      });

      setPreview(current.logo || "");
    }
  }, [current]);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setForm((prev) => ({
        ...prev,
        name: value,
        slug: slugify(value),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ================= IMAGE UPLOAD =================
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const formDataImg = new FormData();
      formDataImg.append("file", file);
      formDataImg.append("upload_preset", "ml_default");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formDataImg,
        }
      );

      const data = await res.json();

      setForm((prev) => ({
        ...prev,
        logo: data.secure_url,
      }));

      toast.success("Logo updated ✅");
    } catch {
      toast.error("Upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  // ================= VALIDATION =================
  const validate = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.slug) newErrors.slug = "Slug is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const res = await dispatch(
      updateBrand({
        id: id,
        brandData: form,
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      router.push("/dashboard/admin/brands/list");
    }
  };

  return (
    <Box sx={styles.page}>
      {/* HEADER */}
      <Box sx={styles.header}>
        <Typography sx={styles.title}>
          Edit Brand
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => router.back()}
        >
          ← Go Back
        </Button>
      </Box>

      {/* CARD */}
      <Paper sx={styles.card}>
        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <FormInput
            label="Brand Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            helperText={errors.name}
          />

          {/* SLUG */}
          <FormInput
            label="Slug"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            error={errors.slug}
            helperText={errors.slug}
            sx={{ mt: 2 }}
          />

          {/* STATUS */}
          <FormSelect
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
            sx={{ mt: 2 }}
          />

          {/* ✅ AVATAR LOGO */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Brand Logo
            </Typography>

            <Box sx={styles.avatarWrapper}>
              <Avatar
                src={preview || form.logo}
                sx={styles.avatar}
              >
                {!preview && !form.logo && "B"}
              </Avatar>

              <input
                id="upload-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={styles.hiddenInput}
              />

              <label htmlFor="upload-image">
                <Box sx={styles.uploadBtn}>
                  {uploading ? "Uploading..." : "Change Logo"}
                </Box>
              </label>
            </Box>
          </Box>

          <Divider sx={styles.divider} />

          {/* ACTION */}
          <Box sx={styles.actions}>
            <FormButton
              type="submit"
              disabled={loading || uploading}
            >
              {uploading
                ? "Uploading..."
                : loading
                ? "Updating..."
                : "Update Brand"}
            </FormButton>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}