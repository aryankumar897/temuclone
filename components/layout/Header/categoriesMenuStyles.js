const styles = {
  menuWrapper: {
    position: "absolute",
    top: "120px",
    left: "300px",
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
    marginLeft: "350px",
  },

  menu: {
    width: "1120px",
    height: "520px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
    display: "flex",
    overflow: "visible",
  },

  /* LEFT SIDEBAR */

  sidebar: {
    width: "240px",
    minWidth: "220px",
    background: "#fafafa",
    borderRight: "1px solid #eee",
    overflowY: "auto",
  },

  sidebarItem: {
    padding: "10px 16px",
    fontSize: "14px",
    color: "#333",
    cursor: "pointer",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",

    "&:hover": {
      background: "#f5f5f5",
    },
  },

  /* RIGHT GRID */

  gridSection: {
    flex: 1,
    padding: "24px",
    display: "grid",
    gridTemplateColumns: "repeat(5,1fr)",
    gap: "26px",
    alignContent: "flex-start",
  },

  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    cursor: "pointer",

    width: "120px",
  },

  image: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "8px",
    transition: "transform 0.2s ease",

    "&:hover": {
      transform: "scale(1.05)",
    },
  },

  //   text: {
  //     fontSize: "13px",
  //     color: "#333",
  //     lineHeight: "18px",
  //   },

  text: {
  fontSize: "13px",
  color: "#333",
  lineHeight: "18px",
  textAlign: "center",
  maxWidth: "120px",

  whiteSpace: "normal",     // allow wrapping
  wordBreak: "break-word",  // break long words if needed
}
};

export default styles;
