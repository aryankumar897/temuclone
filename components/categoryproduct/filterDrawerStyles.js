export const drawerStyles = {
  container: {
    width: 340,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    px: 2,
    pt: 2,
  },

  title: {
    fontSize: "20px",
    fontWeight: 600,
  },

  section: {
    px: 2,
    py: 2,
    borderBottom: "1px solid #eee",
  },

  sectionTitle: {
    fontSize: "15px",
    fontWeight: 600,
    mb: 1,
  },

  colorWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },

  colorCircle: (color, active) => ({
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: color,
    border: active ? "5px solid #000" : "1px solid #ccc",
    cursor: "pointer",
  }),

  radioItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    mb: 1,
    fontSize: "14px",
    cursor: "pointer",
  },

  radioCircle: (active) => ({
    width: 16,
    height: 16,
    borderRadius: "50%",
    border: "1px solid #999",
    background: active ? "#000" : "#fff",
  }),

  viewMore: {
    fontSize: "14px",
    color: "#555",
    cursor: "pointer",
    mt: 1,
  },

  priceWrap: {
    display: "flex",
    gap: "8px",
    mt: 1,
  },

  input: {
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: "20px",
    padding: "6px 10px",
    fontSize: "13px",
  },

  footer: {
    display: "flex",
    gap: "10px",
    p: 2,
    borderTop: "1px solid #eee",
  },

  resetBtn: {
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: "25px",
    textAlign: "center",
    p: 1,
    cursor: "pointer",
  },

  applyBtn: {
    flex: 2,
    background: "#ff6a00",
    color: "#fff",
    borderRadius: "25px",
    textAlign: "center",
    p: 1,
    fontWeight: 600,
    cursor: "pointer",
  },
};