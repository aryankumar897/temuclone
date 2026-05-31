// app/dashboard/admin/address/create/page.js

"use client";

import { useState } from "react";

import {
  Box,
  Typography,
  Divider,
  Grid,
  Button,
  MenuItem,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";

import { createAddress } from "@/slice/addressSlice";

import FormInput from "@/components/form/FormInput";
import FormTextarea from "@/components/form/FormTextarea";
import FormButton from "@/components/form/FormButton";

import styles from "./addressStyles";

export default function CreateAddressPage() {
  const dispatch = useDispatch();

  const router = useRouter();

  const { loading } = useSelector((state) => state.addresses);

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    alternate_phone: "",
    pincode: "",
    address_line_1: "",
    address_line_2: "",
    landmark: "",
    city: "",
    state: "",
    country: "India",
    address_type: "home",
    delivery_note: "",
    is_default: false,
 
  });

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= VALIDATION =================
  const validate = () => {
    let newErrors = {};

    if (!form.full_name) newErrors.full_name = "Name is required";

    if (!form.phone) newErrors.phone = "Phone is required";

    if (!form.city) newErrors.city = "City is required";

    if (!form.state) newErrors.state = "State is required";

    if (!form.pincode) newErrors.pincode = "Pincode is required";

    if (!form.address_line_1) newErrors.address_line_1 = "Address is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const res = await dispatch(createAddress(form));

    if (res.meta.requestStatus === "fulfilled") {
      router.push("/dashboard/customer/addresses/list");
    }
  };

  return (
    <Box sx={styles.page}>
      {/* HEADER */}
      <Box sx={styles.header}>
        <Typography sx={styles.title}>Create Address</Typography>

        <Button variant="contained" onClick={() => router.back()}>
          ← Go Back
        </Button>
      </Box>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormInput
              label="Full Name"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              error={errors.full_name}
              helperText={errors.full_name}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormInput
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
              helperText={errors.phone}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormInput
              label="Alternate Phone"
              name="alternate_phone"
              value={form.alternate_phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormInput
              label="Pincode"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              error={errors.pincode}
              helperText={errors.pincode}
            />
          </Grid>

          <Grid size={12}>
            <FormTextarea
              label="Address Line 1"
              name="address_line_1"
              value={form.address_line_1}
              onChange={handleChange}
              error={errors.address_line_1}
              helperText={errors.address_line_1}
            />
          </Grid>

          <Grid size={12}>
            <FormTextarea
              label="Address Line 2"
              name="address_line_2"
              value={form.address_line_2}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <FormInput
              label="Landmark"
              name="landmark"
              value={form.landmark}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <FormInput
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              error={errors.city}
              helperText={errors.city}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <FormInput
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
              error={errors.state}
              helperText={errors.state}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormInput
              label="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormInput
              select
              label="Address Type"
              name="address_type"
              value={form.address_type}
              onChange={handleChange}
            >
              <MenuItem value="home">Home</MenuItem>

              <MenuItem value="work">Work</MenuItem>

              <MenuItem value="other">Other</MenuItem>
            </FormInput>
          </Grid>

          <Grid size={12}>
            <FormTextarea
              label="Delivery Note"
              name="delivery_note"
              value={form.delivery_note}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Divider sx={styles.divider} />

        {/* ACTION */}
        <Box sx={styles.actions}>
          <FormButton type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Address"}
          </FormButton>
        </Box>
      </form>
    </Box>
  );
}
