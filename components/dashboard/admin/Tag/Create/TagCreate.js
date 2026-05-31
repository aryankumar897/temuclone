"use client";

import { useState } from "react";
import { Box, Paper, Typography, Divider, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // ✅ import router
import { createTag } from "@/slice/tagSlice";

import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import FormButton from "@/components/form/FormButton";

import styles from "./tagstyles";

// 🔥 slug generator
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

export default function CreateTagPage() {
  const dispatch = useDispatch();
  const router = useRouter(); // ✅ init router
  const { loading } = useSelector((state) => state.tags);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    status: "active",
  });

  const [errors, setErrors] = useState({});

  // ================= HANDLE CHANGE =================
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

    const res = await dispatch(createTag(form));

    if (res.meta.requestStatus === "fulfilled") {
      setForm({
        name: "",
        slug: "",
        status: "active",
      });
    }
  };

  return (
    <Box sx={styles.page}>
      {/* HEADER */}
      <Box sx={styles.header}>
        <Typography sx={styles.title}>Create Tag</Typography>

        {/* ✅ GO BACK BUTTON */}
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
            label="Tag Name"
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

          <Divider sx={styles.divider} />

          {/* ACTION */}
          <Box sx={styles.actions}>
            <FormButton type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Tag"}
            </FormButton>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}