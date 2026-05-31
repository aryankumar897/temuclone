export const headerStyles = {
  appBar: {
    backgroundColor: "#0b0b0b",
    px: { xs: 1.5, md: 4 },
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },

  logoBox: {
    width: 40,
    height: 40,
    backgroundColor: "#ff7a00",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 12,
  },

  title: {
    fontWeight: 600,
    fontSize: { xs: "13px", md: "16px" },
      lineHeight: 1,
     color: "#fff",
  },

  subtitle: {
    fontSize: "11px",
    color: "#aaa",
    lineHeight: 1,
  },

  /* 🔥 KEY PART */
  desktopMenu: {
    display: { xs: "none", md: "flex" },
    alignItems: "center",
    gap: 2,
  },

  mobileMenu: {
      display: { xs: "block", md: "none" },
         color: "#fff",
  },

  text: {
    fontSize: "14px",
      cursor: "pointer",
      color: "#fff",
  },

  signUpBtn: {
    backgroundColor: "#ff7a00",
    color: "#fff",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: "8px",
    px: 2,
    "&:hover": {
      backgroundColor: "#e56a00",
    },
  },
};