const styles = {
  container: {
    padding: "40px 30px",
    textAlign: "center",
    position: "relative",
    maxWidth: "520px",
  },

  close: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },

  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
  },

  icon: {
    fontSize: "70px",
    color: "#138900",
  },

  title: {
    fontSize: "26px",
    fontWeight: 600,
    marginBottom: "10px",
  },

  description: {
    fontSize: "15px",
    color: "#444",
    lineHeight: "1.6",
    marginBottom: "30px",
  },

  okBtn: {
    background: "#ff7a00",
    color: "#fff",
    borderRadius: "40px",
    padding: "12px 60px",
    fontSize: "16px",
    fontWeight: 600,
    textTransform: "none",

    "&:hover": {
      background: "#ff7a00",
    },
  },

  footer: {
    fontSize: "13px",
    marginTop: "18px",
    color: "#666",
  },
};

export default styles;
