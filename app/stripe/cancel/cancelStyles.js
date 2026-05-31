export const cancelStyles = {
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

    overflow: "hidden",
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

    color: "#111",
  },

  subtitle: {
    fontSize: "16px",

    color: "#666",

    mt: 1,

    mb: 4,
  },

  messageBox: {
    display: "flex",

    alignItems: "center",

    gap: "12px",

    background: "#fff7f2",

    border: "1px solid #ffe2d3",

    borderRadius: "16px",

    padding: "18px",

    mb: 3,

    textAlign: "left",
  },

  message: {
    fontSize: "15px",

    color: "#444",

    lineHeight: 1.7,
  },

  reasonBox: {
    border: "1px solid #e8e8e8",

    borderRadius: "16px",

    padding: "24px",

    mb: 4,

    textAlign: "left",
  },

  reasonTitle: {
    fontSize: "18px",

    fontWeight: 700,

    mb: 2,
  },

  reasonText: {
    fontSize: "15px",

    color: "#666",

    mb: 1.2,
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

    gap: "10px",

    mb: 2,
  },

  supportText: {
    fontSize: "14px",

    color: "#777",
  },

  supportBtn: {
    color: "#ff4d00",

    fontWeight: 700,

    textTransform: "none",

    "&:hover": {
      background: "rgba(255,77,0,0.05)",
    },
  },
};
