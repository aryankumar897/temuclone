const registerStyles = {
  paper: {
    borderRadius: "12px",
    padding: { xs: "16px", sm: "20px" },
    width: "100%",
    maxWidth: "420px",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },

  back: {
    fontSize: "14px",
    cursor: "pointer",
    color: "#333",
  },

  closeBtn: {
    color: "#666",
  },

  title: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: "20px",
    marginBottom: "4px",
  },

  securityRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
    color: "#1a7f37",
    fontSize: "13px",
    marginBottom: "16px",
  },

  sectionTitle: {
    fontWeight: 600,
    fontSize: "16px",
    marginBottom: "4px",
  },

  sectionSub: {
    fontSize: "13px",
    color: "#555",
    marginBottom: "16px",
  },

  label: {
    fontSize: "13px",
    marginBottom: "6px",
  },

  input: {
    marginBottom: "14px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "6px",
      backgroundColor: "#f5f5f5",
    },
  },

  passwordHint: {
    fontSize: "12px",
    color: "#777",
    borderTop: "1px solid #eee",
    paddingTop: "10px",
    marginTop: "4px",
  },

  registerBtn: {
    color: "#fff",
    marginTop: "20px",
    padding: "12px",
    borderRadius: "30px",
    backgroundColor: "#ff6a00",
    fontSize: "15px",
    fontWeight: 600,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#e65c00",
    },
  },

  footer: {
    textAlign: "center",
    fontSize: "11px",
    color: "#777",
    marginTop: "14px",
    lineHeight: 1.4,
  },
};

export default registerStyles;
