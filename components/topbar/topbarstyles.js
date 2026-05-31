const styles = {
  wrapper: {
    background: "#000",
    width: "100%",
  },

  container: {
    maxWidth: "1700px",
    margin: "0 auto",
    padding: "10px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  leftSection: {
    display: "flex",
    alignItems: "center",
  },

  item: {
    width: "320px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    position: "relative",
  },

  itemLast: {
    width: "260px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    position: "relative",
  },

  divider: {
    position: "absolute",
    right: "0",
    height: "24px",
    width: "1px",
    background: "#2c2c2c",
  },

  row: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },

  greenIcon: {
    color: "#8BFF63",
    fontSize: "22px",
  },

  yellowIcon: {
    color: "#FFD84D",
    fontSize: "22px",
  },

  greenTitle: {
    color: "#8BFF63",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "16px",
  },

  yellowTitle: {
    color: "#FFD84D",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "16px",
  },

  greenSub: {
    color: "#b7b7b7",
    fontSize: "12px",
    marginTop: "2px",
  },

  yellowSub: {
    color: "#b7b7b7",
    fontSize: "12px",
    marginTop: "2px",
  },

  greenArrow: {
    color: "#8BFF63",
    fontSize: "18px",
  },

  buttonWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "2px",
    borderRadius: "30px",
    backgroundImage:
      "url(/images/top.avif)",
    backgroundSize: "cover",
  },

  sellBtn: {
    color: "#fff",
    textTransform: "none",
    fontSize: "13px",
    padding: "6px 14px",
  },

  joinBtn: {
    background: "#ff7a00",
    color: "#fff",
    textTransform: "none",
    borderRadius: "20px",
    fontWeight: 600,
    padding: "6px 16px",

    "&:hover": {
      background: "#ff7a00",
    },
  },

  hideOnMobile: {
    display: {
      xs: "none",
      sm: "none",
      md: "flex",
    },
  },
};

export default styles;
