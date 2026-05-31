"use client";

import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useRef } from "react";

import otpStyles from "./VerificationModalstyles";

export default function VerificationModal({ open, onClose, onBack, email }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
    
        BackdropProps={{
    sx: {
      backgroundColor: "rgba(0,0,0,0.5)", // darker overlay
      backdropFilter: "blur(6px)", // 🔥 glass effect
    },
  }}

    >
      <DialogContent sx={otpStyles.paper}>
        {/* HEADER */}
        <Box sx={otpStyles.header}>
          <Box sx={otpStyles.back} onClick={onBack}>
            <ArrowBackIcon fontSize="small" /> Back
          </Box>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* TITLE */}
        <Typography sx={otpStyles.title}>
          Enter the verification code
        </Typography>

        {/* DESC */}
        <Typography sx={otpStyles.desc}>
          To continue, complete this verification step. We've sent a
          verification code to <span style={{ color: "#ff6a00" }}>{email}</span>
          . Please enter it below.
        </Typography>

        {/* OTP INPUTS */}
        <Box sx={otpStyles.otpRow}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              style={otpStyles.otpInput}
              maxLength={1}
            />
          ))}
        </Box>

        {/* RESEND */}
        <Typography sx={otpStyles.resend}>50s Resend code</Typography>

        {/* HELP */}
        <Typography sx={otpStyles.helpTitle}>
          Didn't receive the email?
        </Typography>

        <Typography sx={otpStyles.helpText}>
          1. Make sure your email address is correct.
        </Typography>
        <Typography sx={otpStyles.helpText}>
          2. Please check your spam folder.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
