const styles = {
  menuWrapper: {
    position: "absolute",
    top: "50px",
    right: "-90px",
    zIndex: 999,
    animation: "fadeIn 0.25s ease",

    "@keyframes fadeIn": {
      "0%": {
        opacity: 0,
        transform: "translateY(-8px)",
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
  },

  arrow: {
    width: 0,
    height: 0,
    borderLeft: "18px solid transparent",
    borderRight: "18px solid transparent",
    borderBottom: "18px solid white",
    marginLeft: "120px",
  },

  menu: {
    width: "260px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
    padding: "8px 0",
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 18px",
    fontSize: "14px",
    color: "#333",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",

    "&:hover": {
      background: "#f5f5f5",
    },
  },

  text: {
    fontSize: "14px",
    fontWeight: 500,
  },
};

export default styles;