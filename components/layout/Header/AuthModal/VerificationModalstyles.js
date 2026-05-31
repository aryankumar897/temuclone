const otpStyles = {
  paper: {
    borderRadius: "12px",
    padding: "20px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  back: {
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },

  title: {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: 600,
    marginTop: "10px",
  },

  desc: {
    textAlign: "center",
    fontSize: "13px",
    color: "#555",
    marginTop: "10px",
    lineHeight: 1.5,
  },

  otpRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    gap: "8px",
  },

  otpInput: {
    width: "45px",
    height: "55px",
    textAlign: "center",
    fontSize: "20px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
  },

  resend: {
    textAlign: "right",
    fontSize: "12px",
    color: "#555",
    marginTop: "8px",
  },

  helpTitle: {
    marginTop: "20px",
    fontSize: "14px",
    fontWeight: 500,
  },

  helpText: {
    fontSize: "13px",
    color: "#555",
    marginTop: "4px",
  },
};

export default otpStyles;