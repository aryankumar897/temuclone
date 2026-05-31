"use client";
import { Box, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function StatsCard({
  title,
  value,
  icon,
  color,
  trend = "+12%",
}) {
  return (
    <Box
      sx={{
        borderRadius: "18px",
        p: 6.5,
        background: "#fff",

        display: "flex",
        flexDirection: "column",
        alignItems: "center", // ✅ center everything
        textAlign: "center",

        minHeight: "120px",

        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",

        transition: "all 0.3s ease",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          borderColor: "#ff6a00",
        },
      }}
    >
      {/* ICON (TOP) */}
      <Box
        sx={{
          width: 92,
          height: 42,
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: color,
          color: "#fff",
          mb: 1.5,
        }}
      >
        {icon}
      </Box>

      {/* TITLE */}
      <Typography
        sx={{
          fontSize: "13px",
          color: "#666",
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>

      {/* VALUE */}
      <Typography
        sx={{
          fontSize: "26px",
          fontWeight: 700,
          mt: 0.5,
          color: "#111",
        }}
      >
        {value}
      </Typography>

      {/* TREND */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          mt: 1,
          fontSize: "12px",
          color: "#16a34a",
          fontWeight: 600,
        }}
      >
        <TrendingUpIcon sx={{ fontSize: 16 }} />
        {trend}
      </Box>
    </Box>
  );
}
