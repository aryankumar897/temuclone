// "use client";

// import {
//   Dialog,
//   DialogContent,
//   Typography,
//   IconButton,
//   Box,
// } from "@mui/material";

// import CloseIcon from "@mui/icons-material/Close";

// export default function PayLaterModal({ open, handleClose }) {
//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//       <DialogContent sx={styles.wrapper}>
//         {/* CLOSE BUTTON */}

//         <IconButton onClick={handleClose} sx={styles.closeBtn}>
//           <CloseIcon />
//         </IconButton>

//         {/* TITLE */}

//         <Typography sx={styles.title}>Shop now, pay later</Typography>

//         {/* HOW IT WORKS */}

//         <Typography sx={styles.heading}>How it works:</Typography>

//         <Typography sx={styles.text}>
//           Select one of the following payment methods to shop now, pay later:
//         </Typography>

//         {/* AFTERPAY */}

//         <Box sx={styles.paymentRow}>
//           <Typography>Pay in 4 interest-free installments with</Typography>

//           <img src="/images/pay4.avif" style={{ height: 24 }} />
//         </Box>

//         {/* KLARNA */}

//         <Box sx={styles.paymentRow}>
//           <Typography>Pay in 4 interest-free installments with</Typography>

//           <img src="/images/pay6.avif" style={{ height: 24 }} />
//         </Box>

//         {/* TEXT CONTENT */}

//         <Typography sx={styles.description}>
//           Afterpay: You must be over 18, a resident of the U.S., and meet the
//           additional criteria to qualify. Late fees may apply. Loans to
//           California residents made or arranged are pursuant to a California
//           Finance Lenders Law license.
//         </Typography>

//         <Typography sx={styles.description}>
//           Klarna: You must be a resident of the United States or its
//           territories. You must have full legal capacity to enter into a
//           contract and be at least 18 years old or of legal age in your state of
//           residence.
//         </Typography>
//       </DialogContent>
//     </Dialog>
//   );
// }

// const styles = {
//   wrapper: {
//     padding: "28px",
//     position: "relative",
//   },

//   closeBtn: {
//     position: "absolute",
//     right: 8,
//     top: 8,
//   },

//   title: {
//     textAlign: "center",
//     fontSize: "16px",
//     fontWeight: 600,
//     marginBottom: "20px",
//   },

//   heading: {
//     fontWeight: 600,
//     marginBottom: "6px",
//   },

//   text: {
//     fontSize: "14px",
//     marginBottom: "16px",
//   },

//   paymentRow: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     marginBottom: "10px",
//   },

//   description: {
//     fontSize: "13px",
//     color: "#444",
//     marginTop: "12px",
//     lineHeight: 1.6,
//   },
// };



"use client";

import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

export default function PayLaterModal({
  open,
  handleClose,
  product,
}) {
  const price =
    product?.special_price ||
    product?.price ||
    0;

  const splitPrice = (
    price / 4
  ).toFixed(2);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent sx={styles.wrapper}>
        {/* CLOSE BUTTON */}

        <IconButton
          onClick={handleClose}
          sx={styles.closeBtn}
        >
          <CloseIcon />
        </IconButton>

        {/* TITLE */}

        <Typography sx={styles.title}>
          Shop now, pay later
        </Typography>

        {/* PRODUCT */}

        <Box sx={styles.productBox}>
          <img
            src={
              product?.media?.[0]?.url
            }
            style={styles.productImage}
          />

          <Box>
            <Typography
              sx={styles.productName}
            >
              {product?.name}
            </Typography>

            <Typography
              sx={styles.productPrice}
            >
              ${price}
            </Typography>
          </Box>
        </Box>

        {/* HOW IT WORKS */}

        <Typography sx={styles.heading}>
          How it works:
        </Typography>

        <Typography sx={styles.text}>
          Split your payment into 4
          interest-free installments.
        </Typography>

        {/* AFTERPAY */}

        <Box sx={styles.paymentRow}>
          <Typography>
            4 payments of{" "}
            <b>${splitPrice}</b> with
          </Typography>

          <img
            src="/images/pay4.avif"
            style={{ height: 24 }}
          />
        </Box>

        {/* KLARNA */}

        <Box sx={styles.paymentRow}>
          <Typography>
            4 payments of{" "}
            <b>${splitPrice}</b> with
          </Typography>

          <img
            src="/images/pay6.avif"
            style={{ height: 24 }}
          />
        </Box>

        {/* TEXT */}

        <Typography
          sx={styles.description}
        >
          Buy now and pay later for{" "}
          {product?.name}. Subject to
          approval and eligibility.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

const styles = {
  wrapper: {
    padding: "28px",
    position: "relative",
  },

  closeBtn: {
    position: "absolute",
    right: 8,
    top: 8,
  },

  title: {
    textAlign: "center",
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "20px",
  },

  productBox: {
    display: "flex",
    gap: "14px",
    marginBottom: "20px",
    alignItems: "center",
  },

  productImage: {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  productName: {
    fontSize: "14px",
    fontWeight: 500,
  },

  productPrice: {
    marginTop: "6px",
    fontWeight: 700,
    color: "#ff6a00",
  },

  heading: {
    fontWeight: 600,
    marginBottom: "6px",
  },

  text: {
    fontSize: "14px",
    marginBottom: "16px",
  },

  paymentRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },

  description: {
    fontSize: "13px",
    color: "#444",
    marginTop: "12px",
    lineHeight: 1.6,
  },
};