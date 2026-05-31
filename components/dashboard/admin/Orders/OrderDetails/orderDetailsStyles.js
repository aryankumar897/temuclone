export const orderDetailsStyles = {
  wrapper: {
    padding: "20px",

    maxWidth: "1200px",

    margin: "0 auto",
  },

  heading: {
    fontSize: "32px",

    fontWeight: 700,

    mb: 4,
  },

  card: {
    background: "#fff",

    border: "1px solid #eee",

    borderRadius: "18px",

    padding: "25px",

    mb: 3,

    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
  },

  sectionTitle: {
    fontSize: "20px",

    fontWeight: 700,

    mb: 3,
  },

  orderNumber: {
    fontWeight: 700,

    fontSize: "22px",

    mb: 1,
  },

  grayText: {
    color: "#666",

    fontSize: "14px",

    mb: 0.5,
  },

  totalPrice: {
    fontWeight: 700,

    fontSize: "24px",

    color: "#ff4d00",

    mt: 2,
  },

  statusBadge: {
    background: "#fff3eb",

    color: "#ff4d00",

    borderRadius: "30px",

    padding: "6px 14px",

    fontWeight: 700,

    fontSize: "13px",

    textTransform: "capitalize",

    width: "fit-content",

    mt: 2,
  },

  itemRow: {
    display: "flex",

    gap: "16px",

    mb: 3,

    paddingBottom: "18px",

    borderBottom: "1px solid #f3f3f3",
  },

  productImage: {
    width: "95px",

    height: "95px",

    borderRadius: "12px",

    objectFit: "cover",

    border: "1px solid #eee",
  },

  productName: {
    fontWeight: 700,

    fontSize: "16px",

    mb: 1,
  },

  priceText: {
    color: "#ff4d00",

    fontWeight: 700,

    mt: 1,
  },

  infoGrid: {
    display: "grid",

    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",

    gap: "20px",
  },

  infoBox: {
    border: "1px solid #f1f1f1",

    borderRadius: "14px",

    padding: "18px",

    background: "#fafafa",
  },

  infoLabel: {
    fontSize: "13px",

    color: "#777",

    mb: 1,
  },

  infoValue: {
    fontWeight: 700,

    wordBreak: "break-word",
  },

  statusWrapper: {
    display: "flex",

    gap: "15px",

    flexWrap: "wrap",

    alignItems: "center",
  },

  select: {
    minWidth: "220px",
  },

  updateBtn: {
    background: "#ff4d00",

    textTransform: "none",

    borderRadius: "10px",

    height: "40px",

    "&:hover": {
      background: "#e64500",
    },
  },
};
