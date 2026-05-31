const authStyles = {
  paper: {
    borderRadius: "12px",
    padding: { xs: "16px", sm: "20px" },
    width: "100%",
    maxWidth: "450px",
  },

  closeBtn: {
    position: "absolute",
    right: 12,
    top: 12,
    color: "#666",
  },

  title: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: "20px",
    color: "#222",
  },

  securityRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
    marginTop: "6px",
    color: "#1a7f37",
    fontSize: "13px",
  },

  featuresRow: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
    marginBottom: "10px",
  },

  featureBox: {
    textAlign: "center",
  },

  featureCircle: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    backgroundColor: "#f2d6be",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 6px auto",
  },

  featureTitle: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#222",
  },

  featureSub: {
    fontSize: "11px",
    color: "#777",
  },

  inputLabel: {
    fontSize: "13px",
    marginTop: "14px",
    marginBottom: "6px",
    color: "#222",
  },

  input: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "6px",
      backgroundColor: "#fff",
    },
  },

    continueBtn: {
      color:"#fff",
    marginTop: "16px",
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

  helpText: {
    textAlign: "center",
    fontSize: "13px",
    marginTop: "10px",
    color: "#555",
    cursor: "pointer",
    textDecoration: "underline",
  },

  divider: {
    margin: "18px 0",
    fontSize: "12px",
    color: "#999",
  },

  socialRow: {
    display: "flex",
    justifyContent: "center",
    gap: "18px",
  },

  socialIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor: "#fff",
    boxShadow: "0 0 0 1px #eee",
  },

  google: {
    color: "#DB4437", // Google red
  },

  facebook: {
    color: "#1877F2", // Facebook blue
  },

  apple: {
    color: "#000000", // Apple black
  },

  footer: {
    textAlign: "center",
    fontSize: "11px",
    color: "#777",
    marginTop: "14px",
    lineHeight: 1.4,
  },
};

export default authStyles;
