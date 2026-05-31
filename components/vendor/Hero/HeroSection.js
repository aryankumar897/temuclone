"use client";

import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { heroStyles } from "./HeroStyles";

// ✅ import your reusable components
import FormInput from "@/components/form/FormInput";
import FormPassword from "@/components/form/FormPassword";
import FormSelect from "@/components/form/FormSelect";
import WhySellSection from "@/components/vendor/WhySellSection";
import toast from 'react-hot-toast';

import SellerSuccess from "@/components/vendor/Hero/SellerCard/SellerSuccess";
export default function HeroSection() {
  const [formData, setFormData] = useState({
    country: "US",
    email: "",
    password: "",
    confirmPassword: "",
  });

    const [loading,setLoading]=useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!formData.email) {
      toast.error("Please enter your email");
      return setLoading(false);
    }

    if (!formData.password) {
      toast.error("Please enter a password");
      return setLoading(false);
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return setLoading(false);
    }

    try {
      const res = await fetch(`${process.env.API}/vendor-register`, {
        // ✅ FIXED
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.err || "Registration failed");
      }

      toast.success(data.msg || "Registered successfully 🎉");

      setFormData({
        country: "US",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Box sx={heroStyles.container}>
        {/* Overlay */}
        <Box sx={heroStyles.overlay} />

        <Box sx={heroStyles.contentWrapper}>
          {/* LEFT */}
          <Box sx={heroStyles.left}>
            <Typography sx={heroStyles.heading}>
              Start Selling to <br />
              Millions of Buyers on Temu
            </Typography>

            <Box sx={heroStyles.featureList}>
              <Typography sx={heroStyles.featureItem}>
                ✔ Trending Platform
              </Typography>
              <Typography sx={heroStyles.featureItem}>
                ✔ Fast First Sale
              </Typography>
              <Typography sx={heroStyles.featureItem}>
                ✔ Cost-efficient from the Start
              </Typography>
              <Typography sx={heroStyles.featureItem}>
                ✔ Personalized Seller Support
              </Typography>
            </Box>
          </Box>

          {/* RIGHT (FORM) */}
          <Box sx={heroStyles.right}>
            <Box sx={heroStyles.card}    component="form" onSubmit={handleRegister}>
              <Typography variant="h6" mb={2}>
                Sign up
              </Typography>

              <Typography fontSize={13} mb={1}>
                Which country do you sell from?
              </Typography>

              {/* ✅ FormSelect */}
              <FormSelect
                label="Select country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                options={[
                  { label: "🇺🇸 United States seller", value: "US" },
                  { label: "🇮🇳 India seller", value: "IN" },
                ]}
              />

              <Box mt={2} />

              {/* ✅ FormInput */}
              <FormInput
                label="Email or phone number"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <Box mt={2} />

              {/* ✅ FormPassword */}
              <FormPassword
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />

              <Box mt={2} />

              {/* ✅ FormPassword */}
              <FormPassword
                label="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <Button fullWidth sx={heroStyles.button} type="submit">
                Register as seller
              </Button>

              <Typography fontSize={12} mt={1}>
                By continuing, you agree to our{" "}
                <span style={{ color: "#ff7a00" }}>Seller Privacy Policy</span>
              </Typography>

              <Typography fontSize={13} mt={1}>
                Already have an account?{" "}
                <span style={{ color: "#ff7a00", cursor: "pointer" }}>
                  Sign in
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* BOTTOM */}
        <Box sx={heroStyles.bottomBar}>
          <Typography sx={heroStyles.stat}>
            <strong>1 Minute</strong> <br /> Create your account
          </Typography>
          <Typography sx={heroStyles.stat}>
            <strong>10 Minutes</strong> <br /> Complete your application
          </Typography>
          <Typography sx={heroStyles.stat}>
            <strong>1 Day</strong> <br /> Receive application results
          </Typography>
        </Box>
      </Box>

      <WhySellSection />
      <SellerSuccess />
    </>
  );
}
