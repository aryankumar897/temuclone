export const changePasswordStyles = {
  wrapper: {
    width: "100%",
    p: { xs: 2, sm: 3 },
    bgcolor: "#F7FBFF",
    mx: "auto",
    maxWidth: 600,
    fontFamily: "Inter, Roboto, Arial, sans-serif",
  },

  headerTitle: {
    fontSize: { xs: "18px", sm: "20px" },
    fontWeight: 700,
    color: "#060403",
    mb: 2,
  },

  formGrid: {
    display: "grid",
    gap: 2,
  },

  buttonWrap: {
    mt: 2,
  },

  infoBox: {
    fontSize: "12px",
    color: "#6B7280",
    mb: 2,
  },

  // 🔥 NEW: Strength Bar Styles
  strengthWrapper: {
    mt: -1,
    mb: 1,
  },

  strengthBarBg: {
    height: 8,
    borderRadius: 10,
    bgcolor: "#e5e7eb",
    overflow: "hidden",
  },

  strengthBarFill: (width, gradient) => ({
    height: "100%",
    width: width,
    borderRadius: 10,
    background: gradient,
    transition: "all 0.4s ease",
    boxShadow: `0 0 10px ${gradient}`, // 🔥 glow
  }),

  strengthText: (color) => ({
    fontSize: "12px",
    mt: 0.5,
    fontWeight: 600,
    color,
  }),
};