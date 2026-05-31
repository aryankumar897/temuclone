export const paypalCancelStyles = {
  root: {
    minHeight: "100vh",

    background: "#f5f5f5",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    padding: "20px",
  },

  paper: {
    borderRadius: "24px",

    padding: {
      xs: "30px 20px",

      md: "50px",
    },

    textAlign: "center",
  },

  iconWrapper: {
    width: "110px",

    height: "110px",

    borderRadius: "50%",

    background: "rgba(255,77,0,0.08)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    margin: "0 auto 24px",
  },

  cancelIcon: {
    fontSize: "70px",

    color: "#ff4d00",
  },

  title: {
    fontSize: {
      xs: "30px",

      md: "42px",
    },

    fontWeight: 700,
  },

  subtitle: {
    fontSize: "16px",

    color: "#666",

    mt: 1,

    mb: 4,
  },

  messageBox: {
    background: "#fff7f2",

    border: "1px solid #ffe2d3",

    borderRadius: "16px",

    padding: "24px",

    mb: 4,
  },

  message: {
    fontSize: "15px",

    color: "#444",

    lineHeight: 1.7,
  },

  buttonGroup: {
    display: "flex",

    gap: "16px",

    justifyContent: "center",

    flexWrap: "wrap",

    mb: 4,
  },

  primaryBtn: {
    background: "#ff4d00",

    color: "#fff",

    borderRadius: "50px",

    textTransform: "none",

    padding: "12px 24px",

    fontWeight: 700,

    "&:hover": {
      background: "#e64500",
    },
  },

  secondaryBtn: {
    border: "1px solid #ddd",

    color: "#111",

    borderRadius: "50px",

    textTransform: "none",

    padding: "12px 24px",

    fontWeight: 700,
  },

  supportBox: {
    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    gap: "8px",
  },

  supportText: {
    fontSize: "14px",

    color: "#777",
  },
};
