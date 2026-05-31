// styles/HeroStyles.js

export const heroStyles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    px: { xs: 2, md: 6 },
    py: { xs: 4, md: 0 },
    backgroundImage: `url("/images/top.avif")`, // put your image in public folder
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
  },

  contentWrapper: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: "space-between",
    alignItems: "center",
    gap: { xs: 4, md: 8 },
  },

  left: {
    color: "#fff",
    maxWidth: "900px",
  },

  heading: {
    fontWeight: 700,
    fontSize: { xs: "28px", md: "48px" },
    lineHeight: 1.2,
    mb: 3,
  },

  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
    mt: 2,
  },

  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    fontSize: "14px",
  },

  right: {
    width: "100%",
    maxWidth: "480px",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    p: 5,
  },

  input: {
    mb: 3,
  },

  button: {
    mt: 1,
    backgroundColor: "#ff7a00",
    color: "#fff",
    textTransform: "none",
    fontWeight: 600,
    py: 1.2,
    "&:hover": {
      backgroundColor: "#e56a00",
    },
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    background: "rgba(0,0,0,0.8)",
    color: "#fff",
    display: "flex",
    justifyContent: "space-around",
    py: 5,
    flexDirection: { xs: "column", md: "row" },
    textAlign: "center",
    gap: { xs: 2, md: 0 },
  },

  stat: {
    fontSize: "18px",
  },
};
