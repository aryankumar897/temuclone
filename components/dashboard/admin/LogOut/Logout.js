"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import FormButton from "@/components/form/FormButton";
import { logoutStyles as sx } from "./logoutStyles";
import toast from "react-hot-toast";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);

      await signOut({
        redirect: false, // control manually
      });

      router.push("/"); // redirect after logout
      toast.success("login  successfull");
    } catch (err) {
      console.log(err);
      toast.error("login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={sx.wrapper}>
      <Box sx={sx.card}>
        {/* Icon */}
        <LogoutIcon sx={sx.icon} />

        {/* Title */}
        <Typography sx={sx.title}>Logout</Typography>

        {/* Subtitle */}
        <Typography sx={sx.subtitle}>
          Are you sure you want to log out of your account?
        </Typography>

        {/* Button */}
        <FormButton onClick={handleLogout} disabled={loading} sx={sx.button}>
          {loading ? "Logging out..." : "Logout"}
        </FormButton>
      </Box>
    </Box>
  );
};

export default Logout;
