"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import toast from "react-hot-toast";

import FormInput from "@/components/form/FormInput";
import FormButton from "@/components/form/FormButton";
import FormTextarea from "@/components/form/FormTextarea";
import { profileUpdateStyles as sx } from "./profileUpdateStyles";

const VendorProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    logo: "",
    banner: "",
    short_description: "",
    long_description: "",
  });

  const [errors, setErrors] = useState({});
  const [logoPreview, setLogoPreview] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Store Profile
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(`${process.env.API}/vendors/store-profile`);
      const data = await res.json();

      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        logo: data.logo || "",
        banner: data.banner || "",
        short_description: data.short_description || "",
        long_description: data.long_description || "",
      });

      setLogoPreview(data.logo);
      setBannerPreview(data.banner);
    };

    fetchProfile();
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ✅ Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Store name required";
    if (!formData.email) newErrors.email = "Email required";
    if (!formData.phone) newErrors.phone = "Phone required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Upload Image (logo/banner)
  const uploadImage = async (file, type) => {
    const formDataImg = new FormData();
    formDataImg.append("file", file);
    formDataImg.append("upload_preset", "ml_default");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formDataImg,
      },
    );

    const data = await res.json();

    setFormData((prev) => ({
      ...prev,
      [type]: data.secure_url,
    }));

    toast.success(`${type} uploaded ✅`);
  };

  // ✅ Handle Logo Upload
  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogoPreview(URL.createObjectURL(file));
    try {
      await uploadImage(file, "logo");
    } catch {
      toast.error("Logo upload failed ❌");
    }
  };

  // ✅ Handle Banner Upload
  const handleBannerChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBannerPreview(URL.createObjectURL(file));
    try {
      await uploadImage(file, "banner");
    } catch {
      toast.error("Banner upload failed ❌");
    }
  };

  // ✅ Submit
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch(`${process.env.API}/vendors/store-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Store profile updated ✅");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={sx.wrapper}>
      <Typography sx={sx.headerTitle}>Update Store Profile</Typography>

      {/* ✅ LOGO */}
      <Box sx={sx.avatarWrapper}>
        <Avatar src={logoPreview} sx={sx.avatar} />

        <input
          id="upload-logo"
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          style={sx.hiddenInput}
        />

        <label htmlFor="upload-logo">
          <Box sx={sx.uploadBtn}>Upload Logo</Box>
        </label>
      </Box>

      {/* ✅ BANNER */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        {bannerPreview && (
          <img
            src={bannerPreview}
            alt="banner"
            style={{ width: "100%", borderRadius: 10 }}
          />
        )}

        <input
          id="upload-banner"
          type="file"
          accept="image/*"
          onChange={handleBannerChange}
          style={sx.hiddenInput}
        />

        <label htmlFor="upload-banner">
          <Box sx={sx.uploadBtn}>Upload Banner</Box>
        </label>
      </Box>

      {/* ✅ FORM */}
      <Box sx={sx.formGrid}>
        <FormInput
          label="Store Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          helperText={errors.name}
        />

        <FormInput
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          helperText={errors.email}
        />

        <FormInput
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          helperText={errors.phone}
        />

        <FormTextarea
          label="Short Description"
          name="short_description"
          value={formData.short_description}
          onChange={handleChange}
          rows={3}
        />

        <FormTextarea
          label="Long Description"
          name="long_description"
          value={formData.long_description}
          onChange={handleChange}
          rows={5}
        />
      </Box>

      {/* ✅ SUBMIT */}
      <Box sx={sx.buttonWrap}>
        <FormButton onClick={handleSubmit} disabled={loading}>
          {loading ? "Updating..." : "Update Store"}
        </FormButton>
      </Box>
    </Box>
  );
};

export default VendorProfile;
