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

import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";

import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import styles from "./SignInModalstyles";

export default function SignInModal({ open, onClose, onBack }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push("/");
  //   }
  // }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Login successful 🎉");
        router.push("/");
        onClose(); // close modal after login
      }
    } catch (err) {

      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = (provider) => {
    signIn(provider);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.5)", // darker overlay
          backdropFilter: "blur(6px)", // 🔥 glass effect
        },
      }}
    >
      <DialogContent sx={styles.paper}>
        {/* HEADER */}
        <Box sx={styles.header}>
          <Box sx={styles.back} onClick={onBack}>
            <ArrowBackIcon sx={{ fontSize: 18 }} />
            Back
          </Box>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* TITLE */}
        <Typography sx={styles.title}>Sign in</Typography>

        {/* SECURITY */}
        <Box sx={styles.securityRow}>
          <LockIcon sx={{ fontSize: 16 }} />
          <Typography>All data is safeguarded</Typography>
        </Box>

        {/* FEATURES */}
        <Box sx={styles.features}>
          <Box sx={styles.featureItem}>
            <ShieldOutlinedIcon sx={styles.featureIcon} />
            <Box>
              <Typography sx={styles.featureTitle}>Price adjustment</Typography>
              <Typography sx={styles.featureSub}>Within 30 days</Typography>
            </Box>
          </Box>

          <Box sx={styles.separator} />

          <Box sx={styles.featureItem}>
            <LocalShippingOutlinedIcon sx={styles.featureIcon} />
            <Box>
              <Typography sx={styles.featureTitle}>Free shipping</Typography>
              <Typography sx={styles.featureSub}>Special for you</Typography>
            </Box>
          </Box>

          <Box sx={styles.separator} />

          <Box sx={styles.featureItem}>
            <AssignmentReturnOutlinedIcon sx={styles.featureIcon} />
            <Box>
              <Typography sx={styles.featureTitle}>Free returns</Typography>
              <Typography sx={styles.featureSub}>Up to 90 days</Typography>
            </Box>
          </Box>

          <Box sx={styles.separator} />

          <Box sx={styles.featureItem}>
            <VerifiedOutlinedIcon sx={styles.featureIcon} />
            <Box>
              <Typography sx={styles.featureTitle}>
                Delivery guarantee
              </Typography>
              <Typography sx={styles.featureSub}>
                Refund for any issue
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* MAIN */}
        <Box sx={styles.main}>
          {/* LEFT */}

          <Box sx={styles.left} component="form" onSubmit={handleSubmit}>
            <Typography sx={styles.label}>Email</Typography>

            <TextField
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={styles.input}
            />

            <Typography sx={styles.label}>Password</Typography>

            <TextField
              fullWidth
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={styles.input}
            />

            <Typography sx={styles.forgot}>Forgot password?</Typography>

            <Button fullWidth sx={styles.signBtn} disabled={loading}
            
              type="submit"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </Box>

          {/* CENTER DIVIDER */}
          <Box sx={styles.centerDivider}>
            <Divider orientation="vertical" flexItem />
            <Typography sx={styles.or}>OR</Typography>
            <Divider orientation="vertical" flexItem />
          </Box>

          {/* RIGHT */}
          <Box sx={styles.right}>
            <Button
              sx={styles.socialBtn}
              onClick={() => handleSocial("google")}
            >
              <GoogleIcon sx={styles.google} />
              Continue with Google
            </Button>

            <Button
              sx={styles.socialBtn}
              onClick={() => handleSocial("facebook")}
            >
              <FacebookIcon sx={styles.facebook} />
              Continue with Facebook
            </Button>

            <Button sx={styles.socialBtn} onClick={() => handleSocial("apple")}>
              <AppleIcon sx={styles.apple} />
              Continue with Apple
            </Button>
          </Box>
        </Box>

        {/* FOOTER */}
        <Typography sx={styles.trouble}>Trouble signing in?</Typography>

        <Typography sx={styles.footer}>
          By signing in or continuing, you agree to our Terms of Use and Privacy
          Policy.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
