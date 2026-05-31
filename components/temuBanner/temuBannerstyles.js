const styles = {
  wrapper: {
    maxWidth: "1400px",
    margin: "20px auto",
    borderRadius: "10px",
    overflow: "hidden",
    border: "1px solid #0f8c00",
    fontFamily: "Roboto, sans-serif",
  },

  topBar: {
    background: "#138900",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    flexWrap: "wrap",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  title: {
    fontSize: "15px",
    fontWeight: 600,
  },

  icon: {
    fontSize: "18px",
  },

  rightItems: {
    display: "flex",
    alignItems: "center",
    gap: "16px",

    "@media (max-width:768px)": {
      display: "none",
    },
  },

  feature: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  featureText: {
    fontSize: "14px",
  },

  divider: {
    width: "1px",
    height: "18px",
    background: "#ffffff55",
  },

  arrow: {
    fontSize: "18px",
  },

  bottomBar: {
    background: "#e9f5e6",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
  },

  messageLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  bellIcon: {
    color: "#138900",
  },

  messageText: {
    fontSize: "14px",
    color: "#0f6f00",

    "@media (max-width:768px)": {
      fontSize: "12px",
    },
  },

  view: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    cursor: "pointer",
  },

  viewText: {
    color: "#138900",
    fontWeight: 600,
  },

  viewArrow: {
    color: "#138900",
  },
};

export default styles;
