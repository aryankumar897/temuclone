"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  IconButton,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";

import {
  fetchAttributeById,
  updateAttribute,
} from "@/slice/attributeSlice";

import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import FormButton from "@/components/form/FormButton";

import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./attributestyles";

// 🔥 slug generator
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

export default function AttributeEdit() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const { current, loading } = useSelector(
    (state) => state.attributes
  );

  const [form, setForm] = useState({
    name: "",
    slug: "",
    type: "select",
    isVariant: true,
    values: [{ value: "", label: "" }],
  });

  const [errors, setErrors] = useState({});

  // ================= FETCH ATTRIBUTE =================
  useEffect(() => {
    if (id) {
      dispatch(fetchAttributeById(id));
    }
  }, [id, dispatch]);

  // ================= SET DATA =================
  useEffect(() => {
    if (current) {
      setForm({
        name: current.name || "",
        slug: current.slug || "",
        type: current.type || "select",
        isVariant: current.isVariant ?? true,
        values:
          current.values?.length > 0
            ? current.values
            : [{ value: "", label: "" }],
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
    } else if (name === "isVariant") {
      setForm((prev) => ({
        ...prev,
        isVariant: value === "true",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ================= HANDLE VALUES =================
  const handleValueChange = (index, field, value) => {
    const updated = [...form.values];
    updated[index][field] = value;

    setForm((prev) => ({
      ...prev,
      values: updated,
    }));
  };

  const addValue = () => {
    setForm((prev) => ({
      ...prev,
      values: [...prev.values, { value: "", label: "" }],
    }));
  };

  const removeValue = (index) => {
    const updated = form.values.filter((_, i) => i !== index);

    setForm((prev) => ({
      ...prev,
      values: updated,
    }));
  };

  // ================= VALIDATION =================
  const validate = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.slug) newErrors.slug = "Slug is required";

    if (form.type === "select") {
      const validValues = form.values.filter(
        (v) => v.value && v.label
      );

      if (validValues.length === 0) {
        newErrors.values = "At least one valid value required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const res = await dispatch(
      updateAttribute({
        id,
        attributeData: form,
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      router.push("/dashboard/admin/attributes/list");
    }
  };

  return (
    <Box sx={styles.page}>
      {/* HEADER */}
      <Box sx={styles.header}>
        <Typography sx={styles.title}>
          Edit Attribute
        </Typography>

        <Button variant="contained" onClick={() => router.back()}>
          ← Go Back
        </Button>
      </Box>

      {/* CARD */}
      <Paper sx={styles.card}>
        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <FormInput
            label="Attribute Name"
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

          {/* TYPE */}
          <FormSelect
            label="Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            options={[
              { label: "Select", value: "select" },
              { label: "Text", value: "text" },
              { label: "Number", value: "number" },
              { label: "Color", value: "color" },
            ]}
            sx={{ mt: 2 }}
          />

          {/* VARIANT */}
          <FormSelect
            label="Used for Variants"
            name="isVariant"
            value={form.isVariant.toString()}
            onChange={handleChange}
            options={[
              { label: "Yes", value: "true" },
              { label: "No", value: "false" },
            ]}
            sx={{ mt: 2 }}
          />

          {/* 🔥 VALUES */}
          {form.type === "select" && (
            <>
              <Typography mt={2}>Values</Typography>

              {form.values.map((v, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", gap: 1, mt: 1 }}
                >
                  <FormInput
                    label="Value"
                    value={v.value}
                    onChange={(e) =>
                      handleValueChange(
                        index,
                        "value",
                        e.target.value
                      )
                    }
                  />

                  <FormInput
                    label="Label"
                    value={v.label}
                    onChange={(e) =>
                      handleValueChange(
                        index,
                        "label",
                        e.target.value
                      )
                    }
                  />

                  <IconButton
                    onClick={() => removeValue(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}

              <Button sx={{ mt: 1 }} onClick={addValue}>
                + Add Value
              </Button>
            </>
          )}

          <Divider sx={styles.divider} />

          <Box sx={styles.actions}>
            <FormButton type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Attribute"}
            </FormButton>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}