const styles = {
  wrapper: {
    width: "100%",
    maxWidth: "1400px",

    margin: "20px auto",
    padding: "0 16px", // 👈 IMPORTANT for mobile spacing

    borderRadius: "10px",
    overflow: "hidden",
    //  border: "1px solid #e5e5e5",

    fontFamily: "Roboto, sans-serif",

    // Optional: better visual separation like real apps
    backgroundColor: "#fff",

    "@media (max-width:768px)": {
      margin: "10px auto",
      padding: "0 12px",
    },
  },

  container: {
    background: "#000",
    color: "#fff",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    gap: "18px",
    padding: "16px 20px",
    flexWrap: "wrap",
    textAlign: "center",
  },

  text: {
    fontSize: "22px",
    fontWeight: 600,
    fontStyle: "italic",

    "@media (max-width:768px)": {
      fontSize: "18px",
      width: "100%",
    },
  },

  logos: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  logoWrapper: {
    background: "#fff",
    padding: "4px 10px",
    borderRadius: "4px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    transition: "all 0.3s ease",
    cursor: "pointer",

    "&:hover": {
      transform: "translateY(-4px) scale(1.08)",
      boxShadow: "0 6px 14px rgba(0,0,0,0.3)",
    },
  },

  logoImg: {
    height: "26px",
    width: "auto",

    "@media (max-width:768px)": {
      height: "22px",
    },

    "@media (max-width:480px)": {
      height: "20px",
    },
  },
};

export default styles;
