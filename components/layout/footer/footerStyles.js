import { colors } from "@mui/material";

const styles = {
  wrapper: {
    background: "#111",
    width: "100%",
    color: "#b7b7b7",
    fontFamily: '"Inter","Helvetica","Arial",sans-serif',
  },

  container: {
    maxWidth: "1700px",
    margin: "0 auto",
    padding: "60px 40px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "1fr 1fr",
      md: "1fr 1fr 1fr 420px",
    },
    gap: "40px",
  },

  columnTitle: {
    color: "#fff",
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "18px",
  },

  link: {
    fontSize: "14px",
    marginBottom: "12px",
    cursor: "pointer",

    "&:hover": {
      color: "#fff",
    },
  },

  sellerCard: {
    position: "relative",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1607083206968-13611e3d76db)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "12px",
    padding: "18px",
    height: "120px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#fff",
  },

  sellerTitle: {
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "10px",
  },

  sellerBtn: {
    background: "#ff7a00",
    borderRadius: "20px",
    fontSize: "13px",
    width: "180px",
    padding: "8px 12px",
    color: "#fff",
    textTransform: "none",

    "&:hover": {
      background: "#ff7a00",
    },
  },

  appTitle: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#fff",
    marginTop: "20px",
    marginBottom: "10px",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    fontSize: "13px",
  },

  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  storeButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
  },

  storeBtn: {
    border: "1px solid #f9f9f9",
    borderRadius: "30px",
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",

    color: "white",
    borderColor: "#fff",
    "&:hover": {
      borderColor: "#fff",
    },
  },

  socialRow: {
    display: "flex",
    gap: "18px",
    marginTop: "16px",
  },

  socialIcon: {
    width: "24px",
    height: "24px",
    cursor: "pointer",
    colors: "white",
  },

  bottomRow: {
    marginTop: "50px",
    display: "flex",
    flexDirection: {
      xs: "column",
      md: "row",
    },
    justifyContent: "space-between",
    gap: "30px",
  },

  paymentRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "10px",
  },

  paymentIcon: {
    height: "24px",
  },

  securityRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "10px",
  },

  securityIcon: {
    height: "26px",
  },
};

export default styles;
