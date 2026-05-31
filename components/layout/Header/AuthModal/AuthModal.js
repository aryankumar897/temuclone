"use client";

import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";

import authStyles from "./AuthModalstyles";

export default function AuthModal({
  open,
  onClose,
  setEmail,
  email,
  onContinue,
  onOpenSignIn,
}) {
 // const [inputValue, setInputValue] = useState("");

  // handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
   // setEmail(value); // send to parent
  };

  // handle continue click
  const handleContinue = () => {
    if (!email.trim()) return; // prevent empty submit
    onContinue();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{ sx: authStyles.paper }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.5)", // darker overlay
          backdropFilter: "blur(6px)", // 🔥 glass effect
        },
      }}
    >
      <DialogContent sx={{ position: "relative" }}>
        {/* CLOSE */}
        <IconButton onClick={onClose} sx={authStyles.closeBtn}>
          <CloseIcon fontSize="small" />
        </IconButton>

        {/* TITLE */}
        <Typography sx={authStyles.title}>Sign in / Register</Typography>

        {/* SECURITY */}
        <Box sx={authStyles.securityRow}>
          <LockIcon sx={{ fontSize: "16px" }} />
          <span>All data is safeguarded</span>
        </Box>

        {/* FEATURES */}
        <Box sx={authStyles.featuresRow}>
          <Box sx={authStyles.featureBox}>
            <Box sx={authStyles.featureCircle}>
              <LocalShippingOutlinedIcon fontSize="small" />
            </Box>
            <Typography sx={authStyles.featureTitle}>Free shipping</Typography>
            <Typography sx={authStyles.featureSub}>Incredible</Typography>
          </Box>

          <Box sx={authStyles.featureBox}>
            <Box sx={authStyles.featureCircle}>
              <AssignmentReturnOutlinedIcon fontSize="small" />
            </Box>
            <Typography sx={authStyles.featureTitle}>Free returns</Typography>
            <Typography sx={authStyles.featureSub}>Up to 90 days</Typography>
          </Box>
        </Box>

        {/* INPUT LABEL */}
        <Typography sx={authStyles.inputLabel}>
          Email or phone number
        </Typography>

        {/* INPUT */}
        <TextField
          fullWidth
          type="email"
          value={email}
          onChange={handleChange}
        />

        {/* BUTTON */}
        <Button
          fullWidth
          sx={authStyles.continueBtn}
          onClick={handleContinue}
          disabled={!email.trim()} // 🔥 UX improvement
        >
          Continue
        </Button>

        {/* HELP */}
        <Typography sx={authStyles.helpText}>Trouble signing in?</Typography>

        <Typography
          sx={authStyles.helpText}
          onClick={() => {
            onClose(); // close auth modal
            setTimeout(() => {
              onOpenSignIn(); // open sign in
            }, 200);
          }}
        >
          Already have an account? Sign in
        </Typography>
        {/* DIVIDER */}
        <Divider sx={authStyles.divider}>Or continue with other ways</Divider>

        {/* SOCIAL */}
        <Box sx={authStyles.socialRow}>
          <Box sx={authStyles.socialIcon}>
            <GoogleIcon sx={authStyles.google} />
          </Box>

          <Box sx={authStyles.socialIcon}>
            <FacebookIcon sx={authStyles.facebook} />
          </Box>

          <Box sx={authStyles.socialIcon}>
            <AppleIcon sx={authStyles.apple} />
          </Box>
        </Box>

        {/* FOOTER */}
        <Typography sx={authStyles.footer}>
          By continuing, you agree to our Terms of Use and acknowledge that you
          have read our Privacy Policy.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
