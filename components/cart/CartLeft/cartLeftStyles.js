const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "850px",
    width: "100%",

    "@media (max-width:900px)": {
      maxWidth: "100%",
    },
  },

  breadcrumb: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "15px",

    "@media (max-width:600px)": {
      fontSize: "12px",
    },
  },

  banner: {
    display: "flex",
    alignItems: "center",
    background: "#dfeadf",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px",
    flexWrap: "wrap",

    "@media (max-width:600px)": {
      padding: "8px",
    },
  },

  bannerIcon: {
    fontWeight: "bold",
    marginRight: "10px",
    color: "#2e7d32",
  },

  bannerText: {
    fontSize: "14px",

    "@media (max-width:600px)": {
      fontSize: "12px",
    },
  },

  selectRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15px",
    marginBottom: "15px",

    "@media (max-width:600px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "8px",
    },
  },

  selectLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  selectRight: {
    display: "flex",
    gap: "10px",

    "@media (max-width:600px)": {
      width: "100%",
    },
  },

  filterBtn: {
    border: "1px solid #ccc",
    borderRadius: "20px",
    padding: "4px 14px",
    fontSize: "13px",

    "@media (max-width:600px)": {
      fontSize: "12px",
      padding: "3px 10px",
    },
  },

  warehouseRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    borderTop: "1px solid #eee",
    paddingTop: "15px",
    marginBottom: "10px",
    flexWrap: "wrap",
  },

  warehouse: {
    color: "#2e7d32",
    fontSize: "14px",

    "@media (max-width:600px)": {
      fontSize: "12px",
    },
  },

  freeShipping: {
    color: "#2e7d32",
    fontWeight: 600,
  },

  itemRow: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    borderBottom: "1px solid #eee",
    padding: "15px 0",

    "@media (max-width:768px)": {
      alignItems: "flex-start",
    },

    "@media (max-width:600px)": {
      flexWrap: "wrap",
      gap: "10px",
    },
  },

  productImage: {
    width: "90px",
    height: "90px",
    borderRadius: "6px",

    "@media (max-width:768px)": {
      width: "70px",
      height: "70px",
    },

    "@media (max-width:480px)": {
      width: "60px",
      height: "60px",
    },
  },

  productInfo: {
    flex: 1,
    minWidth: "160px",
  },

  springSale: {
    background: "#ff3d57",
    color: "#fff",
    fontSize: "11px",
    padding: "2px 6px",
    borderRadius: "4px",
    display: "inline-block",
    marginBottom: "4px",
  },

  title: {
    fontSize: "14px",
    color: "#333",

    "@media (max-width:600px)": {
      fontSize: "13px",
    },
  },

  bigSale: {
    color: "#ff7a00",
    fontWeight: 600,
    marginTop: "5px",
  },

  priceRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "4px",
    flexWrap: "wrap",
  },

  oldPrice: {
    textDecoration: "line-through",
    color: "#777",

    "@media (max-width:600px)": {
      fontSize: "12px",
    },
  },

  price: {
    color: "#ff6a00",
    fontWeight: "bold",
    fontSize: "16px",

    "@media (max-width:600px)": {
      fontSize: "14px",
    },
  },

  discount: {
    border: "1px solid #ff6a00",
    color: "#ff6a00",
    padding: "2px 4px",
    fontSize: "12px",
  },

  qty: {
    marginLeft: "auto",

    "@media (max-width:600px)": {
      marginLeft: 0,
      marginTop: "6px",
    },
  },
};

export default styles;
