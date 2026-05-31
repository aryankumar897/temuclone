export const adminOrdersStyles = {
  wrapper: {
    padding: "20px",
  },

  heading: {
    fontSize: "28px",

    fontWeight: 700,

    mb: 3,
  },

  tabsWrapper: {
    display: "flex",

    gap: "10px",

    flexWrap: "wrap",

    mb: 4,
  },

  tab: {
    display: "flex",

    alignItems: "center",

    gap: "6px",

    padding: "10px 16px",

    borderRadius: "30px",

    cursor: "pointer",

    background: "#fff",

    color: "#333",

    border: "1px solid #eee",

    fontWeight: 600,

    transition: "0.2s",

    "&:hover": {
      background: "#fafafa",
    },
  },

  activeTab: {
    background: "#ff4d00",

    color: "#fff",

    "&:hover": {
      background: "#ff4d00",
    },
  },

  emptyWrapper: {
    textAlign: "center",

    mt: 10,
  },

  emptyText: {
    fontSize: "20px",

    fontWeight: 600,
  },

  orderCard: {
    background: "#fff",

    border: "1px solid #eee",

    borderRadius: "14px",

    padding: "20px",

    mb: 2,
  },

  topRow: {
    display: "flex",

    justifyContent: "space-between",

    flexWrap: "wrap",

    gap: "10px",

    mb: 2,
  },

  orderNumber: {
    fontWeight: 700,
  },

  userName: {
    color: "#666",

    fontSize: "14px",
  },

  userEmail: {
    color: "#666",

    fontSize: "13px",
  },

  orderStatus: {
    color: "#ff4d00",

    fontWeight: 700,

    textTransform: "capitalize",
  },

  itemRow: {
    display: "flex",

    gap: "14px",

    mb: 2,
  },

  productImage: {
    width: "70px",

    height: "70px",

    objectFit: "cover",

    borderRadius: "10px",
  },

  productName: {
    fontWeight: 600,
  },

  qtyText: {
    fontSize: "13px",

    color: "#777",
  },

  footer: {
    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    flexWrap: "wrap",

    gap: "10px",

    mt: 2,

    pt: 2,

    borderTop: "1px solid #eee",
  },

  totalPrice: {
    fontWeight: 700,

    fontSize: "18px",
  },

  detailsBtn: {
    background: "#ff4d00",

    borderRadius: "10px",

    textTransform: "none",

    "&:hover": {
      background: "#e64500",
    },
  },
};
