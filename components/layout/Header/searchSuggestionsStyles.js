const styles = {
  menuWrapper: {
    position: "absolute",
    top: "120px",
    left: "500",
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
    marginLeft: "160px",
  },

  menu: {
    width: "420px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
    padding: "16px",
  },

  title: {
    fontWeight: 600,
    marginBottom: "12px",
  },

  tagsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  tag: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#f2f2f2",
    borderRadius: "20px",
    padding: "6px 10px",
    fontSize: "13px",
    cursor: "pointer",

    "&:hover": {
      background: "#e5e5e5",
    },
  },

  tagImg: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    objectFit: "cover",
  },
};

export default styles;