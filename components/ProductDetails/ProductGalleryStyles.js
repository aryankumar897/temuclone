const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "750px",
    width: "100%",
    position: "relative",
  },

  /* DESKTOP THUMBNAILS */

  thumbnailColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",

    position: "absolute",

    maxHeight: "620px",
    overflowY: "auto",

    "&::-webkit-scrollbar": {
      width: "0px",
    },

    /* MOBILE */

    "@media (max-width:768px)": {
      position: "relative",
      flexDirection: "row",
      overflowX: "auto",
      overflowY: "hidden",
      maxHeight: "none",
      marginTop: "10px",
      gap: "8px",
      paddingBottom: "5px",
    },
  },

  thumbnailBox: {
    width: "70px",
    height: "70px",
    borderRadius: "6px",
    overflow: "hidden",
    cursor: "pointer",
    position: "relative",
    flexShrink: 0,

    "@media (max-width:768px)": {
      width: "60px",
      height: "60px",
    },
  },

  thumbMedia: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  videoThumb: {
    width: "100%",
    height: "100%",
    position: "relative",
  },

  videoOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    background: "rgba(0,0,0,0.5)",
    borderRadius: "50%",
    padding: "6px",
  },

  playIcon: {
    color: "#fff",
    fontSize: "28px",

    "@media (max-width:768px)": {
      fontSize: "20px",
    },
  },

  /* MAIN IMAGE */

  mainMediaBox: {
    marginLeft: "90px",
    position: "relative",
    width: "620px",
    height: "620px",
    border: "1px solid #eee",
    borderRadius: "6px",
    overflow: "hidden",
    background: "#f8f8f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "@media (max-width:1200px)": {
      width: "520px",
      height: "520px",
    },

    "@media (max-width:900px)": {
      width: "420px",
      height: "420px",
    },

    "@media (max-width:768px)": {
      width: "100%",
      height: "360px",
      marginLeft: 0,
    },

    "@media (max-width:480px)": {
      height: "300px",
    },
  },

  mainMedia: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  zoomLens: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    cursor: "zoom-in",
  },

  leftArrow: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "#fff",
  },

  rightArrow: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "#fff",
  },

  reviewRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "15px",

    "@media (max-width:600px)": {
      flexWrap: "wrap",
      gap: "6px",
    },
  },

  reviewText: {
    fontSize: "14px",
  },

  verified: {
    fontSize: "13px",
    color: "green",
    marginLeft: "auto",

    "@media (max-width:600px)": {
      marginLeft: 0,
    },
  },

  fullscreenDialog: {
    background: "#00000042",
  },

  fullscreenContainer: {
    position: "relative",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  fullscreenImageWrapper: {
    width: "95%",
    height: "88%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  fullscreenMedia: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },

  fullscreenClose: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "#fff",
    background: "rgba(255,255,255,0.1)",
    "&:hover": {
      background: "rgba(255,255,255,0.2)",
    },
  },

  fullscreenLeft: {
    position: "absolute",
    left: "30px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#fff",
    background: "rgba(0,0,0,0.3)",
    "&:hover": {
      background: "rgba(0,0,0,0.5)",
    },
  },

  fullscreenRight: {
    position: "absolute",
    right: "30px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#fff",
    background: "rgba(0,0,0,0.3)",
    "&:hover": {
      background: "rgba(0,0,0,0.5)",
    },
  },

  fullscreenThumbs: {
    position: "absolute",
    bottom: "25px",
    display: "flex",
    gap: "10px",
    overflowX: "auto",
    padding: "10px",
  },

  fullscreenThumb: {
    width: "70px",
    height: "70px",
    borderRadius: "6px",
    overflow: "hidden",
    cursor: "pointer",
    flexShrink: 0,
  },
};

export default styles;
