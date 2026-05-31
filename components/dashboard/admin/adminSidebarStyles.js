// export const sidebarStyles = {
//   container: (collapsed, theme) => ({
//     width: collapsed ? 80 : 260,
//     transition: "width 0.3s ease",
//     background: theme.palette.background.paper,
//     height: "100vh",
//     position: "sticky",
//     top: 0,
//     overflowY: "auto",
//     borderRight: `1px solid ${theme.palette.divider}`,
//   }),

//   logo: {
//     padding: "16px",
//     fontWeight: 700,
//     color: "#ff6a00",
//   },

//   toggle: {
//     display: "flex",
//     justifyContent: "flex-end",
//   },

//   item: (active, collapsed, theme) => ({
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     justifyContent: collapsed ? "center" : "flex-start",
//     padding: "10px 16px",
//     cursor: "pointer",

//     background: active ? "#ff6a00" : "transparent",
//     color: active ? "#fff" : theme.palette.text.primary,

//     borderRadius: "6px",
//     margin: "4px 8px",

//     transition: "all 0.25s ease",

//     "&:hover": {
//       background: "#ff6a00",
//       color: "#fff",
//     },
//   }),

//   accordion: (active) => ({
//     boxShadow: "none",
//     background: "transparent",
//     "&:before": { display: "none" },

//     // 🔥 highlight section if active
//     borderLeft: active ? "3px solid #ff6a00" : "3px solid transparent",
//   }),

//   accordionSummary: {
//     px: 0,
//     minHeight: "unset",
//     "& .MuiAccordionSummary-content": {
//       margin: 0,
//     },
//   },

//   accordionDetails: {
//     p: 0,
//   },

//   accordionHeaderItem: (active, theme) => ({
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     padding: "10px 16px",
//     margin: "4px 8px",

//     borderRadius: "6px",

//     background: active ? "#fff3e8" : "transparent",
//     color: theme.palette.text.primary,

//     fontSize: "14px",
//     fontWeight: 500,
//   }),
// };











export const sidebarStyles = {
  container: (collapsed, theme) => ({
    width: collapsed ? 80 : 260,
    transition: "width 0.3s ease",
    background: theme.palette.background.paper,
    height: "100vh",
    position: "sticky",
    top: 0,
    overflowY: "auto",
    borderRight: `1px solid ${theme.palette.divider}`,
  }),

  logo: {
    padding: "16px",
    fontWeight: 700,
    color: "#ff6a00",
  },

  toggle: {
    display: "flex",
    justifyContent: "flex-end",
  },

  item: (active, collapsed, theme) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    justifyContent: collapsed ? "center" : "flex-start",

    padding: "8px 14px",
    cursor: "pointer",

    background: active ? "#ff6a00" : "transparent",
    color: active ? "#fff" : theme.palette.text.primary,

    borderRadius: "6px",
    margin: "2px 8px",

    transition: "all 0.25s ease",

    "&:hover": {
      background: "#ff6a00",
      color: "#fff",
    },
  }),

  // ================= ACCORDION =================

  accordion: (active) => ({
    boxShadow: "none",
    background: "transparent",
    margin: 0,

    "&:before": {
      display: "none",
    },

    "&.Mui-expanded": {
      margin: "0px !important",
    },

    borderLeft: active ? "3px solid #ff6a00" : "3px solid transparent",
  }),

  accordionSummary: {
    px: 0,
    minHeight: "40px !important",
    margin: 0,

    "&.Mui-expanded": {
      minHeight: "40px !important",
    },

    "& .MuiAccordionSummary-content": {
      margin: "4px 0",
    },

    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: "4px 0",
    },

    // 🔥 FIX: SPACE FOR RIGHT ICON
    "& .MuiAccordionSummary-expandIconWrapper": {
      marginRight: "14px", // ✅ perfect spacing from right border
    },
  },

  accordionDetails: {
    padding: "4px 0 6px 0",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },

  accordionHeaderItem: (active, theme) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",

    padding: "8px 14px",
    margin: "2px 8px",

    borderRadius: "6px",

    background: active ? "#fff3e8" : "transparent",
    color: theme.palette.text.primary,

    fontSize: "14px",
    fontWeight: 500,

    transition: "all 0.2s ease",
  }),
};