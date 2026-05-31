const styles = {
  root: {
    background: "#f5f5f5",
    minHeight: "100vh",
  },

  wrapper: {
    width: "100%",
  //  maxWidth: "1400px",
    margin: "20px auto",
    padding: "0 16px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    fontFamily: "Roboto, sans-serif",

    "@media (max-width:768px)": {
      margin: "10px auto",
      padding: "0 12px",
    },
  },

  layout: {
    display: "flex",
    minHeight: "calc(100vh - 40px)",
  },

  content: {
    flex: 1,
    padding: "20px",
    background: "#fafafa",
    borderRadius: "8px",

    "@media (max-width:768px)": {
      padding: "12px",
    },
  },
};

export default styles;