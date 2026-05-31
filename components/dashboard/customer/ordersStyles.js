export const ordersStyles = {
  container: {
    flex: 1,
    padding: "20px",

    "@media (max-width:768px)": {
      padding: "14px",
    },
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    gap: "10px",

    "@media (max-width:768px)": {
      flexDirection: "column",
      alignItems: "stretch",
    },
  },

  tabs: {
    display: "flex",
    gap: "16px",
    fontSize: "14px",

    "@media (max-width:768px)": {
      overflowX: "auto",
      whiteSpace: "nowrap",
      paddingBottom: "6px",
    },
  },

  activeTab: {
    backgroundColor: "#fff3e8",
    borderRadius: "6px",
    padding: "6px 10px",
    fontWeight: 500,
  },

  search: {
    minWidth: "260px",

    "@media (max-width:768px)": {
      width: "100%",
    },
  },

  emptyState: {
    textAlign: "center",
    marginTop: "80px",
    color: "#777",

    "@media (max-width:768px)": {
      marginTop: "40px",
    },
  },

  actionBox: {
    border: "1px solid #ff6a00",
    borderRadius: "6px",
    padding: "14px",
    marginTop: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",

    "@media (max-width:768px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "6px",
    },
  },
};