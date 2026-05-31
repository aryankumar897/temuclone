// "use client";

// import { Box, Typography, Button, Divider } from "@mui/material";

// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import LockIcon from "@mui/icons-material/Lock";
// import SecurityIcon from "@mui/icons-material/Security";

// import styles from "./cartRightStyles";

// export default function CartRight() {
//   return (
//     <Box  sx={styles.wrapper}>
//       <Typography sx={styles.heading}>Order Summary</Typography>

//       {/* totals */}

//       <Box sx={styles.row}>
//         <Typography sx={styles.label}>Item(s) total:</Typography>

//         <Typography sx={styles.oldPrice}>$1,095.00</Typography>
//       </Box>

//       <Box sx={styles.row}>
//         <Typography sx={styles.label}>Item(s) discount:</Typography>

//         <Typography sx={styles.discount}>-$803.04</Typography>
//       </Box>

//       <Divider sx={{ my: 2 }} />

//       {/* estimated */}

//       <Box sx={styles.row}>
//         <Typography sx={styles.estimate}>Estimated total</Typography>

//         <Typography sx={styles.totalPrice}>$291.96</Typography>
//       </Box>

//       {/* green guarantee */}

//       <Box sx={styles.guaranteeBox}>
//         <SecurityIcon sx={styles.guaranteeIcon} />

//         <Typography sx={styles.guaranteeText}>
//           Your order is covered by Temu's 200% price match guarantee. Get double
//           the difference!
//         </Typography>
//       </Box>

//       <Typography sx={styles.note}>
//         Please refer to your final actual payment amount.
//       </Typography>

//       <Typography sx={styles.note}>
//         Taxes and delivery fees are calculated on the next page.
//       </Typography>

//       <Divider sx={{ my: 2 }} />

//       {/* paypal offer */}

//       <Typography sx={styles.offer}>
//         Extra $6 off orders $60+ with PayPal. T&Cs apply.
//       </Typography>

//       {/* checkout button */}

//       <Button sx={styles.checkoutBtn}>Checkout (15)</Button>

//       {/* payment strip */}

//       <Box sx={styles.paymentStrip}>
//         Pay $27.04 today with Affirm & Paypal & Afterpay & Klarna
//       </Box>

//       {/* paypal express */}

//       <Button sx={styles.paypalBtn}>
//         Express checkout with
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
//           style={{ height: 18, marginLeft: 8 }}
//         />
//       </Button>

//       {/* info */}

//       <Box sx={styles.infoRow}>
//         <InfoOutlinedIcon sx={styles.icon} />
//         <Typography sx={styles.infoText}>
//           Item availability and pricing are not guaranteed until payment is
//           final.
//         </Typography>
//       </Box>

//       <Box sx={styles.infoRow}>
//         <LockIcon sx={styles.icon} />
//         <Typography sx={styles.infoText}>
//           You will not be charged until you review this order on the next page
//         </Typography>
//       </Box>

//       {/* safe payment */}

//       <Box sx={styles.safeRow}>
//         <SecurityIcon sx={{ color: "#1a7f37", mr: 1 }} />

//         <Typography sx={styles.safeTitle}>Safe Payment Options</Typography>
//       </Box>

//       <Typography sx={styles.safeText}>
//         Temu is committed to protecting your payment information.
//       </Typography>

//       <Typography sx={styles.safeTextLight}>
//         We follow PCI DSS standards, use strong encryption, and perform regular
//         reviews of its system to protect your privacy.
//       </Typography>

//       {/* payment logos */}

//       <Box sx={styles.paymentLogos}>

//         <img src="/images/pay1.avif" style={styles.paymentIcon} />
//               <img src="/images/pay2.avif" style={styles.paymentIcon} />
//               <img src="/images/pay3.avif" style={styles.paymentIcon} />
//               <img src="/images/pay4.avif" style={styles.paymentIcon} />
//               <img src="/images/pay5.avif" style={styles.paymentIcon} />
//               <img src="/images/pay6.avif" style={styles.paymentIcon} />
//               <img src="/images/pay7.avif" style={styles.paymentIcon} />
//               <img src="/images/pay8.avif" style={styles.paymentIcon} />
//               <img src="/images/pay9.avif" style={styles.paymentIcon} />
//               <img src="/images/pay10.avif" style={styles.paymentIcon} />
//               <img src="/images/pay11.avif" style={styles.paymentIcon} />
//               <img src="/images/pay12.avif" style={styles.paymentIcon} />
//               <img src="/images/pay13.avif" style={styles.paymentIcon} />
//               <img src="/images/pay14.avif" style={styles.paymentIcon} />
//               <img src="/images/pay15.avif" style={styles.paymentIcon} />
//               <img src="/images/pay16.avif" style={styles.paymentIcon} />

//       </Box>
//     </Box>
//   );
// }

"use client";

import { Box, Typography, Button, Divider } from "@mui/material";

import { useSelector } from "react-redux";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import LockIcon from "@mui/icons-material/Lock";

import SecurityIcon from "@mui/icons-material/Security";

import styles from "./cartRightStyles";
import { applyCoupon, removeCoupon } from "@/slice/cartSlice";
import { TextField } from "@mui/material";

import { useState } from "react";

import { useDispatch } from "react-redux";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function CartRight() {
  const { cart } = useSelector((state) => state.cart);
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: session } = useSession();

  const [couponCode, setCouponCode] = useState("");

  // 🔥 TOTALS

  const itemTotal =
    cart?.items?.reduce((acc, item) => acc + item.price * item.quantity, 0) ||
    0;

  const discountedTotal =
    cart?.items?.reduce(
      (acc, item) => acc + (item.special_price || item.price) * item.quantity,
      0,
    ) || 0;

  const discount = itemTotal - discountedTotal;
  // 🔥 COUPON

  const couponDiscount = cart?.coupon?.discount_amount || 0;

  const finalTotal = cart?.coupon?.final_total || discountedTotal;
  // 🔥 TOTAL ITEMS

  const totalItems =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <Box sx={styles.wrapper}>
      <Typography sx={styles.heading}>Order Summary</Typography>

      {/* totals */}

      <Box sx={styles.row}>
        <Typography sx={styles.label}>Item(s) total:</Typography>

        <Typography sx={styles.oldPrice}>${itemTotal.toFixed(2)}</Typography>
      </Box>

      <Box sx={styles.row}>
        <Typography sx={styles.label}>Item(s) discount:</Typography>

        <Typography sx={styles.discount}>-${discount.toFixed(2)}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* estimated */}

      <Box sx={styles.row}>
        <Typography sx={styles.estimate}>Estimated total</Typography>

        <Typography sx={styles.totalPrice}>
          {/* ${discountedTotal.toFixed(2)} */}${finalTotal.toFixed(2)}
        </Typography>
      </Box>
      {/* 🔥 COUPON */}

      <Box sx={{ mt: 3 }}>
        <Typography
          sx={{
            fontWeight: 600,
            mb: 1,
          }}
        >
          Apply Coupon
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />

          {!cart?.coupon?.code ? (
            <Button
              variant="contained"
              onClick={() =>
                dispatch(
                  applyCoupon({
                    userId: session?.user?._id,

                    code: couponCode,
                  }),
                )
              }
            >
              Apply
            </Button>
          ) : (
            <Button
              color="error"
              variant="contained"
              onClick={() =>
                dispatch(
                  removeCoupon({
                    userId: session?.user?._id,
                  }),
                )
              }
            >
              Remove
            </Button>
          )}
        </Box>

        {/* APPLIED */}

        {cart?.coupon?.code && (
          <Typography
            sx={{
              mt: 1,
              color: "green",
              fontSize: "14px",
            }}
          >
            Coupon "{cart.coupon.code}" applied. -$
            {couponDiscount.toFixed(2)}
          </Typography>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />
      {/* green guarantee */}

      <Box sx={styles.guaranteeBox}>
        <SecurityIcon sx={styles.guaranteeIcon} />

        <Typography sx={styles.guaranteeText}>
          Your order is covered by Temu's 200% price match guarantee. Get double
          the difference!
        </Typography>
      </Box>

      <Typography sx={styles.note}>
        Please refer to your final actual payment amount.
      </Typography>

      <Typography sx={styles.note}>
        Taxes and delivery fees are calculated on the next page.
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* paypal offer */}

      <Typography sx={styles.offer}>
        Extra $6 off orders $60+ with PayPal. T&Cs apply.
      </Typography>

      {/* checkout button */}

      <Button sx={styles.checkoutBtn} onClick={() => router.push("/checkout")}>
        Checkout ({totalItems})
      </Button>

      {/* payment strip */}

      <Box sx={styles.paymentStrip}>
        Pay ${discountedTotal > 0 ? (discountedTotal / 4).toFixed(2) : "0.00"}
        today with Affirm & Paypal & Afterpay & Klarna
      </Box>

      {/* paypal express */}

      <Button sx={styles.paypalBtn}>
        Express checkout with
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
          style={{
            height: 18,
            marginLeft: 8,
          }}
        />
      </Button>

      {/* info */}

      <Box sx={styles.infoRow}>
        <InfoOutlinedIcon sx={styles.icon} />

        <Typography sx={styles.infoText}>
          Item availability and pricing are not guaranteed until payment is
          final.
        </Typography>
      </Box>

      <Box sx={styles.infoRow}>
        <LockIcon sx={styles.icon} />

        <Typography sx={styles.infoText}>
          You will not be charged until you review this order on the next page
        </Typography>
      </Box>

      {/* safe payment */}

      <Box sx={styles.safeRow}>
        <SecurityIcon
          sx={{
            color: "#1a7f37",
            mr: 1,
          }}
        />

        <Typography sx={styles.safeTitle}>Safe Payment Options</Typography>
      </Box>

      <Typography sx={styles.safeText}>
        Temu is committed to protecting your payment information.
      </Typography>

      <Typography sx={styles.safeTextLight}>
        We follow PCI DSS standards, use strong encryption, and perform regular
        reviews of its system to protect your privacy.
      </Typography>

      {/* payment logos */}

      <Box sx={styles.paymentLogos}>
        <img src="/images/pay1.avif" style={styles.paymentIcon} />

        <img src="/images/pay2.avif" style={styles.paymentIcon} />

        <img src="/images/pay3.avif" style={styles.paymentIcon} />

        <img src="/images/pay4.avif" style={styles.paymentIcon} />

        <img src="/images/pay5.avif" style={styles.paymentIcon} />

        <img src="/images/pay6.avif" style={styles.paymentIcon} />

        <img src="/images/pay7.avif" style={styles.paymentIcon} />

        <img src="/images/pay8.avif" style={styles.paymentIcon} />

        <img src="/images/pay9.avif" style={styles.paymentIcon} />

        <img src="/images/pay10.avif" style={styles.paymentIcon} />

        <img src="/images/pay11.avif" style={styles.paymentIcon} />

        <img src="/images/pay12.avif" style={styles.paymentIcon} />

        <img src="/images/pay13.avif" style={styles.paymentIcon} />

        <img src="/images/pay14.avif" style={styles.paymentIcon} />

        <img src="/images/pay15.avif" style={styles.paymentIcon} />

        <img src="/images/pay16.avif" style={styles.paymentIcon} />
      </Box>
    </Box>
  );
}
