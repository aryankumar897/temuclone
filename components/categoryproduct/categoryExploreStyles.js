export const styles = {
  container: {
    // background: "#f5f5f5",
    //     padding: "10px 16px",

    maxWidth: "1400px",
    margin: "0 auto",
    padding: "16px",
    background: "#fff",
    borderRadius: "8px",
    border: "1px solid #eee",
  },

  breadcrumb: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "8px",
  },

  filterBarWrapper: {
    position: "relative",
  },

  arrowBtn: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    background: "#fff",
    borderRadius: "50%",
    padding: "6px",
    boxShadow: 2,
    cursor: "pointer",
  },

  leftArrow: {
    left: 0,
  },

  rightArrow: {
    right: 0,
  },

  scrollContainer: {
    display: "flex",
    gap: "10px",
    overflowX: "auto",
    padding: "6px 30px",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": { display: "none" },
  },

  filterItem: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    borderRadius: "20px",
    background: active ? "#eee" : "#fff",
    border: "1px solid #ddd",
    fontSize: "14px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  }),

  dropdown: {
    marginTop: "16px",
    background: "#f5f5f5",
    borderRadius: "12px",
    padding: "16px",
    border: "1px solid #eee",
  },

  dropdownTitle: {
    fontWeight: 600,
    marginBottom: "16px",
  },

  optionsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  option: (active) => ({
    padding: "8px 14px",
    borderRadius: "20px",
    border: "1px solid",
    borderColor: active ? "#000" : "#ccc",
    background: active ? "#000" : "#fff",
    color: active ? "#fff" : "#333",
    cursor: "pointer",
  }),

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "16px",
  },

  resetBtn: {
    padding: "10px 18px",
    borderRadius: "25px",
    border: "1px solid #ccc",
    cursor: "pointer",
    background: "#fff",
  },

  applyBtn: {
    padding: "10px 20px",
    borderRadius: "25px",
    background: "#ff6a00",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
};
