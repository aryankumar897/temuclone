const styles = {
  wrapper: {
    maxWidth: "560px",
    fontFamily: "Arial, sans-serif",
  },

  topBar: {
    background: "#e60012",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 12px",
    borderRadius: "8px",
    flexWrap: "wrap",
  },

  clearanceBadge: {
    background: "#ffd84d",
    color: "#000",
    fontWeight: 700,
    fontSize: "12px",
    padding: "4px 8px",
    borderRadius: "4px",
  },

  topText: {
    fontSize: "13px",
  },

  tagRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
    flexWrap: "wrap",
  },

  tag: {
    background: "#e8f7ed",
    color: "#16a34a",
    padding: "3px 8px",
    fontSize: "12px",
    borderRadius: "4px",
    fontWeight: 600,
  },

  delivery: {
    fontSize: "13px",
    color: "#0a7f2e",
  },

  qty: {
    fontSize: "13px",
    color: "#555",
  },

  title: {
    marginTop: "10px",
    fontSize: "15px",
    fontWeight: 300,
    lineHeight: 1.5,
  },

  metaRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginTop: "6px",
  },

  sold: {
    fontSize: "13px",
    color: "#666",
  },

  starStore: {
    background: "#5b21b6",
    color: "#fff",
    fontSize: "12px",
    padding: "2px 6px",
    borderRadius: "4px",
  },

  rating: {
    color: "#ff4747",
    fontWeight: 700,
  },

  bestRow: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    marginTop: "8px",
    flexWrap: "wrap",
  },

  bestSeller: {
    background: "#16a34a",
    color: "#fff",
    fontSize: "12px",
    padding: "4px 8px",
    borderRadius: "4px",
    fontWeight: 700,
  },

  bestTime: {
    background: "#16a34a",
    color: "#fff",
    fontSize: "12px",
    padding: "4px 8px",
    borderRadius: "4px",
  },

  category: {
    fontSize: "13px",
    color: "#555",
  },

  priceRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginTop: "14px",
    flexWrap: "wrap",
  },

  oldPrice: {
    textDecoration: "line-through",
    color: "#888",
    fontSize: "18px",
  },

  lastDay: {
    color: "#ff4747",
    fontWeight: 700,
  },

  price: {
    fontSize: "36px",
    fontWeight: 800,
    color: "#ff4747",
  },

  afterPromo: {
    fontSize: "13px",
    color: "#555",
  },

  discountRow: {
    display: "flex",
    gap: "10px",
    marginTop: "6px",
  },

  discount: {
    border: "2px solid red",
    padding: "2px 6px",
    fontSize: "12px",
    color: "red",
    fontWeight: 700,
  },

  payToday: {
    border: "2px solid red",
    padding: "2px 6px",
    fontSize: "12px",
    color: "red",
  },

  // clearanceBox: {
  //   border: "2px solid #ff4747",
  //   borderRadius: "8px",
  //   padding: "12px",
  //   marginTop: "12px",
  // },

  // clearanceTitle: {
  //   background: "#ff4747",
  //   color: "#fff",
  //   padding: "6px 10px",
  //   borderRadius: "4px",
  //   fontSize: "13px",
  //   marginBottom: "10px",
  // },

  // material: {
  //   fontSize: "13px",
  //   marginBottom: "8px",
  // },

  clearanceBox: {
    border: "2px solid #e60012",

    borderRadius: "8px",
    overflow: "hidden",
    marginTop: "16px",
  },

  clearanceHeader: {
    background: "#e60012",

    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 12px",
    fontWeight: 700,
  },

  clearanceText: {
    fontSize: "14px",
    background: "#ffd84d",
    color: "#0c0606",
    fontSize: "12px",
    padding: "4px 8px",
    borderRadius: "4px",
    fontWeight: 700,
  },

  timerWrap: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  timerIcon: {
    background: "#ffc107",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
  },

  timerText: {
    fontSize: "13px",
    fontWeight: 600,
  },

  clearanceBody: {
    padding: "12px",
    background: "#fff",
  },

  material: {
    fontSize: "13px",
    marginBottom: "10px",
  },

  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  buttons: {
    display: "flex",
    gap: "12px",
    marginTop: "18px",
  },

  cartBtn: {
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: "30px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  cartSub: {
    fontSize: "12px",
    color: "#777",
  },

  buyBtn: {
    flex: 1,
    background: "#e11d2e",
    color: "#fff",
    borderRadius: "30px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  coupon: {
    fontSize: "11px",
    background: "#fff",
    color: "#e11d2e",
    padding: "2px 6px",
    borderRadius: "3px",
    marginTop: "2px",
  },

  shippingSection: {
    marginTop: "18px",
    fontSize: "14px",
  },

  shipTitle: {
    fontWeight: 700,
    color: "#16a34a",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  shipText: {
    marginTop: "4px",
    color: "#444",
  },

  security: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    color: "#16a34a",
  },

  guaranteeRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "12px",
  },

  guarantee: {
    background: "#e8f7ed",
    color: "#16a34a",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: 600,
  },

  paymentIcons: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
    marginLeft: "6px",

    "& img": {
      height: "16px",
    },
  },

  afterPromoRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
  },

  priceArrow: {
    fontSize: "14px",
    color: "#888",
    cursor: "pointer",
  },
};

export default styles;
