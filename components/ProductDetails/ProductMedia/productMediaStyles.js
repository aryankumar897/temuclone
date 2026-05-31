const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "16px",
    background: "#fff",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
  },

  title: {
    fontSize: "18px",
    fontWeight: 600,
  },

  headerActions: {
    fontSize: "14px",
    color: "#555",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  attributesRow: {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "center",
    borderBottom: "1px solid #eee",
    paddingBottom: "12px",
    flexWrap: "wrap",
  },

  attribute: {
    flex: 1,
    minWidth: "140px",
    position: "relative",
  },

  label: {
    fontSize: "13px",
    color: "#777",
  },

  value: {
    fontSize: "14px",
    fontWeight: 500,
    marginTop: "2px",
  },

  divider: {
    width: "1px",
    background: "#ddd",
    height: "32px",
  },

 linkRow: {
  fontSize: "14px",
  color: "#333",
  lineHeight: 1.8,

  "& p": {
    margin: "10px 0",
  },

  "& ul": {
    paddingLeft: "20px",
  },

  "& ol": {
    paddingLeft: "20px",
  },

  "& li": {
    marginBottom: "6px",
  },

  "& img": {
    width: "100%",
    borderRadius: "10px",
    marginTop: "10px",
  },

  "& h1, & h2, & h3, & h4": {
    marginTop: "16px",
    marginBottom: "10px",
    fontWeight: 700,
  },

  "& a": {
    color: "#1976d2",
    textDecoration: "none",
  },
},

  storeInfo: {
    marginTop: "10px",
    fontSize: "15px",
    fontWeight: 500,
    cursor: "pointer",
  },

  mediaWrapper: {
    marginTop: "16px",
    position: "relative",
  },

  media: {
    width: "100%",
    borderRadius: "6px",
  },

  fadeOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "120px",
    background:
      "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 90%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: "14px",
  },

  seeMoreBtn: {
    background: "transparent",
    border: "none",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
};

export default styles;