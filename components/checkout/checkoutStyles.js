// components/checkout/checkoutStyles.js

export const pageWrapper = {
  background: "#f5f5f5",
  minHeight: "100vh",
  py: {
    xs: 2,
    md: 4,
  },
  px: 2,
};

export const containerStyles = {
  width: "100%",
  maxWidth: "1400px",
  mx: "auto",
};

export const leftCard = {
  background: "#fff",
  borderRadius: "14px",
  border: "1px solid #ebebeb",
  padding: {
    xs: "18px",
    sm: "26px",
  },
};

export const rightCard = {
  background: "#fff",
  borderRadius: "14px",
  border: "1px solid #ebebeb",
  padding: "18px",
  mb: 2,
};

export const sectionBox = {
  mt: 4,
};

export const paymentRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 16px",
  background: "#fff",
};

export const orangeButton = {
  mt: 3,
  height: "52px",
  background: "#ff5a00",
  color: "#fff",
  borderRadius: "10px",
  textTransform: "none",
  fontWeight: 700,
  fontSize: "16px",

  "&:hover": {
    background: "#f25400",
  },
};

export const productImage = {
  width: 72,
  height: 72,
  objectFit: "cover",
  borderRadius: "10px",
  border: "1px solid #eee",
};