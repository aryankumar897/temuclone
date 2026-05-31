const styles = {
  wrapper: {
    maxWidth: "1400px",
    margin: "20px auto",
    padding: "0 12px",
    fontFamily: "Roboto, sans-serif",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5,1fr)",
    gap: "18px",

    "@media (max-width:1200px)": {
      gridTemplateColumns: "repeat(4,1fr)",
    },
    "@media (max-width:900px)": {
      gridTemplateColumns: "repeat(3,1fr)",
    },
    "@media (max-width:650px)": {
      gridTemplateColumns: "repeat(2,1fr)",
    },
    "@media (max-width:420px)": {
      gridTemplateColumns: "1fr",
    },
  },

  card: {
    position: "relative",


    "&:hover .tooltip": {
      opacity: 1,
    },
  },

  tooltip: {
    position: "absolute",
    top: "10px",
    right: "5px",
    width: "190px",
    background: "rgba(255,255,255,0.55)",
    fontSize: "12px",
    padding: "10px",
    borderRadius: "6px",
    opacity: 0,
    transition: "0.25s",
  },

  imageWrapper: {
    position: "relative",
    width: "100%",
    aspectRatio: "4 / 5",
    overflow: "hidden",
    borderRadius: "6px",
  },

  image: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  video: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0,
    transition: "0.3s",
  },

  playIcon: {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },

  overlay: {
    position: "absolute",
    top: "8px",
    left: "10px",
    color: "#ffd400",
    fontWeight: 700,
    fontSize: "20px",
  },

  badgeRow: {
    display: "flex",
    gap: "6px",
    marginTop: "6px",
  },

  badge: {
    fontSize: "11px",
    padding: "2px 6px",
    borderRadius: "4px",
    color: "#fff",
  },

  easter: { background: "#ff6a88" },
  local: { background: "#00a651" },

  title: {
    fontSize: "14px",
    marginTop: "4px",
    color: "#333",
  },

  priceRow: {
    display: "flex",
    gap: "6px",
    marginTop: "4px",
  },

  lastDay: {
    color: "#ff6a00",
    fontWeight: "700",
    fontSize: "13px",
  },

  price: {
    color: "#ff6a00",
    fontWeight: "700",
    fontSize: "18px",
  },

  oldPrice: {
    textDecoration: "line-through",
    color: "#888",
    fontSize: "13px",
  },

  cart: {
    position: "absolute",
    right: "10px",
    bottom: "90px",
    border: "1px solid #ddd",
    borderRadius: "50%",
    width: "34px",
    height: "34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
  },

  saveRow: {
    display: "flex",
    gap: "6px",
    marginTop: "5px",
  },

  saveBadge: {
    background: "#ff7a00",
    color: "#fff",
    fontSize: "11px",
    padding: "3px 6px",
    borderRadius: "4px",
  },

  timer: {
    background: "#ffe6d9",
    color: "#ff6a00",
    fontSize: "11px",
    padding: "3px 6px",
    borderRadius: "4px",
  },

  promoText: {
    color: "#ff6a00",
    fontSize: "12px",
    marginTop: "5px",
  },

  ratingRow: {
    display: "flex",
    gap: "4px",
    marginTop: "5px",
    fontSize: "12px",
  },

  storeRow: {
    display: "flex",
    gap: "6px",
    marginTop: "5px",
  },

  starStore: {
    background: "#6b2fb3",
    color: "#fff",
    fontSize: "11px",
    padding: "3px 6px",
    borderRadius: "4px",
  },

  brand: {
    background: "#eee",
    fontSize: "11px",
    padding: "3px 6px",
    borderRadius: "4px",
  },

  delivery: {
    color: "#0a8f3d",
    fontSize: "12px",
    marginTop: "4px",
  },
};

export default styles;