const styles = {
  menuWrapper: {
    position: "absolute",
    top: "120px",
    right: "230px",
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
    width: "300px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
    overflow: "hidden",
  },

  profileSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "16px",
    borderBottom: "1px solid #eee",
  },

  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#ddd",
  },

  emailCard: {
    border: "1px solid #39b54a",
    margin: "12px",
    borderRadius: "6px",
    overflow: "hidden",
  },

  emailHeader: {
    background: "#1aa21a",
    color: "#fff",
    fontSize: "13px",
    padding: "6px 10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  emailContent: {
    padding: "10px",
    fontSize: "13px",
    color: "#333",
  },

  verifyBtn: {
    background: "#0a8f08",
    color: "#fff",
    borderRadius: "25px",
    padding: "10px",
    textAlign: "center",
    marginTop: "10px",
    cursor: "pointer",
    fontWeight: 600,
  },

  editBtn: {
    border: "1px solid #ccc",
    borderRadius: "25px",
    padding: "8px",
    textAlign: "center",
    marginTop: "8px",
    cursor: "pointer",
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 18px",
    fontSize: "14px",
    color: "#333",
    cursor: "pointer",

    "&:hover": {
      background: "#f5f5f5",
    },
  },
};

export default styles;