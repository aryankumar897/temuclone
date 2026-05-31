const styles = {
  wrapper: {
    maxWidth: "1400px",
    margin: "30px auto",
    fontFamily: "Roboto, sans-serif",
    textAlign: "center",
  },

  title: {
    color: "#ff6a88",
    fontWeight: 800,
    fontSize: "22px",
    marginBottom: "5px",
  },

  subtitle: {
    fontWeight: 800,
    fontSize: "22px",
    marginBottom: "20px",
  },

  sliderWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  scrollArea: {
    display: "flex",
    gap: "14px",
    overflowX: "auto",
    scrollBehavior: "smooth",
    padding: "10px 50px",
    scrollSnapType: "x mandatory",

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },

  pill: {
    border: "1px solid #dcdcdc",
    borderRadius: "40px",
    padding: "10px 30px",
    fontSize: "14px",
   // background: "#f6f6f6",
    cursor: "pointer",
  //  whiteSpace: "nowrap",
    scrollSnapAlign: "start",

    "&:hover": {
      //  background: "#ededed",
        border: "2px solid #dcdcdc",
    },
  },

  arrow: {
    position: "absolute",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 10,
  },

  leftArrow: {
    left: 0,
  },

  rightArrow: {
    right: 0,
  },
};

export default styles;