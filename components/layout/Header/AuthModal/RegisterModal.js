"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useEffect } from "react";

import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";

import registerStyles from "./RegisterModalstyles";
import toast from "react-hot-toast";
export default function RegisterModal({
  open,
  onClose,
  onBack,
  email,
  setEmail,
  onVerify,
}) {
  // ✅ STATE
  const [formData, setFormData] = useState({
    email: email || "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email) {
      setFormData((prev) => ({
        ...prev,
        email: email,
      }));
    }
  }, [email]);
  // ✅ HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ HANDLE SUBMIT

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!onVerify) return; // ✅ keep your safety check

    setLoading(true);

    // ✅ your validations (same as before)
    if (formData && !formData.email) {
      toast.error("Please enter your email");
      return setLoading(false);
    }

    if (!formData.password) {
      toast.error("Please enter a password");
      return setLoading(false);
    }

    try {
      const res = await fetch(`${process.env.API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.err || "Registration failed");
      }

      toast.success(data.msg || "Registered successfully 🎉");
      setFormData({
        email: "",
        password: "",
      });
     setEmail("")
      // ✅ 🔥 KEEP YOUR FLOW
      onVerify();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{ sx: registerStyles.paper }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.5)", // darker overlay
          backdropFilter: "blur(6px)", // 🔥 glass effect
        },
      }}
    >
      <DialogContent>
        {/* HEADER */}
        <Box sx={registerStyles.headerRow}>
          <Box sx={registerStyles.back} onClick={onBack}>
            <ArrowBackIcon fontSize="small" /> Back
          </Box>

          <IconButton onClick={onClose} sx={registerStyles.closeBtn}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* TITLE */}
        <Typography sx={registerStyles.title}>Register</Typography>

        {/* SECURITY */}
        <Box sx={registerStyles.securityRow}>
          <LockIcon sx={{ fontSize: "16px" }} />
          <span>All data is safeguarded</span>
        </Box>

        {/* TEXT */}
        <Typography sx={registerStyles.sectionTitle}>
          Create your account
        </Typography>

        <Typography sx={registerStyles.sectionSub}>
          Registration is easy, just fill in the password.
        </Typography>

        {/* EMAIL */}
        <Typography sx={registerStyles.label}>Email</Typography>
        <TextField
          fullWidth
          value={formData.email}
          disabled
          sx={registerStyles.input}
        />

        {/* PASSWORD */}
        <Typography sx={registerStyles.label}>Password</Typography>
        <TextField
          fullWidth
          placeholder="Password: Minimum 8 characters required"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          sx={registerStyles.input}
        />

        {/* PASSWORD INFO */}
        <Typography sx={registerStyles.passwordHint}>
          <strong>Password quality:</strong> - <br />
          Don't use a password from another site, or something too obvious like
          your pet's name.
        </Typography>

        {/* BUTTON */}
        {/* <Button
          fullWidth
          sx={registerStyles.registerBtn}
          onClick={() => {
            if (!onVerify) return; // safety check
            onVerify();
          }}
        >
          Register
        </Button> */}

        <Button
          fullWidth
          sx={registerStyles.registerBtn}
          onClick={handleRegister}
        >
          Register
        </Button>

        {/* FOOTER */}
        <Typography sx={registerStyles.footer}>
          By clicking Register, you agree to our Terms of Use and acknowledge
          that you have read our Privacy Policy.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
