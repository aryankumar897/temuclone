const styles = {
  wrapper: {
    width: "100%",
    background: "linear-gradient(90deg,#ff6a00,#ff2e7a)",
    display: "flex",
    justifyContent: "center",
  },

  container: {
    maxWidth: "1700px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 40px",
    gap: "20px",

    "@media (max-width:768px)": {
      flexWrap: "wrap",
      padding: "10px 16px",
    },
  },

  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  logo: {
    background: "#ff6a00",
    color: "#fff",
    fontWeight: 700,
    fontSize: "15px",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  // navItem: {
  //   display: "flex",
  //   alignItems: "center",
  //   gap: "6px",
  //   fontSize: "14px",
  //   fontWeight: 500,
  //   color: "#fff",
  //   cursor: "pointer",
  // },

  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#fff",
    cursor: "pointer",
    padding: "14px 10px",
    borderRadius: "30px",
    transition: "all 0.5s ease",
 whiteSpace: "nowrap",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.6)",
    },
  },

  searchContainer: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    borderRadius: "30px",
    padding: "4px",
    width: "420px",

    "@media (max-width:768px)": {
      order: 3,
      width: "100%",
      marginTop: "8px",
    },
  },

  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "8px 12px",
    fontSize: "14px",
    borderRadius: "30px",
  },

  searchButton: {
    background: "#111",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  // accountText: {
  //   fontSize: "13px",
  //   color: "#fff",
  //   lineHeight: "16px",
  // },

accountText: {
  fontSize: "12px",
  color: "#fff",
  lineHeight: "16px",
  padding: "6px 10px",
  borderRadius: "30px",
  cursor: "pointer",
  transition: "all 0.25s ease",
  whiteSpace: "nowrap",
  "&:hover": {
    background: "rgba(0, 0, 0, 0.6)",
  },
},


  // iconItem: {
  //   display: "flex",
  //   alignItems: "center",
  //   gap: "6px",
  //   color: "#fff",
  //   fontSize: "14px",
  // },

  iconItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#fff",
    fontSize: "14px",
    padding: "6px 10px",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "all 0.25s ease",

    "&:hover": {
      background: "rgba(0, 0, 0, 0.67)",
    },
  },

  desktopOnly: {
    "@media (max-width:768px)": {
      display: "none",
    },
  },

  mobileIcons: {
    display: "none",

    "@media (max-width:768px)": {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#fff",
      marginLeft: "auto",
    },
  },
};

export default styles;
