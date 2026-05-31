// styles/WhySellStyles.js

export const whySellStyles = {
  section: {
    backgroundColor: "#f4efe9",
    py: { xs: 6, md: 10 },
    px: { xs: 2, md: 6 },
  },

  heading: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: { xs: "24px", md: "32px" },
    mb: 6,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
    gap: 4,
    maxWidth: "1100px",
    mx: "auto",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    p: { xs: 3, md: 4 },
    display: "flex",
    gap: 2,
    alignItems: "flex-start",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  iconBox: {
    width: 50,
    height: 50,
    minWidth: 50,
    backgroundColor: "#ff7a00",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },

  title: {
    fontSize: { xs: "18px", md: "20px" },
    fontWeight: 600,
    mb: 1,
  },

  highlight: {
    color: "#ff7a00",
  },

  desc: {
    fontSize: "14px",
    color: "#555",
    lineHeight: 1.6,
  },
};