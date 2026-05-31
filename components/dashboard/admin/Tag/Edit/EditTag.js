"use client";

import { useEffect, useState } from "react";
import { Box, Paper, Typography, Divider, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams  } from "next/navigation";

import { fetchTagById, updateTag } from "@/slice/tagSlice";

import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import FormButton from "@/components/form/FormButton";

import styles from "./tagstyles"; // adjust path if needed

// 🔥 slug generator
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

export default function EditTagPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams (); // ✅ get id from URL

      const id = searchParams.get('id')
    
    
  const { current, loading } = useSelector((state) => state.tags);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    status: "active",
  });

  const [errors, setErrors] = useState({});

  // ================= FETCH TAG =================
  useEffect(() => {
    if (id) {
      dispatch(fetchTagById(id));
    }
  }, [id, dispatch]);

  // ================= SET DATA =================
  useEffect(() => {
    if (current) {
      setForm({
        name: current.name || "",
        slug: current.slug || "",
        status: current.status || "active",
      });
    }
  }, [current]);

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

    const res = await dispatch(
      updateTag({
        id:id,
        tagData: form,
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      router.push("/dashboard/admin/tags/list"); // ✅ redirect after update
    }
  };

  return (
    <Box sx={styles.page}>
      {/* HEADER */}
      <Box sx={styles.header}>
        <Typography sx={styles.title}>Edit Tag</Typography>

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
              {loading ? "Updating..." : "Update Tag"}
            </FormButton>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}