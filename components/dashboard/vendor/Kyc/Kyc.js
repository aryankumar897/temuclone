"use client";

import { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import toast from "react-hot-toast";

import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import FormTextarea from "@/components/form/FormTextarea";
import FormDatePicker from "@/components/form/FormDatePicker";
import FormButton from "@/components/form/FormButton";

import { kycStyles } from "./kycStyles";

const KycForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: null,
    gender: "",
    full_address: "",
    document_type: "",
    document_number: "",
    document_scan_copy: null,
  });

  const [loading, setLoading] = useState(false);

  // ======================
  // INPUT CHANGE
  // ======================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ======================
  // DATE CHANGE
  // ======================
  const handleDateChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      date_of_birth: value,
    }));
  };

  // ======================
  // FILE CHANGE
  // ======================
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      document_scan_copy: file,
    }));
  };

  // ======================
  // SUBMIT
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // =========================
      // 1. UPLOAD IMAGE TO CLOUDINARY
      // =========================
      const imageData = new FormData();

      imageData.append("file", formData.document_scan_copy);

      imageData.append("upload_preset", "ml_default");

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: imageData,
        },
      );

      const cloudinaryData = await cloudinaryRes.json();

      console.log(cloudinaryData);

      // =========================
      // CLOUDINARY IMAGE URL
      // =========================
      const imageUrl = cloudinaryData.secure_url;

      // =========================
      // 2. SEND DATA TO SERVER
      // =========================
      const res = await fetch("/api/kyc-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          date_of_birth: formData.date_of_birth,
          gender: formData.gender,
          full_address: formData.full_address,
          document_type: formData.document_type,
          document_number: formData.document_number,

          // SAVE URL
          document_scan_copy: imageUrl,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("KYC Submitted Successfully 🚀");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={kycStyles.formContainer}>
      <Box component="form" onSubmit={handleSubmit} sx={kycStyles.formWrapper}>
        <Typography variant="h5">KYC Verification</Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormInput
              label="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormDatePicker
              label="Date of Birth"
              value={formData.date_of_birth}
              onChange={handleDateChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormSelect
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[
                {
                  label: "Male",
                  value: "male",
                },
                {
                  label: "Female",
                  value: "female",
                },
                {
                  label: "Other",
                  value: "other",
                },
              ]}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormSelect
              label="Document Type"
              name="document_type"
              value={formData.document_type}
              onChange={handleChange}
              options={[
                {
                  label: "Aadhar Card",
                  value: "aadhar",
                },
                {
                  label: "PAN Card",
                  value: "pan",
                },
                {
                  label: "Passport",
                  value: "passport",
                },
              ]}
            />
          </Grid>

          <Grid size={12}>
            <FormInput
              label="Document Number"
              name="document_number"
              value={formData.document_number}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={12}>
            <FormTextarea
              label="Full Address"
              name="full_address"
              value={formData.full_address}
              onChange={handleChange}
            />
          </Grid>

          {/* NORMAL INPUT */}
          <Grid size={12}>
            <Grid size={12}>
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                  }}
                >
                  Upload Document
                </Typography>

                <Box
                  component="label"
                  sx={{
                    border: "2px dashed #ccc",
                    borderRadius: "12px",
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "0.3s",
                    backgroundColor: "#fafafa",

                    "&:hover": {
                      borderColor: "#1976d2",
                      backgroundColor: "#f5f9ff",
                    },
                  }}
                >
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />

                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    Click to Upload
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    PNG, JPG, JPEG
                  </Typography>

                  {formData.document_scan_copy && (
                    <Typography
                      sx={{
                        mt: 2,
                        color: "green",
                        fontWeight: 600,
                      }}
                    >
                      {formData.document_scan_copy.name}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid size={12}>
            <FormButton type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit KYC"}
            </FormButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default KycForm;
