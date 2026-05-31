const styles = {
  paper: {
    borderRadius: "12px",
    padding: "20px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
  },

  back: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "14px",
    cursor: "pointer",
  },

  title: {
    textAlign: "center",
    fontSize: "22px",
    fontWeight: 600,
    marginTop: "10px",
  },

  securityRow: {
    display: "flex",
    justifyContent: "center",
    gap: "6px",
    color: "#1a7f37",
    fontSize: "13px",
    marginBottom: "12px",
  },

  features: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#f3f7f3",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "20px",
  },

  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  featureIcon: {
    fontSize: "20px",
    color: "#1a7f37",
  },

  featureTitle: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#1a7f37",
  },

  featureSub: {
    fontSize: "11px",
    color: "#666",
  },

  separator: {
    width: "1px",
    height: "32px",
    background: "#ddd",
  },

  main: {
    display: "flex",
    gap: "20px",
    flexDirection: { xs: "column", md: "row" },
  },

  left: {
    flex: 1,
  },

  right: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  centerDivider: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  },

  or: {
    fontSize: "12px",
    color: "#777",
  },

  label: {
    fontSize: "13px",
    marginTop: "10px",
  },

  input: {
    marginTop: "6px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "6px",
      backgroundColor: "#f5f5f5",
    },
  },

  forgot: {
    fontSize: "12px",
    textAlign: "right",
    marginTop: "6px",
    color: "#555",
    cursor: "pointer",
  },

  signBtn: {
    marginTop: "16px",
    padding: "12px",
    borderRadius: "30px",
    backgroundColor: "#ff6a00",
    color: "#fff",
    fontWeight: 600,
    textTransform: "none",
  },

  socialBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    border: "1px solid #ddd",
    borderRadius: "30px",
    padding: "12px",
    textTransform: "none",
    fontSize: "14px",
    color: "black",
  },

  google: {
    color: "#DB4437",
  },

  facebook: {
    color: "#1877F2",
  },

  apple: {
    color: "#000",
  },

  trouble: {
    textAlign: "center",
    fontSize: "12px",
    marginTop: "16px",
    textDecoration: "underline",
    cursor: "pointer",
  },

  footer: {
    textAlign: "center",
    fontSize: "11px",
    color: "#777",
    marginTop: "10px",
  },
};

export default styles;
