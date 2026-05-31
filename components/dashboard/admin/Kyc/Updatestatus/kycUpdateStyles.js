export const kycUpdateStyles = {
  wrapper: {
    width: "100%",
    p: { xs: 2, sm: 3 },
    bgcolor: "#F7FBFF",
    mx: "auto",
    maxWidth: { lg: 1000, xl: 1100 },
  },

  grid: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, // ✅ responsive
    gap: 2,
  },

  fullWidth: {
    gridColumn: "1 / -1", // ✅ span full row
  },

  sectionTitle: {
    fontSize: "16px",
    fontWeight: 600,
    mb: 1,
    color: "#111827",
  },

  image: {
    width: "100%",
    maxHeight: 200,
    objectFit: "cover",
    borderRadius: 8,
    border: "1px solid #eee",
  },

  buttonWrap: {
    mt: 2,
  },
};