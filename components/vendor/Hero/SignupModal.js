"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import FormInput from "@/components/form/FormInput";
import FormPassword from "@/components/form/FormPassword";
import FormSelect from "@/components/form/FormSelect";

export default function SignupModal({ open, handleClose }) {
  // ✅ state updated
  const [formData, setFormData] = useState({
    country: "US",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const { status } = useSession();
  const router = useRouter();

  // ✅ redirect if logged in
  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push("/");
  //   }
  // }, [status, router]);

  // ✅ universal change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ submit logic (your login)
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
        handleClose();
      }
    } catch (err) {
       console.log( "(err)" ,err )
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // ✅ your existing validation (unchanged)
  const isMin = formData.password.length >= 8;
  const hasMix =
    /[A-Za-z]/.test(formData.password) &&
    /\d/.test(formData.password);
  const notEmailMatch =
    !formData.password.includes(formData.email.split("@")[0] || "");

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ p: 3, borderRadius: 3 }}>
        
        {/* CLOSE */}
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* TITLE */}
        <Typography variant="h6" textAlign="center" mb={2}>
          Sign up to <span style={{ color: "#ff7a00" }}>sell on Temu</span>
        </Typography>

        {/* TOP STATS */}
        <Box display="flex" justifyContent="center" gap={4} mb={2}>
          <Typography>
            <strong style={{ color: "#ff7a00", fontSize: 24 }}>1</strong> Min
            <br /> Quick Signup
          </Typography>

          <Typography>
            <strong style={{ color: "#ff7a00", fontSize: 24 }}>10</strong> Min
            <br /> Easy Register
          </Typography>
        </Box>

        {/* COUNTRY */}
        <Typography fontSize={14} mb={1}>
          Which country do you sell from?
        </Typography>

        <FormSelect
          label="Select country"
          name="country"                  // ✅ added
          value={formData.country}
          onChange={handleChange}
          options={[
            { label: "🇺🇸 United States seller", value: "US" },
            { label: "🇮🇳 India seller", value: "IN" },
          ]}
        />

        <Box mt={2} />

        {/* EMAIL */}
        <FormInput
          label="Email or phone number"
          name="email"                   // ✅ added
          value={formData.email}
          onChange={handleChange}
        />

        <Box mt={2} />

        {/* PASSWORD */}
        <FormPassword
          label="Password"
          name="password"               // ✅ added
          value={formData.password}
          onChange={handleChange}
          error={!isMin || !hasMix || !notEmailMatch}
        />

        {/* VALIDATION TEXT */}
        <Box mt={1} fontSize={13}>
          <Typography color={isMin ? "green" : "error"}>
            ✖ Use minimum 8 characters
          </Typography>
          <Typography color={hasMix ? "green" : "error"}>
            ✖ A mix of letters and numbers
          </Typography>
          <Typography color={notEmailMatch ? "green" : "error"}>
            ✖ Don't use your email in password
          </Typography>
        </Box>

        <Box mt={2} />

        {/* CONFIRM */}
        <FormPassword
          label="Confirm password"
          name="confirmPassword"        // ✅ added
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {/* BUTTON */}
        <Button
          fullWidth
          sx={{ mt: 3, bgcolor: "#ff7a00", color: "#fff" }}
          onClick={handleSubmit}        // ✅ added
          disabled={loading}
        >
          {loading ? "Please wait..." : "Register as seller"}
        </Button>

        <Typography fontSize={12} mt={2} textAlign="center">
          By continuing, you agree to our{" "}
          <span style={{ color: "#ff7a00" }}>Seller Privacy Policy</span>
        </Typography>

        <Typography textAlign="center" mt={1} onClick={handleClose}>
          Already have an account?{" "}
          <span style={{ color: "#ff7a00", cursor: "pointer" }}>
            Sign Up
          </span>
        </Typography>

      </DialogContent>
    </Dialog>
  );
}