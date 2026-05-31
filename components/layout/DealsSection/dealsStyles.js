const styles = {
  wrapper: {
    maxWidth: "1400px",
    margin: "20px auto",
    padding: "10px",
    fontFamily: "Roboto, sans-serif",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
    flexWrap: "wrap",
    gap: "10px",
  },

  title: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontWeight: 900,
    fontSize: "22px",
  },

  lightning: {
    color: "#e86215",
  },

  clearance: {
    color: "#e60023",
  },

  subText: {
    fontSize: "14px",
    color: "#333",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",

    "&:hover": {
      textDecoration: "underline",
    },
  },



grid: {
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gap: "18px",

  "@media (maxWidth:1200px)": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },

  "@media (maxWidth:900px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  "@media (maxWidth:600px)": {
    gridTemplateColumns: "1fr",
  },
},


card: {
  cursor: "pointer",
  maxWidth: "420px",
  margin: "0 auto",
},


  imageWrapper: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "6px",
  },

  image: {
    width: "100%",
    display: "block",
    transition: "transform 0.35s ease",
  },

  imageWrapperHover: {
    "&:hover img": {
      transform: "scale(1.08)",
    },
  },

  badge: {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    background: "#555",
    color: "#fff",
    fontSize: "12px",
    padding: "6px 10px",
    borderRadius: "20px",
  },

  priceRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "8px",
  },

  price: {
    color: "#ff6a00",
    fontWeight: 700,
    fontSize: "16px",
  },

  oldPrice: {
    fontSize: "13px",
    color: "#777",
    textDecoration: "line-through",
  },

  discount: {
    fontSize: "13px",
    marginTop: "4px",
  },

  rating: {
    fontSize: "13px",
    marginTop: "4px",
  },
};

export default styles;