

export const sidebarStyles = {
  container: (collapsed) => ({
    width: collapsed ? 80 : 260,
    transition: "all 0.3s ease",
    background: "#fff",
    borderRight: "1px solid #eee",
    height: "100vh",

    overflowY: "auto",   // ✅ enable vertical scroll
    overflowX: "hidden",

    scrollbarWidth: "thin", // Firefox

    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#ddd",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#bbb",
    },
  }),

  item: (active, collapsed) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: collapsed ? "center" : "space-between",
    gap: "10px",

    padding: "10px 14px",
    cursor: "pointer",
    fontSize: "13px",

    color: active ? "#ff6a00" : "#444",
    backgroundColor: active ? "#fff3e8" : "transparent",
    borderLeft: active ? "3px solid #ff6a00" : "3px solid transparent",

    transition: "all 0.25s ease",

    "&:hover": {
      backgroundColor: "#fafafa",
      transform: "translateX(4px)",
    },
  }),

  label: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  count: {
    fontSize: "11px",
    background: "#eee",
    borderRadius: "10px",
    padding: "2px 6px",
  },

  accordionRoot: {
    boxShadow: "none",
    "&:before": { display: "none" },

    "& .MuiAccordionSummary-root": {
      minHeight: "unset",
      padding: "0 12px",
    },

    "& .MuiAccordionSummary-content": {
      margin: 0,
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },

    "& .MuiCollapse-root": {
      transition: "all 0.3s ease",
    },
  },

  sectionTitle: {
    fontSize: "13px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 2px",
  },

  toggleWrapper: (collapsed) => ({
    display: "flex",
    justifyContent: collapsed ? "center" : "flex-end",
    padding: "8px",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    background: "#fff",
    zIndex: 10,
  }),

  toggleBtn: (collapsed) => ({
    transition: "transform 0.3s ease",
    transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
  }),
};