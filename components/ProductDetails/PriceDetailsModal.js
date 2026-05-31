// "use client";

// import {
//   Dialog,
//   Box,
//   Typography,
//   IconButton,
//   Button,
//   Divider,
// } from "@mui/material";

// import CloseIcon from "@mui/icons-material/Close";

// export default function PriceDetailsModal({ open, handleClose }) {
//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       fullWidth
//       maxWidth={false}
//       PaperProps={{
//         sx: {
//           width: { xs: "100%", sm: "420px" },
//           maxWidth: "95vw",
//           height: "85vh",
//           borderRadius: "10px",
//           display: "flex",
//           flexDirection: "column",
//         },
//       }}
//     >
//       {/* HEADER */}

//       <Box sx={styles.header}>
//         <Typography sx={styles.title}>Price details</Typography>

//         <IconButton onClick={handleClose} sx={styles.close}>
//           <CloseIcon />
//         </IconButton>
//       </Box>

//       {/* SCROLLABLE CONTENT */}

//       <Box sx={styles.body}>
//         {/* ITEM PRICE */}

//         <Box sx={styles.row}>
//           <Typography>Item price:</Typography>
//           <Typography>$57.58</Typography>
//         </Box>

//         {/* DISCOUNT */}

//         <Box sx={styles.row}>
//           <Typography>Discount:</Typography>

//           <Box textAlign="right">
//             <Typography sx={styles.orange}>-$53.61</Typography>
//             <Typography>$3.97</Typography>
//           </Box>
//         </Box>

//         {/* EXTRA BONUS */}

//         <Box sx={styles.row}>
//           <Typography>Extra bonus:</Typography>
//           <Typography sx={styles.orange}>-$0.79</Typography>
//         </Box>

//         <Divider sx={{ my: 2 }} />

//         {/* TOTAL */}

//         <Box sx={styles.row}>
//           <Typography sx={styles.bold}>Estimated total:</Typography>

//           <Typography sx={styles.bold}>$3.18</Typography>
//         </Box>

//         {/* BUY BUTTON */}

//         <Button sx={styles.buyBtn}>Buy now</Button>

//         {/* DISCLAIMER */}

//         <Typography sx={styles.disclaimer}>
//           All prices shown above with respect to this product are estimated only
//           and are subject to coupon availability, rules, and credit available on
//           your account. Some coupons and credits may only apply once to your
//           entire cart and the prices above for this item may vary based on other
//           items in your cart. You can modify which promos and credits apply at
//           checkout.
//         </Typography>

//         {/* COUPON SECTION */}

//         <Typography sx={styles.sectionTitle}>Coupons & offers</Typography>

//         <Box sx={styles.couponCard}>
//           <Box sx={styles.couponHeader}>
//             <Typography sx={styles.orangeBold}>Extra bonus</Typography>

//             <Typography sx={styles.timerLabel}>Ends in</Typography>

//             <Box sx={styles.timer}>23 : 09 : 09</Box>
//           </Box>

//           <Typography sx={styles.couponText}>
//             The 'Extra bonus' offer is a limited-time additional discount. If it
//             is not used before it expires, the discount will automatically
//             expire, and the item price will return to its original amount.
//           </Typography>
//         </Box>
//       </Box>
//     </Dialog>
//   );
// }

// const styles = {
//   paper: {
//     borderRadius: "10px",
//     height: "90vh",

//     "@media (max-width:600px)": {
//       height: "100vh",
//       borderRadius: 0,
//     },
//   },

//   header: {
//     position: "relative",
//     padding: "18px 20px",
//     borderBottom: "1px solid #eee",
//     textAlign: "center",
//   },

//   title: {
//     fontSize: "16px",
//     fontWeight: 600,
//   },

//   close: {
//     position: "absolute",
//     right: 10,
//     top: 10,
//   },

//   body: {
//     padding: "20px",
//     overflowY: "auto",

//     height: "calc(90vh - 60px)",

//     "@media (max-width:600px)": {
//       height: "calc(100vh - 60px)",
//     },
//   },

//   row: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: "10px",
//     fontSize: "13px",
//     lineHeight: 1.4,
//   },

//   bold: {
//     fontWeight: 600,
//     fontSize: "14px",
//   },

//   orange: {
//     color: "#ff6a00",
//     fontSize: "13px",
//   },

//   buyBtn: {
//     width: "100%",
//     background: "#ff6a00",
//     color: "#fff",
//     borderRadius: "40px",
//     padding: "14px",
//     marginTop: "18px",
//     fontWeight: 600,
//     fontSize: "15px",

//     "&:hover": {
//       background: "#e55d00",
//     },
//   },

//   disclaimer: {
//     fontSize: "12px",
//     color: "#666",
//     marginTop: "14px",
//     lineHeight: 1.6,
//   },

//   sectionTitle: {
//     marginTop: "24px",
//     fontWeight: 600,
//   },

//   couponCard: {
//     background: "#f4ede6",
//     padding: "14px",
//     borderRadius: "6px",
//     marginTop: "10px",
//   },

//   couponHeader: {
//     display: "flex",
//     alignItems: "center",
//     gap: "6px",
//     marginBottom: "6px",
//   },

//   orangeBold: {
//     color: "#ff6a00",
//     fontWeight: 600,
//   },

//   timerLabel: {
//     fontSize: "13px",
//   },

//   timer: {
//     background: "#333",
//     color: "#fff",
//     fontSize: "12px",
//     padding: "2px 6px",
//     borderRadius: "3px",
//   },

//   couponText: {
//     fontSize: "13px",
//     color: "#444",
//     lineHeight: 1.5,
//   },
// };


"use client";

import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

export default function PriceDetailsModal({
  open,
  handleClose,
  product,
}) {
  const originalPrice =
    product?.price || 0;

  const specialPrice =
    product?.special_price ||
    originalPrice;

  const discount = (
    originalPrice - specialPrice
  ).toFixed(2);

  const estimatedTotal =
    specialPrice.toFixed(2);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={false}
      PaperProps={{
        sx: {
          width: {
            xs: "100%",
            sm: "420px",
          },

          maxWidth: "95vw",

          height: "85vh",

          borderRadius: "10px",

          display: "flex",

          flexDirection: "column",
        },
      }}
    >
      {/* HEADER */}

      <Box sx={styles.header}>
        <Typography sx={styles.title}>
          Price details
        </Typography>

        <IconButton
          onClick={handleClose}
          sx={styles.close}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* BODY */}

      <Box sx={styles.body}>
        {/* PRODUCT */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
          }}
        >
          <img
            src={
              product?.media?.[0]?.url
            }
            style={{
              width: 70,
              height: 70,
              borderRadius: 10,
              objectFit: "cover",
            }}
          />

          <Box>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {product?.name}
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                color: "#666",
                mt: 0.5,
              }}
            >
              SKU: {product?.sku}
            </Typography>
          </Box>
        </Box>

        {/* ITEM PRICE */}

        <Box sx={styles.row}>
          <Typography>
            Item price:
          </Typography>

          <Typography>
            ${originalPrice}
          </Typography>
        </Box>

        {/* DISCOUNT */}

        <Box sx={styles.row}>
          <Typography>
            Discount:
          </Typography>

          <Box textAlign="right">
            <Typography
              sx={styles.orange}
            >
              -${discount}
            </Typography>

            <Typography>
              ${specialPrice}
            </Typography>
          </Box>
        </Box>

        {/* EXTRA BONUS */}

        <Box sx={styles.row}>
          <Typography>
            Extra bonus:
          </Typography>

          <Typography
            sx={styles.orange}
          >
            -$0.00
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* TOTAL */}

        <Box sx={styles.row}>
          <Typography sx={styles.bold}>
            Estimated total:
          </Typography>

          <Typography sx={styles.bold}>
            ${estimatedTotal}
          </Typography>
        </Box>

        {/* BUY */}

        <Button sx={styles.buyBtn}>
          Buy now
        </Button>

        {/* DISCLAIMER */}

        <Typography
          sx={styles.disclaimer}
        >
          Prices for{" "}
          {product?.name} may change
          depending on offers, coupons,
          and availability.
        </Typography>

        {/* COUPONS */}

        <Typography
          sx={styles.sectionTitle}
        >
          Coupons & offers
        </Typography>

        <Box sx={styles.couponCard}>
          <Box sx={styles.couponHeader}>
            <Typography
              sx={styles.orangeBold}
            >
              Special discount
            </Typography>

            <Typography
              sx={styles.timerLabel}
            >
              Limited time
            </Typography>

            <Box sx={styles.timer}>
              SALE
            </Box>
          </Box>

          <Typography
            sx={styles.couponText}
          >
            Save instantly on{" "}
            {product?.name} with current
            promotional pricing.
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
}




const styles = {
  paper: {
    borderRadius: "10px",
    height: "90vh",

    "@media (max-width:600px)": {
      height: "100vh",
      borderRadius: 0,
    },
  },

  header: {
    position: "relative",
    padding: "18px 20px",
    borderBottom: "1px solid #eee",
    textAlign: "center",
  },

  title: {
    fontSize: "16px",
    fontWeight: 600,
  },

  close: {
    position: "absolute",
    right: 10,
    top: 10,
  },

  body: {
    padding: "20px",
    overflowY: "auto",

    height: "calc(90vh - 60px)",

    "@media (max-width:600px)": {
      height: "calc(100vh - 60px)",
    },
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "10px",
    fontSize: "13px",
    lineHeight: 1.4,
  },

  bold: {
    fontWeight: 600,
    fontSize: "14px",
  },

  orange: {
    color: "#ff6a00",
    fontSize: "13px",
  },

  buyBtn: {
    width: "100%",
    background: "#ff6a00",
    color: "#fff",
    borderRadius: "40px",
    padding: "14px",
    marginTop: "18px",
    fontWeight: 600,
    fontSize: "15px",

    "&:hover": {
      background: "#e55d00",
    },
  },

  disclaimer: {
    fontSize: "12px",
    color: "#666",
    marginTop: "14px",
    lineHeight: 1.6,
  },

  sectionTitle: {
    marginTop: "24px",
    fontWeight: 600,
  },

  couponCard: {
    background: "#f4ede6",
    padding: "14px",
    borderRadius: "6px",
    marginTop: "10px",
  },

  couponHeader: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "6px",
  },

  orangeBold: {
    color: "#ff6a00",
    fontWeight: 600,
  },

  timerLabel: {
    fontSize: "13px",
  },

  timer: {
    background: "#333",
    color: "#fff",
    fontSize: "12px",
    padding: "2px 6px",
    borderRadius: "3px",
  },

  couponText: {
    fontSize: "13px",
    color: "#444",
    lineHeight: 1.5,
  },
};
