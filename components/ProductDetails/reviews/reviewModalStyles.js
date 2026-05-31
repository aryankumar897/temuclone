// components/reviews/reviewModalStyles.js

export const styles = {
  dialogPaper: {
    height: "85vh",
    width: "100%",
    maxWidth: {
      xs: "95%",
      sm: "600px",
      md: "720px",
    },
    borderRadius: "12px",
  },

  header: {
    position: "sticky",
    top: 0,
    bgcolor: "#fff",
    borderBottom: "1px solid #eee",
    zIndex: 10,
    textAlign: "center",
    py: 2,
    px: 2,
  },

  closeBtn: {
    position: "absolute",
    right: 10,
    top: 8,
  },

  content: {
    overflowY: "auto",
    px: {
      xs: 2,
      sm: 3,
    },
    pb: 4,

    "&::-webkit-scrollbar": {
      width: "6px",
    },

    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "6px",
    },

    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
  },

  verifiedBanner: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    bgcolor: "#e8f5e9",
    color: "#2e7d32",
    p: 1,
    borderRadius: "6px",
    mb: 3,
    fontSize: "14px",
  },

  ratingSection: {
    display: "flex",
    gap: 3,
    mb: 3,
    alignItems: "center",
  },

  bigRating: {
    fontSize: {
      xs: 36,
      md: 48,
    },
    fontWeight: 600,
  },

  progressWrapper: {
    flex: 1,
  },

  progressRow: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 1,
  },

  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: "6px",
    bgcolor: "#eee",

    "& .MuiLinearProgress-bar": {
      background: "#000",
    },
  },

  chipsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
    mb: 3,
  },

  chip: {
    borderRadius: "20px",
    fontSize: "13px",
  },

  reviewItem: {
    display: "flex",
    gap: 2,
    mt: 2,
  },

  reviewText: {
    fontSize: "14px",
    lineHeight: 1.6,
    mt: 1,
  },

  mediaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "8px",
    mt: 1,
    mb: 1,
  },

  mediaItem: {
    width: "100%",
    height: "90px",
    borderRadius: "6px",
    objectFit: "cover",
    cursor: "pointer",
  },

  videoWrapper: {
    position: "relative",
  },

  playIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    background: "rgba(0,0,0,0.6)",
    borderRadius: "50%",
    padding: "6px",
  },

  actionRow: {
    display: "flex",
    gap: 2,
    mt: 1,
    alignItems: "center",
    color: "#555",
    fontSize: "13px",
  },
};
