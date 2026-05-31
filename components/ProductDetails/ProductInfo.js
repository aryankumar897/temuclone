// "use client";

// import { useEffect, useState } from "react";

// import {
//   Box,
//   Typography,
//   Button,
//   Rating,
//   Select,
//   MenuItem,
//   IconButton,
// } from "@mui/material";

// import ShareIcon from "@mui/icons-material/Share";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import styles from "./ProductInfoStyles";
// import PayLaterModal from "./PayLaterModal";
// import PriceDetailsModal from "./PriceDetailsModal";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// export default function ProductInfo() {
//   const [openPayLater, setOpenPayLater] = useState(false);
//   /* ------------------ COUNTDOWN TIMER ------------------ */
//   const [openPriceDetails, setOpenPriceDetails] = useState(false);
//   const [timeLeft, setTimeLeft] = useState({
//     hours: 12,
//     minutes: 21,
//     seconds: 40,
//   });

//   const [couponLeft, setCouponLeft] = useState({
//     hours: 23,
//     minutes: 45,
//     seconds: 14,
//   });

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         let { hours, minutes, seconds } = prev;

//         if (seconds > 0) {
//           seconds--;
//         } else {
//           seconds = 59;

//           if (minutes > 0) {
//             minutes--;
//           } else {
//             minutes = 59;

//             if (hours > 0) hours--;
//           }
//         }

//         return { hours, minutes, seconds };
//       });

//       setCouponLeft((prev) => {
//         let { hours, minutes, seconds } = prev;

//         if (seconds > 0) {
//           seconds--;
//         } else {
//           seconds = 59;

//           if (minutes > 0) {
//             minutes--;
//           } else {
//             minutes = 59;

//             if (hours > 0) hours--;
//           }
//         }

//         return { hours, minutes, seconds };
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const format = (num) => String(num).padStart(2, "0");

//   return (
//     <Box sx={styles.wrapper}>
//       {/* TOP PROMO BAR */}

//       <Box sx={styles.topBar}>
//         <Box sx={styles.clearanceBadge}>CLEARANCE DEAL</Box>

//         <Typography sx={styles.topText}>
//           Free shipping on orders over $30 from this seller
//         </Typography>

//         <Typography sx={styles.topText}>✓ $5.00 Credit for delay</Typography>
//       </Box>

//       {/* DELIVERY TAGS */}

//       <Box sx={styles.tagRow}>
//         <Box sx={styles.tag}>No import charges</Box>

//         <Typography sx={styles.delivery}>
//           🚚 Local warehouse - Fastest delivery: <b>2 BUSINESS DAYS</b>
//         </Typography>

//         <Typography sx={styles.qty}>1pc</Typography>

//         <IconButton size="small">
//           <ShareIcon fontSize="small" />
//         </IconButton>
//       </Box>

//       {/* TITLE */}

//       <Typography sx={styles.title}>
//         Microwave Food Cover, Splash Proof Food Cover Lid with Steam Vents And
//         Handle Microwave Oven Heating Cover
//       </Typography>

//       {/* SOLD + RATING */}

//       <Box sx={styles.metaRow}>
//         <Typography sx={styles.sold}>59K+ sold</Typography>

//         <Typography sx={styles.starStore}>⭐ Star store</Typography>

//         <Rating value={4.6} precision={0.1} readOnly size="small" />

//         <Typography sx={styles.rating}>4.6</Typography>
//       </Box>

//       {/* BEST SELLER */}

//       <Box sx={styles.bestRow}>
//         <Box sx={styles.bestSeller}>#3 BEST-SELLING ITEM</Box>

//         <Box sx={styles.bestTime}>Last 6 months</Box>

//         <Typography sx={styles.category}>Dining & Entertaining</Typography>
//       </Box>

//       {/* PRICE */}

//       <Box sx={styles.priceRow}>
//         <Typography sx={styles.oldPrice}>$57.58</Typography>

//         <Typography sx={styles.lastDay}>
//           <AccessTimeIcon sx={{ fontSize: 16 }} /> LAST DAY
//         </Typography>

//         <Typography sx={styles.price}>Est. $3.18</Typography>

//         <Box sx={styles.afterPromoRow}>
//           <Typography sx={styles.afterPromo}>
//             after applying promos to <b>$3.97</b>
//           </Typography>

//           <ArrowForwardIosIcon
//             sx={styles.priceArrow}
//             onClick={() => setOpenPriceDetails(true)}
//           />
//         </Box>
//       </Box>

//       {/* DISCOUNT + PAYMENT */}

//       <Box sx={styles.discountRow}>
//         <Box sx={styles.discount}>94% OFF</Box>

//         <Box sx={styles.payToday}>
//           <Typography sx={styles.payText}>
//             Pay <b>$0.79 today</b>
//           </Typography>

//           <Box
//             sx={styles.paymentIcons}
//             onClick={() => setOpenPayLater(true)}
//             style={{ cursor: "pointer" }}
//           >
//             <img src="/images/pay4.avif" />
//             <img src="/images/pay5.avif" />
//             <img src="/images/pay6.avif" />
//           </Box>
//         </Box>
//       </Box>

//       {/* CLEARANCE TIMER BOX */}

//       <Box sx={styles.clearanceBox}>
//         {/* HEADER */}
//         <Box sx={styles.clearanceHeader}>
//           <Typography sx={styles.clearanceText}>Clearance deal</Typography>

//           <Box sx={styles.timerWrap}>
//             <Box sx={styles.timerIcon}>
//               <AccessTimeIcon sx={{ fontSize: 14 }} />
//             </Box>

//             <Typography sx={styles.timerText}>
//               Ends in {format(timeLeft.hours)}:{format(timeLeft.minutes)}:
//               {format(timeLeft.seconds)}
//             </Typography>
//           </Box>
//         </Box>

//         {/* BODY */}
//         <Box sx={styles.clearanceBody}>
//           <Typography sx={styles.material}>
//             Material: Transparent, Quantity: 1set
//           </Typography>

//           <Box sx={styles.qtyRow}>
//             <Typography sx={{ fontSize: 14 }}>Qty</Typography>

//             <Select size="small" defaultValue={1}>
//               <MenuItem value={1}>1</MenuItem>
//               <MenuItem value={2}>2</MenuItem>
//               <MenuItem value={3}>3</MenuItem>
//             </Select>
//           </Box>
//         </Box>
//       </Box>
//       {/* BUTTONS */}

//       <Box sx={styles.buttons}>
//         <Button sx={styles.cartBtn}>
//           Add to cart
//           <Typography sx={styles.cartSub}>94% OFF</Typography>
//         </Button>

//         <Button sx={styles.buyBtn}>
//           Buy now
//           <Typography sx={styles.coupon}>
//             Coupon ends in {format(couponLeft.hours)}:
//             {format(couponLeft.minutes)}:{format(couponLeft.seconds)}
//           </Typography>
//         </Button>
//       </Box>

//       {/* SHIPPING */}

//       <Box sx={styles.shippingSection}>
//         <Typography sx={styles.shipTitle}>
//           <LocalShippingIcon fontSize="small" />
//           Ships from this seller | From California
//         </Typography>

//         <Typography sx={styles.shipText}>
//           Standard: $2.99 or FREE (if ordering $30.00+ from this seller),
//           Fastest delivery in <b>2 BUSINESS DAYS</b>
//         </Typography>

//         <Typography sx={styles.shipText}>✔ Ships earliest in 1h.</Typography>

//         <Typography sx={styles.shipText}>
//           ✔ No import charges for all local warehouse items
//         </Typography>
//       </Box>

//       {/* SECURITY */}

//       <Box sx={styles.security}>
//         <Typography>
//           <CheckCircleIcon fontSize="small" /> Safe payments · Secure privacy
//         </Typography>

//         <Typography>
//           <CheckCircleIcon fontSize="small" /> Order guarantee
//         </Typography>
//       </Box>

//       {/* GUARANTEE TAGS */}

//       <Box sx={styles.guaranteeRow}>
//         <Box sx={styles.guarantee}>Free returns</Box>

//         <Box sx={styles.guarantee}>Best price guarantee</Box>

//         <Box sx={styles.guarantee}>$5.00 Credit for delay</Box>

//         <Box sx={styles.guarantee}>Return if item damaged</Box>

//         <Box sx={styles.guarantee}>15-day no reason return</Box>
//       </Box>

//       <PayLaterModal
//         open={openPayLater}
//         handleClose={() => setOpenPayLater(false)}
//       />
//       <PriceDetailsModal
//         open={openPriceDetails}
//         handleClose={() => setOpenPriceDetails(false)}
//       />
//     </Box>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";

// import {
//   Box,
//   Typography,
//   Button,
//   Rating,
//   Select,
//   MenuItem,
//   IconButton,
// } from "@mui/material";

// import ShareIcon from "@mui/icons-material/Share";

// import LocalShippingIcon from "@mui/icons-material/LocalShipping";

// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// import AccessTimeIcon from "@mui/icons-material/AccessTime";

// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// import styles from "./ProductInfoStyles";

// import PayLaterModal from "./PayLaterModal";

// import PriceDetailsModal from "./PriceDetailsModal";

// export default function ProductInfo({ product }) {
//   const [openPayLater, setOpenPayLater] = useState(false);

//   const [openPriceDetails, setOpenPriceDetails] = useState(false);

//   const [timeLeft, setTimeLeft] = useState({
//     hours: 12,
//     minutes: 21,
//     seconds: 40,
//   });

//   const [couponLeft, setCouponLeft] = useState({
//     hours: 23,
//     minutes: 45,
//     seconds: 14,
//   });

//   /* ------------------ TIMER ------------------ */

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         let { hours, minutes, seconds } = prev;

//         if (seconds > 0) {
//           seconds--;
//         } else {
//           seconds = 59;

//           if (minutes > 0) {
//             minutes--;
//           } else {
//             minutes = 59;

//             if (hours > 0) hours--;
//           }
//         }

//         return { hours, minutes, seconds };
//       });

//       setCouponLeft((prev) => {
//         let { hours, minutes, seconds } = prev;

//         if (seconds > 0) {
//           seconds--;
//         } else {
//           seconds = 59;

//           if (minutes > 0) {
//             minutes--;
//           } else {
//             minutes = 59;

//             if (hours > 0) hours--;
//           }
//         }

//         return { hours, minutes, seconds };
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const format = (num) => String(num).padStart(2, "0");

//   // 🔥 Dynamic values

//   const originalPrice = product?.price || 0;

//   const specialPrice = product?.special_price || product?.price || 0;

//   const discount =
//     originalPrice > 0
//       ? Math.round(((originalPrice - specialPrice) / originalPrice) * 100)
//       : 0;

//   return (
//     <Box sx={styles.wrapper}>
//       {/* TOP PROMO BAR */}

//       <Box sx={styles.topBar}>
//         <Box sx={styles.clearanceBadge}>CLEARANCE DEAL</Box>

//         <Typography sx={styles.topText}>
//           Free shipping on orders over $30 from this seller
//         </Typography>

//         <Typography sx={styles.topText}>✓ $5.00 Credit for delay</Typography>
//       </Box>

//       {/* DELIVERY TAGS */}

//       <Box sx={styles.tagRow}>
//         <Box sx={styles.tag}>No import charges</Box>

//         <Typography sx={styles.delivery}>
//           🚚 Local warehouse - Fastest delivery: <b>2 BUSINESS DAYS</b>
//         </Typography>

//         <Typography sx={styles.qty}>{product?.qty || 1}pc</Typography>

//         <IconButton size="small">
//           <ShareIcon fontSize="small" />
//         </IconButton>
//       </Box>

//       {/* TITLE */}

//       <Typography sx={styles.title}>{product?.name}</Typography>

//       {/* SOLD + RATING */}

//       <Box sx={styles.metaRow}>
//         <Typography sx={styles.sold}>
//           {product?.viewed || "1K+"} sold
//         </Typography>

//         <Typography sx={styles.starStore}>⭐ Star store</Typography>

//         <Rating
//           value={product?.average_rating || 4.5}
//           precision={0.1}
//           readOnly
//           size="small"
//         />

//         <Typography sx={styles.rating}>
//           {product?.average_rating || 4.5}
//         </Typography>
//       </Box>

//       {/* BEST SELLER */}

//       <Box sx={styles.bestRow}>
//         <Box sx={styles.bestSeller}>#3 BEST-SELLING ITEM</Box>

//         <Box sx={styles.bestTime}>Last 6 months</Box>

//         <Typography sx={styles.category}>
//           {product?.category?.[0]?.name || "Category"}
//         </Typography>
//       </Box>

//       {/* PRICE */}

//       <Box sx={styles.priceRow}>
//         <Typography sx={styles.oldPrice}>${originalPrice}</Typography>

//         <Typography sx={styles.lastDay}>
//           <AccessTimeIcon sx={{ fontSize: 16 }} /> LAST DAY
//         </Typography>

//         <Typography sx={styles.price}>${specialPrice}</Typography>

//         <Box sx={styles.afterPromoRow}>
//           <Typography sx={styles.afterPromo}>
//             after applying promos to <b>${specialPrice}</b>
//           </Typography>

//           <ArrowForwardIosIcon
//             sx={styles.priceArrow}
//             onClick={() => setOpenPriceDetails(true)}
//           />
//         </Box>
//       </Box>

//       {/* DISCOUNT */}

//       <Box sx={styles.discountRow}>
//         <Box sx={styles.discount}>{discount}% OFF</Box>

//         <Box sx={styles.payToday}>
//           <Typography sx={styles.payText}>
//             Pay <b>${specialPrice}</b> today
//           </Typography>

//           <Box
//             sx={styles.paymentIcons}
//             onClick={() => setOpenPayLater(true)}
//             style={{ cursor: "pointer" }}
//           >
//             <img src="/images/pay4.avif" />

//             <img src="/images/pay5.avif" />

//             <img src="/images/pay6.avif" />
//           </Box>
//         </Box>
//       </Box>

//       {/* TIMER */}

//       <Box sx={styles.clearanceBox}>
//         <Box sx={styles.clearanceHeader}>
//           <Typography sx={styles.clearanceText}>Clearance deal</Typography>

//           <Box sx={styles.timerWrap}>
//             <Box sx={styles.timerIcon}>
//               <AccessTimeIcon sx={{ fontSize: 14 }} />
//             </Box>

//             <Typography sx={styles.timerText}>
//               Ends in {format(timeLeft.hours)}:{format(timeLeft.minutes)}:
//               {format(timeLeft.seconds)}
//             </Typography>
//           </Box>
//         </Box>

//         {/* BODY */}

//         <Box sx={styles.clearanceBody}>
//           <Typography sx={styles.material}>
//             SKU: {product?.sku || "N/A"}
//           </Typography>

//           <Box sx={styles.qtyRow}>
//             <Typography sx={{ fontSize: 14 }}>Qty</Typography>

//             <Select size="small" defaultValue={1}>
//               <MenuItem value={1}>1</MenuItem>

//               <MenuItem value={2}>2</MenuItem>

//               <MenuItem value={3}>3</MenuItem>
//             </Select>
//           </Box>
//         </Box>
//       </Box>

//       {/* BUTTONS */}

//       <Box sx={styles.buttons}>
//         <Button sx={styles.cartBtn}>
//           Add to cart
//           <Typography sx={styles.cartSub}>{discount}% OFF</Typography>
//         </Button>

//         <Button sx={styles.buyBtn}>
//           Buy now
//           <Typography sx={styles.coupon}>
//             Coupon ends in {format(couponLeft.hours)}:
//             {format(couponLeft.minutes)}:{format(couponLeft.seconds)}
//           </Typography>
//         </Button>
//       </Box>

//       {/* SHIPPING */}

//       <Box sx={styles.shippingSection}>
//         <Typography sx={styles.shipTitle}>
//           <LocalShippingIcon fontSize="small" />
//           Ships from this seller
//         </Typography>

//         <Typography sx={styles.shipText}>
//           Standard: FREE shipping on eligible orders
//         </Typography>

//         <Typography sx={styles.shipText}>✔ Ships earliest in 1h.</Typography>

//         <Typography sx={styles.shipText}>
//           ✔ No import charges for local warehouse items
//         </Typography>
//       </Box>

//       {/* SECURITY */}

//       <Box sx={styles.security}>
//         <Typography>
//           <CheckCircleIcon fontSize="small" /> Safe payments · Secure privacy
//         </Typography>

//         <Typography>
//           <CheckCircleIcon fontSize="small" /> Order guarantee
//         </Typography>
//       </Box>

//       {/* GUARANTEE */}

//       <Box sx={styles.guaranteeRow}>
//         <Box sx={styles.guarantee}>Free returns</Box>

//         <Box sx={styles.guarantee}>Best price guarantee</Box>

//         <Box sx={styles.guarantee}>$5.00 Credit for delay</Box>

//         <Box sx={styles.guarantee}>Return if item damaged</Box>

//         <Box sx={styles.guarantee}>15-day no reason return</Box>
//       </Box>

//       {/* MODALS */}

//       <PayLaterModal
//         open={openPayLater}
//         handleClose={() => setOpenPayLater(false)}
//         product={product}
//       />

//       <PriceDetailsModal
//         open={openPriceDetails}
//         handleClose={() => setOpenPriceDetails(false)}
//         product={product}
//       />
//     </Box>
//   );
// }

"use client";

import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Button,
  Rating,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";

import ShareIcon from "@mui/icons-material/Share";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import AccessTimeIcon from "@mui/icons-material/AccessTime";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import styles from "./ProductInfoStyles";

import PayLaterModal from "./PayLaterModal";

import PriceDetailsModal from "./PriceDetailsModal";
import toast from "react-hot-toast";

import { useDispatch } from "react-redux";

import { addToCart } from "@/slice/cartSlice";

import { useSession } from "next-auth/react";
export default function ProductInfo({
  product,
  variants,
  selectedVariant,
  setSelectedVariant,
}) {
  const dispatch = useDispatch();

  const { data: session } = useSession();

  const [openPayLater, setOpenPayLater] = useState(false);

  const [openPriceDetails, setOpenPriceDetails] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 21,
    seconds: 40,
  });

  const [couponLeft, setCouponLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 14,
  });

  /* ------------------ TIMER ------------------ */

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;

          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;

            if (hours > 0) hours--;
          }
        }

        return { hours, minutes, seconds };
      });

      setCouponLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;

          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;

            if (hours > 0) hours--;
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num) => String(num).padStart(2, "0");

  // 🔥 DYNAMIC PRICE

  const originalPrice = selectedVariant?.price || product?.price || 0;

  const specialPrice =
    selectedVariant?.special_price ||
    selectedVariant?.price ||
    product?.special_price ||
    product?.price ||
    0;

  const discount =
    originalPrice > 0
      ? Math.round(((originalPrice - specialPrice) / originalPrice) * 100)
      : 0;

  /* -------------------------------- */
  /* 🔥 GROUP ATTRIBUTES FROM VARIANTS */
  /* -------------------------------- */

  const groupedAttributes = {};

  variants?.forEach((variant) => {
    variant.attributes.forEach((attr) => {
      const attributeName = attr.attribute.name;

      if (!groupedAttributes[attributeName]) {
        groupedAttributes[attributeName] = [];
      }

      // 🔥 AVOID DUPLICATES
      const alreadyExists = groupedAttributes[attributeName].some(
        (item) => item.value === attr.value,
      );

      if (!alreadyExists) {
        groupedAttributes[attributeName].push({
          value: attr.value,

          // 🔥 VARIANT IMAGE
          image: variant.media?.[0]?.url || null,

          variant,
        });
      }
    });
  });

  return (
    <Box sx={styles.wrapper}>
      {/* TOP PROMO BAR */}

      <Box sx={styles.topBar}>
        <Box sx={styles.clearanceBadge}>CLEARANCE DEAL</Box>

        <Typography sx={styles.topText}>
          Free shipping on orders over $30 from this seller
        </Typography>

        <Typography sx={styles.topText}>✓ $5.00 Credit for delay</Typography>
      </Box>

      {/* DELIVERY TAGS */}

      <Box sx={styles.tagRow}>
        <Box sx={styles.tag}>No import charges</Box>

        <Typography sx={styles.delivery}>
          🚚 Local warehouse - Fastest delivery:
          <b> 2 BUSINESS DAYS</b>
        </Typography>

        <Typography sx={styles.qty}>
          {selectedVariant?.stock || product?.qty || 1}
          pc
        </Typography>

        <IconButton size="small">
          <ShareIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* TITLE */}

      <Typography sx={styles.title}>{product?.name}</Typography>

      {/* SOLD + RATING */}

      <Box sx={styles.metaRow}>
        <Typography sx={styles.sold}>
          {product?.viewed || "1K+"} sold
        </Typography>

        <Typography sx={styles.starStore}>⭐ Star store</Typography>

        <Rating
          value={product?.average_rating || 4.5}
          precision={0.1}
          readOnly
          size="small"
        />

        <Typography sx={styles.rating}>
          {product?.average_rating || 4.5}
        </Typography>
      </Box>

      {/* BEST SELLER */}

      <Box sx={styles.bestRow}>
        <Box sx={styles.bestSeller}>#3 BEST-SELLING ITEM</Box>

        <Box sx={styles.bestTime}>Last 6 months</Box>

        <Typography sx={styles.category}>
          {product?.category?.[0]?.name || "Category"}
        </Typography>
      </Box>

      {/* -------------------------------- */}
      {/* 🔥 TEMU STYLE VARIANTS */}
      {/* -------------------------------- */}

      {Object.entries(groupedAttributes).map(([attributeName, values]) => (
        <Box key={attributeName} sx={{ mt: 3 }}>
          {/* TITLE */}

          <Typography
            sx={{
              fontWeight: 600,
              mb: 1.5,
              fontSize: "15px",
            }}
          >
            {attributeName}:{" "}
            <span style={{ fontWeight: 400 }}>
              {
                selectedVariant?.attributes?.find(
                  (a) => a.attribute.name === attributeName,
                )?.value
              }
            </span>
          </Typography>

          {/* OPTIONS */}

          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              flexWrap: "wrap",
            }}
          >
            {values.map((item, index) => {
              const isSelected = selectedVariant?.attributes?.some(
                (attr) =>
                  attr.attribute.name === attributeName &&
                  attr.value === item.value,
              );

              return (
                <Box
                  key={index}
                  onClick={() => setSelectedVariant(item.variant)}
                  sx={{
                    border: isSelected ? "2px solid black" : "1px solid #ddd",

                    borderRadius: "10px",

                    overflow: "hidden",

                    cursor: "pointer",

                    width: item.image ? "90px" : "70px",

                    transition: "0.2s",

                    background: "#fff",

                    "&:hover": {
                      border: "2px solid black",
                    },
                  }}
                >
                  {/* IMAGE */}

                  {item.image && (
                    <Box
                      component="img"
                      src={item.image}
                      sx={{
                        width: "100%",
                        height: "90px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  )}

                  {/* TEXT */}

                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "13px",
                      p: 1,
                      fontWeight: 500,
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      ))}

      {/* PRICE */}

      <Box sx={styles.priceRow}>
        <Typography sx={styles.oldPrice}>${originalPrice}</Typography>

        <Typography sx={styles.lastDay}>
          <AccessTimeIcon sx={{ fontSize: 16 }} />
          LAST DAY
        </Typography>

        <Typography sx={styles.price}>${specialPrice}</Typography>

        <Box sx={styles.afterPromoRow}>
          <Typography sx={styles.afterPromo}>
            after applying promos to
            <b> ${specialPrice}</b>
          </Typography>

          <ArrowForwardIosIcon
            sx={styles.priceArrow}
            onClick={() => setOpenPriceDetails(true)}
          />
        </Box>
      </Box>

      {/* DISCOUNT */}

      <Box sx={styles.discountRow}>
        <Box sx={styles.discount}>{discount}% OFF</Box>

        <Box sx={styles.payToday}>
          <Typography sx={styles.payText}>
            Pay <b>${specialPrice}</b> today
          </Typography>

          <Box
            sx={styles.paymentIcons}
            onClick={() => setOpenPayLater(true)}
            style={{ cursor: "pointer" }}
          >
            <img src="/images/pay4.avif" />

            <img src="/images/pay5.avif" />

            <img src="/images/pay6.avif" />
          </Box>
        </Box>
      </Box>

      {/* TIMER */}

      <Box sx={styles.clearanceBox}>
        <Box sx={styles.clearanceHeader}>
          <Typography sx={styles.clearanceText}>Clearance deal</Typography>

          <Box sx={styles.timerWrap}>
            <Box sx={styles.timerIcon}>
              <AccessTimeIcon sx={{ fontSize: 14 }} />
            </Box>

            <Typography sx={styles.timerText}>
              Ends in {format(timeLeft.hours)}:{format(timeLeft.minutes)}:
              {format(timeLeft.seconds)}
            </Typography>
          </Box>
        </Box>

        {/* BODY */}

        <Box sx={styles.clearanceBody}>
          <Typography sx={styles.material}>
            SKU: {selectedVariant?.sku || product?.sku || "N/A"}
          </Typography>

          <Box sx={styles.qtyRow}>
            <Typography sx={{ fontSize: 14 }}>Qty</Typography>

            <Select size="small" defaultValue={1}>
              <MenuItem value={1}>1</MenuItem>

              <MenuItem value={2}>2</MenuItem>

              <MenuItem value={3}>3</MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>

      {/* BUTTONS */}

      {/* BUTTONS */}

      <Box sx={styles.buttons}>
        <Button
          sx={styles.cartBtn}
          onClick={() => {
            // ❌ NOT LOGGED IN
            if (!session?.user?._id) {
              return toast.error("Please login first");
            }

            dispatch(
              addToCart({
                userId: session?.user?._id,

                productId: product._id,

                variantId: selectedVariant._id,

                quantity: 1,

                price: selectedVariant.price,

                special_price: selectedVariant.special_price,
              }),
            );
          }}
        >
          Add to cart
          <Typography sx={styles.cartSub}>{discount}% OFF</Typography>
        </Button>

        <Button sx={styles.buyBtn}>
          Buy now
          <Typography sx={styles.coupon}>
            Coupon ends in {format(couponLeft.hours)}:
            {format(couponLeft.minutes)}:{format(couponLeft.seconds)}
          </Typography>
        </Button>
      </Box>

      {/* SHIPPING */}

      <Box sx={styles.shippingSection}>
        <Typography sx={styles.shipTitle}>
          <LocalShippingIcon fontSize="small" />
          Ships from this seller
        </Typography>

        <Typography sx={styles.shipText}>
          Standard: FREE shipping on eligible orders
        </Typography>

        <Typography sx={styles.shipText}>✔ Ships earliest in 1h.</Typography>

        <Typography sx={styles.shipText}>
          ✔ No import charges for local warehouse items
        </Typography>
      </Box>

      {/* SECURITY */}

      <Box sx={styles.security}>
        <Typography>
          <CheckCircleIcon fontSize="small" />
          Safe payments · Secure privacy
        </Typography>

        <Typography>
          <CheckCircleIcon fontSize="small" />
          Order guarantee
        </Typography>
      </Box>

      {/* GUARANTEE */}

      <Box sx={styles.guaranteeRow}>
        <Box sx={styles.guarantee}>Free returns</Box>

        <Box sx={styles.guarantee}>Best price guarantee</Box>

        <Box sx={styles.guarantee}>$5.00 Credit for delay</Box>

        <Box sx={styles.guarantee}>Return if item damaged</Box>

        <Box sx={styles.guarantee}>15-day no reason return</Box>
      </Box>

      {/* MODALS */}

      <PayLaterModal
        open={openPayLater}
        handleClose={() => setOpenPayLater(false)}
        product={product}
      />

      <PriceDetailsModal
        open={openPriceDetails}
        handleClose={() => setOpenPriceDetails(false)}
        product={product}
      />
    </Box>
  );
}
