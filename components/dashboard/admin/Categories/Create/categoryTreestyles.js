// const styles = {
//   wrapper: {
//     border: "1px solid #e5e7eb",
//     borderRadius: "8px",
//     overflow: "hidden",
//   },

//   row: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "10px 12px",
//     borderBottom: "1px solid #e5e7eb",
//     backgroundColor: "#fff",

//     "&:hover": {
//       backgroundColor: "#f9fafb",
//     },
//   },

//   left: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//   },

//   dragIcon: {
//     width: "28px",
//     height: "28px",
//     border: "1px solid #e5e7eb",
//     borderRadius: "6px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#6b7280",
//     backgroundColor: "#fff",
//   },

//   folderIcon: {
//     fontSize: "18px",
//     color: "#6b7280",
//   },

//   name: {
//     fontSize: "14px",
//     color: "#374151",
//   },

//   dot: {
//     width: "8px",
//     height: "8px",
//     borderRadius: "50%",
//     backgroundColor: "#22c55e",
//     marginLeft: "6px",
//   },

//   child: {
//     paddingLeft: "28px",
//     borderLeft: "1px dashed #e5e7eb",
//   },

// dropIndicator: {
//   height: "2px",
//   backgroundColor: "#2563eb",
//   margin: "0 12px",
//   borderRadius: "2px",
// },


// smooth: {
//   transition: "all 0.2s ease",
//   },

//   dropLine: {
//   height: "2px",
//   backgroundColor: "#2563eb",
//   position: "absolute",
//   left: "12px",
//   right: "12px",
//   borderRadius: "2px",
// },

// dragOverlay: {
//   padding: "10px 12px",
//   background: "#fff",
//   border: "1px solid #e5e7eb",
//   borderRadius: "6px",
//   boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
// },

// dragging: {
//   opacity: 0.5,
// },

// smooth: {
//   transition: "all 0.2s ease",
// },

// };

// export default styles;

















const styles = {
  wrapper: {
    width: "100%",
    maxWidth: "100%",
    border: "1px solid #e0e0e0",
    borderRadius: 2,
    overflow: "hidden",
    bgcolor: "#ffffff",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    py: 1.5,
    borderBottom: "1px solid #f0f0f0",
    transition: "all 0.2s",
    "&:hover": {
      bgcolor: "#f8f9fa",
    },
  },
  child: {
    borderLeft: "2px solid #e0e0e0",
  },
  dragging: {
    opacity: 0.3,
    bgcolor: "#e3f2fd",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    flex: 1,
  },
  dragIcon: {
    cursor: "grab",
    color: "#999",
    "&:active": {
      cursor: "grabbing",
    },
  },
  folderIcon: {
    color: "#ffa000",
    fontSize: 20,
  },
  name: {
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "#333",
  },
  subcategoryBadge: {
    fontSize: "0.7rem",
    color: "#666",
    bgcolor: "#f0f0f0",
    px: 1,
    py: 0.5,
    borderRadius: 1,
    ml: 1,
  },
  actions: {
    display: "flex",
    gap: 0.5,
    mr: 2,
  },
  actionIcon: {
    "&:hover": {
      bgcolor: "#e0e0e0",
    },
  },
  dropLine: {
    height: 2,
    bgcolor: "#1976d2",
    my: 0.5,
  },
  dragOverlay: {
    p: 1.5,
    bgcolor: "#fff",
    border: "1px solid #1976d2",
    borderRadius: 1,
    boxShadow: 3,
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "#1976d2",
  },
};

export default styles;