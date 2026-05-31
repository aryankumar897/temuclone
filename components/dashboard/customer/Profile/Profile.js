"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import toast from "react-hot-toast";

import FormInput from "@/components/form/FormInput";
import FormButton from "@/components/form/FormButton";

import { profileUpdateStyles as sx } from "./profileUpdateStyles";

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profile_image: "",
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(`${process.env.API}/customer/profile`);
      const data = await res.json();

      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        profile_image: data.profile_image || "",
      });

      setPreview(data.profile_image);
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

    // remove error on typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ✅ Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Upload image
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    try {
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
        profile_image: data.secure_url,
      }));

      toast.success("Image uploaded ✅");
    } catch {
      toast.error("Upload failed ❌");
    }
  };

  // ✅ Submit
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch(`${process.env.API}/customer/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Profile updated ✅");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={sx.wrapper}>
      <Typography sx={sx.headerTitle}>Update Profile</Typography>

      {/* ✅ Avatar */}
      <Box sx={sx.avatarWrapper}>
        <Avatar src={preview} sx={sx.avatar} />

        {/* hidden input */}
        <input
          id="upload-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={sx.hiddenInput}
        />

        {/* styled button */}
        <label htmlFor="upload-image">
          <Box sx={sx.uploadBtn}>Upload Photo</Box>
        </label>
      </Box>

      {/* ✅ Form */}
      <Box sx={sx.formGrid}>
        <FormInput
          label="Full Name"
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
      </Box>

      {/* ✅ Submit */}
      <Box sx={sx.buttonWrap}>
        <FormButton onClick={handleSubmit} disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </FormButton>
      </Box>
    </Box>
  );
};

export default ProfileUpdate;
