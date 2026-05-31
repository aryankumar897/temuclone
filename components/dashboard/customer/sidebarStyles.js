export const sidebarStyles = {
  container: {
    width: 260,
    borderRight: "1px solid #e5e5e5",
    backgroundColor: "#fff",
    padding: "12px 0",
    height: "100vh",

    "@media (max-width:768px)": {
      width: 240,
    },
  },

  sectionTitle: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#111",
    padding: "10px 2px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  menuItem: {
    fontSize: "13px",
    color: "#555",
    padding: "10px 16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  activeItem: {
    backgroundColor: "#fff3e8",
    borderLeft: "3px solid #ff6a00",
    color: "#111",
    fontWeight: 500,
  },

  // accordionRoot: {
  //   boxShadow: "none",

  //   "&:before": { display: "none" },

  // },

  accordionRoot: {
    boxShadow: "none",
    margin: 0,

    "&:before": { display: "none" },

    // remove default spacing
    "& .MuiAccordionSummary-root": {
      minHeight: "unset",
      padding: "0 16px",
    },

    "& .MuiAccordionSummary-content": {
      margin: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start", // 👈 LEFT ALIGN
      gap: "8px",
    },

    "& .MuiAccordionSummary-expandIconWrapper": {
      marginLeft: "auto", // 👈 push arrow to right
    },
  },

  linkItem: {
    fontSize: "13px",
    color: "#333",
    padding: "10px 16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
};
