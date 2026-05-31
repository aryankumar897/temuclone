"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import toast from "react-hot-toast";

import FormPassword from "@/components/form/FormPassword";
import FormButton from "@/components/form/FormButton";

import { changePasswordStyles as sx } from "./changePasswordStyles";


// ✅ strength function
const getPasswordStrength = (password) => {
  let score = 0;
  if (!password) return null;

  if (password.length >= 6) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1)
    return {
      label: "Weak",
      width: "25%",
      color: "#ef4444",
      gradient: "linear-gradient(90deg,#ef4444,#f87171)",
    };

  if (score === 2)
    return {
      label: "Medium",
      width: "50%",
      color: "#f59e0b",
      gradient: "linear-gradient(90deg,#f59e0b,#fbbf24)",
    };

  if (score === 3)
    return {
      label: "Strong",
      width: "75%",
      color: "#10b981",
      gradient: "linear-gradient(90deg,#10b981,#34d399)",
    };

  return {
    label: "Very Strong",
    width: "100%",
    color: "#059669",
    gradient: "linear-gradient(90deg,#059669,#22c55e)",
  };
};

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(formData.newPassword);

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // validation
  const validate = () => {
    let newErrors = {};

    if (!formData.currentPassword)
      newErrors.currentPassword = "Current password required";

    if (!formData.newPassword)
      newErrors.newPassword = "New password required";

    if (formData.confirmPassword !== formData.newPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch(`${process.env.API}/admin/change-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Password updated 🔐");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={sx.wrapper}>
      <Typography sx={sx.headerTitle}>
        Change Password
      </Typography>

      <Typography sx={sx.infoBox}>
        Make sure your password is strong and secure.
      </Typography>

      <Box sx={sx.formGrid}>
        <FormPassword
          label="Current Password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
          helperText={errors.currentPassword}
        />

        <FormPassword
          label="New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          helperText={errors.newPassword}
        />

        {/* 🔥 Animated Strength Bar */}
        {strength && (
          <Box sx={sx.strengthWrapper}>
            <Box sx={sx.strengthBarBg}>
              <Box
                sx={sx.strengthBarFill(
                  strength.width,
                  strength.gradient
                )}
              />
            </Box>

            <Typography sx={sx.strengthText(strength.color)}>
              {strength.label}
            </Typography>
          </Box>
        )}

        <FormPassword
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
      </Box>

      <Box sx={sx.buttonWrap}>
        <FormButton onClick={handleSubmit} disabled={loading}>
          {loading ? "Updating..." : "Change Password"}
        </FormButton>
      </Box>
    </Box>
  );
};

export default ChangePassword;