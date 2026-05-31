"use client";

import { Box, Typography, Button, Avatar } from "@mui/material";

const SellerCard = ({
  image,
  logo,
  title,
  description,
  name,
  role,
  buttonText,
}) => {
  return (
    <Box
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        background: "#f5f5f5",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Top Image */}
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          width: "100%",
          height: "240px",
          objectFit: "cover",
        }}
      />

      {/* Content */}
      <Box sx={{ p: 3 }}>
        {/* Logo + Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Avatar src={logo} sx={{ width: 32, height: 32 }} />
          <Typography fontWeight={600}>{title}</Typography>
        </Box>

        {/* Description */}
        <Typography
          sx={{
            fontSize: "14px",
            color: "#333",
            mb: 2,
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>

        {/* Name */}
        <Typography fontWeight={600} fontSize="14px">
          {name}
        </Typography>

        {/* Role */}
        <Typography fontSize="13px" color="gray" mb={2}>
          {role}
        </Typography>

        {/* Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            background: "#ff7a00",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { background: "#e66d00" },
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};

export default SellerCard;