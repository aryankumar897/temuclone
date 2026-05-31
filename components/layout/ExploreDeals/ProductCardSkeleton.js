"use client";

import { Box } from "@mui/material";

export default function ProductCardSkeleton() {
  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {/* IMAGE */}
      <Box
        sx={{
          width: "100%",
          height: 180,
          background: "linear-gradient(90deg, #eee, #f5f5f5, #eee)",
          animation: "shimmer 1.5s infinite",
        }}
      />

      {/* CONTENT */}
      <Box sx={{ p: 1 }}>
        <Box sx={styles.lineShort} />
        <Box sx={styles.lineLong} />
        <Box sx={styles.linePrice} />
      </Box>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: 200px 0;
          }
        }
      `}</style>
    </Box>
  );
}

const styles = {
  lineShort: {
    height: 10,
    width: "60%",
    background: "#eee",
    marginBottom: 8,
    borderRadius: 4,
  },
  lineLong: {
    height: 10,
    width: "90%",
    background: "#eee",
    marginBottom: 8,
    borderRadius: 4,
  },
  linePrice: {
    height: 12,
    width: "40%",
    background: "#ddd",
    borderRadius: 4,
  },
};