const styles = {
  wrapper: {
    maxWidth: "460px",
    width: "100%",
  },


  

  container: {
   // background: "#fff",
    padding: "22px",
    borderRadius: "10px",
    border: "1px solid #e5e5e5",
  },

  heading: {
    fontSize: "20px",
    fontWeight: 600,
    marginBottom: "18px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  label: {
    fontSize: "14px",
    color: "#444",
  },

  oldPrice: {
    fontSize: "14px",
    color: "#999",
    textDecoration: "line-through",
  },

  discount: {
    fontSize: "14px",
    color: "#ff6a00",
    fontWeight: 500,
  },

  estimate: {
    fontSize: "16px",
    fontWeight: 500,
  },

  totalPrice: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#1a7f37",
  },

  guaranteeBox: {
    display: "flex",
    background: "#108a00",
    color: "#fff",
    padding: "12px",
    borderRadius: "6px",
    marginTop: "10px",
    marginBottom: "10px",
  },

  guaranteeIcon: {
    marginRight: "8px",
  },

  guaranteeText: {
    fontSize: "13px",
    lineHeight: 1.4,
  },

  note: {
    fontSize: "12px",
    color: "#777",
  },

  offer: {
    fontSize: "13px",
    marginBottom: "12px",
  },

  checkoutBtn: {
    width: "100%",
    background: "#ff7a00",
    color: "#fff",
    fontWeight: 600,
    fontSize: "16px",
    borderRadius: "30px",
    padding: "12px",
    "&:hover": {
      background: "#ff6a00",
    },
  },

  paymentStrip: {
    background: "#ffb86b",
    fontSize: "12px",
    padding: "6px",
    textAlign: "center",
    borderRadius: "6px",
    marginTop: "6px",
  },

  paypalBtn: {
    marginTop: "14px",
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "30px",
    padding: "10px",
    color: "#333",
    background: "#fff",
  },

  infoRow: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },

  icon: {
    fontSize: "18px",
    marginRight: "6px",
    color: "#888",
  },

  infoText: {
    fontSize: "12px",
    color: "#666",
  },

  safeRow: {
    display: "flex",
    alignItems: "center",
    marginTop: "16px",
  },

  safeTitle: {
    fontSize: "14px",
    fontWeight: 600,
  },

  safeText: {
    fontSize: "13px",
    color: "#1a7f37",
    marginTop: "6px",
  },

  safeTextLight: {
    fontSize: "12px",
    color: "#666",
    marginTop: "4px",
  },

  paymentLogos: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "12px",
  },
  paymentIcon: {
    height: "24px",
  },
};

export default styles;
