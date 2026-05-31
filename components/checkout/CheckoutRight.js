// // components/checkout/CheckoutRight.jsx

// "use client";

// import { Box, Typography, Stack, Divider } from "@mui/material";

// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// import { rightCard, productImage } from "./checkoutStyles";

// const products = [
//   {
//     id: 1,
//     title: "Men's Classic Baseball Cap",
//     color: "Khaki",
//     price: "$5.47",
//     qty: 1,
//     image:
//       "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=500&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     title: "Wireless Earbuds Bluetooth 5.3",
//     color: "Black",
//     price: "$8.39",
//     qty: 1,
//     image:
//       "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?q=80&w=500&auto=format&fit=crop",
//   },
//   {
//     id: 3,
//     title: "Shockproof Phone Case",
//     color: "For iPhone 14 / Black",
//     price: "$3.59",
//     qty: 1,
//     image:
//       "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=500&auto=format&fit=crop",
//   },
// ];

// export default function CheckoutRight() {
//   return (
//     <Box>
//       {/* ORDER SUMMARY */}
//       <Box sx={rightCard}>
//         <Stack direction="row" justifyContent="space-between" mb={2}>
//           <Typography sx={{ fontWeight: 700 }}>Order summary (3)</Typography>

//           <Typography
//             sx={{
//               fontSize: "14px",
//               color: "#444",
//               cursor: "pointer",
//             }}
//           >
//             Edit
//           </Typography>
//         </Stack>

//         {products.map((product) => (
//           <Box
//             key={product.id}
//             sx={{
//               display: "flex",
//               gap: 1.5,
//               mb: 2,
//             }}
//           >
//             <Box
//               component="img"
//               src={product.image}
//               alt={product.title}
//               sx={productImage}
//             />

//             <Box flex={1}>
//               <Typography
//                 sx={{
//                   fontSize: "14px",
//                   fontWeight: 500,
//                   lineHeight: 1.3,
//                 }}
//               >
//                 {product.title}
//               </Typography>

//               <Typography
//                 sx={{
//                   fontSize: "13px",
//                   color: "#777",
//                   mt: 0.3,
//                 }}
//               >
//                 {product.color}
//               </Typography>

//               <Typography
//                 sx={{
//                   fontWeight: 700,
//                   mt: 0.5,
//                 }}
//               >
//                 {product.price}
//               </Typography>
//             </Box>

//             <Typography
//               sx={{
//                 fontSize: "13px",
//                 color: "#444",
//               }}
//             >
//               Qty: {product.qty}
//             </Typography>
//           </Box>
//         ))}

//         <Divider sx={{ my: 2 }} />

//         <Stack spacing={1}>
//           <Stack direction="row" justifyContent="space-between">
//             <Typography sx={{ fontSize: "14px" }}>Item(s) total:</Typography>

//             <Typography sx={{ fontSize: "14px" }}>$17.45</Typography>
//           </Stack>

//           <Stack direction="row" justifyContent="space-between">
//             <Typography sx={{ fontSize: "14px" }}>Shipping:</Typography>

//             <Typography
//               sx={{
//                 fontSize: "14px",
//                 color: "#00a650",
//                 fontWeight: 700,
//               }}
//             >
//               FREE
//             </Typography>
//           </Stack>

//           <Stack direction="row" justifyContent="space-between">
//             <Typography
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 0.5,
//                 fontSize: "14px",
//               }}
//             >
//               Sales tax
//               <InfoOutlinedIcon sx={{ fontSize: 15 }} />
//             </Typography>

//             <Typography sx={{ fontSize: "14px" }}>$1.57</Typography>
//           </Stack>
//         </Stack>

//         <Divider sx={{ my: 2 }} />

//         <Stack direction="row" justifyContent="space-between">
//           <Typography
//             sx={{
//               fontWeight: 700,
//               fontSize: "16px",
//             }}
//           >
//             Order total:
//           </Typography>

//           <Typography
//             sx={{
//               fontWeight: 700,
//               fontSize: "28px",
//               color: "#ff5a00",
//             }}
//           >
//             $19.02
//           </Typography>
//         </Stack>
//       </Box>

//       {/* PURCHASE PROTECTION */}
//       <Box sx={rightCard}>
//         <Typography
//           sx={{
//             fontWeight: 700,
//             color: "#00a650",
//             mb: 2,
//           }}
//         >
//           Temu's Purchase Protection
//         </Typography>

//         <Stack spacing={1.3}>
//           <Stack direction="row" spacing={1}>
//             <CheckCircleIcon
//               sx={{
//                 color: "#00a650",
//                 fontSize: 18,
//               }}
//             />

//             <Typography sx={{ fontSize: "14px" }}>Safe payments</Typography>
//           </Stack>

//           <Stack direction="row" spacing={1}>
//             <CheckCircleIcon
//               sx={{
//                 color: "#00a650",
//                 fontSize: 18,
//               }}
//             />

//             <Typography sx={{ fontSize: "14px" }}>Secure privacy</Typography>
//           </Stack>

//           <Stack direction="row" spacing={1}>
//             <CheckCircleIcon
//               sx={{
//                 color: "#00a650",
//                 fontSize: 18,
//               }}
//             />

//             <Typography sx={{ fontSize: "14px" }}>
//               Delivery guarantee
//             </Typography>
//           </Stack>
//         </Stack>
//       </Box>

//       {/* RETURN */}
//       <Box sx={rightCard}>
//         <Typography
//           sx={{
//             fontWeight: 700,
//             fontSize: "15px",
//           }}
//         >
//           Free returns within 90 days
//         </Typography>

//         <Typography
//           sx={{
//             mt: 1,
//             fontSize: "13px",
//             color: "#666",
//             lineHeight: 1.6,
//           }}
//         >
//           If unsatisfied with items, you can return or get a refund within 90
//           days.
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

"use client";

import { useRouter } from "next/navigation";

import { Box, Typography, Stack, Divider } from "@mui/material";

import { useSelector } from "react-redux";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { rightCard, productImage } from "./checkoutStyles";

export default function CheckoutRight() {
  const router = useRouter();

  // 🔥 CART
  const { cart } = useSelector((state) => state.cart);

  // 🔥 TOTAL ITEMS
  const totalItems =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  // 🔥 ITEM TOTAL
  const itemTotal =
    cart?.items?.reduce((acc, item) => acc + item.price * item.quantity, 0) ||
    0;

  // 🔥 DISCOUNTED TOTAL
  const discountedTotal =
    cart?.items?.reduce(
      (acc, item) => acc + (item.special_price || item.price) * item.quantity,
      0,
    ) || 0;

  // 🔥 COUPON DISCOUNT
  const couponDiscount = cart?.coupon?.discount_amount || 0;

  // 🔥 SUBTOTAL AFTER COUPON
  const subtotalAfterCoupon = discountedTotal - couponDiscount;

  // 🔥 DUMMY TAX
  const tax = 4.99;

  // 🔥 FINAL TOTAL
  const finalTotal = subtotalAfterCoupon;

  return (
    <Box>
      {/* ORDER SUMMARY */}

      <Box sx={rightCard}>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography
            sx={{
              fontWeight: 700,
            }}
          >
            Order summary ({totalItems})
          </Typography>

          <Typography
            sx={{
              fontSize: "14px",
              color: "#444",
              cursor: "pointer",
            }}
          >
            Edit
          </Typography>
        </Stack>

        {/* PRODUCTS */}

        {cart?.items?.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              gap: 1.5,
              mb: 2,
            }}
          >
            {/* IMAGE */}

            <Box
              component="img"
              src={
                item?.variant?.media?.[0]?.url || item?.product?.media?.[0]?.url
              }
              alt={item?.product?.name}
              sx={{
                ...productImage,
                cursor: "pointer",
              }}
              onClick={() =>
                router.push(`/productdetails?slug=${item?.product?.slug}`)
              }
            />

            {/* PRODUCT INFO */}

            <Box flex={1}>
              <Typography
                sx={{
                  fontSize: "14px",

                  fontWeight: 500,

                  lineHeight: 1.3,

                  cursor: "pointer",

                  "&:hover": {
                    color: "#ff4d00",
                  },
                }}
                onClick={() =>
                  router.push(`/productdetails?slug=${item?.product?.slug}`)
                }
              >
                {item?.product?.name}
              </Typography>

              {/* VARIANT VALUES */}

              <Typography
                sx={{
                  fontSize: "13px",

                  color: "#777",

                  mt: 0.3,
                }}
              >
                {item?.variant?.attributes
                  ?.map((attr) => attr.value)
                  .join(" / ")}
              </Typography>

              <Typography
                sx={{
                  fontWeight: 700,

                  mt: 0.5,
                }}
              >
                ${(item.special_price || item.price).toFixed(2)}
              </Typography>
            </Box>

            {/* QTY */}

            <Typography
              sx={{
                fontSize: "13px",

                color: "#444",
              }}
            >
              Qty: {item.quantity}
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* TOTALS */}

        <Stack spacing={1}>
          {/* ITEM TOTAL */}

          <Stack direction="row" justifyContent="space-between">
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              Item(s) total:
            </Typography>

            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              ${itemTotal.toFixed(2)}
            </Typography>
          </Stack>

          {/* PRODUCT DISCOUNT */}

          <Stack direction="row" justifyContent="space-between">
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              Product discount:
            </Typography>

            <Typography
              sx={{
                fontSize: "14px",

                color: "green",
              }}
            >
              -$
              {(itemTotal - discountedTotal).toFixed(2)}
            </Typography>
          </Stack>

          {/* COUPON */}

          {!!cart?.coupon?.code && (
            <Stack direction="row" justifyContent="space-between">
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Coupon ({cart?.coupon?.code})
              </Typography>

              <Typography
                sx={{
                  fontSize: "14px",

                  color: "#00a650",

                  fontWeight: 700,
                }}
              >
                -$
                {couponDiscount.toFixed(2)}
              </Typography>
            </Stack>
          )}

          {/* SHIPPING */}

          <Stack direction="row" justifyContent="space-between">
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              Shipping:
            </Typography>

            <Typography
              sx={{
                fontSize: "14px",

                color: "#00a650",

                fontWeight: 700,
              }}
            >
              FREE
            </Typography>
          </Stack>

          {/* TAX */}

          <Stack direction="row" justifyContent="space-between">
            <Typography
              sx={{
                display: "flex",

                alignItems: "center",

                gap: 0.5,

                fontSize: "14px",
              }}
            >
              Sales tax
              <InfoOutlinedIcon
                sx={{
                  fontSize: 15,
                }}
              />
            </Typography>

            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              ${tax.toFixed(2)}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* FINAL */}

        <Stack direction="row" justifyContent="space-between">
          <Typography
            sx={{
              fontWeight: 700,

              fontSize: "16px",
            }}
          >
            Order total:
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,

              fontSize: "28px",

              color: "#ff5a00",
            }}
          >
            ${finalTotal.toFixed(2)}
          </Typography>
        </Stack>
      </Box>

      {/* PURCHASE PROTECTION */}

      <Box sx={rightCard}>
        <Typography
          sx={{
            fontWeight: 700,

            color: "#00a650",

            mb: 2,
          }}
        >
          Temu's Purchase Protection
        </Typography>

        <Stack spacing={1.3}>
          <Stack direction="row" spacing={1}>
            <CheckCircleIcon
              sx={{
                color: "#00a650",

                fontSize: 18,
              }}
            />

            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              Safe payments
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <CheckCircleIcon
              sx={{
                color: "#00a650",

                fontSize: 18,
              }}
            />

            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              Secure privacy
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <CheckCircleIcon
              sx={{
                color: "#00a650",

                fontSize: 18,
              }}
            />

            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              Delivery guarantee
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* RETURN */}

      <Box sx={rightCard}>
        <Typography
          sx={{
            fontWeight: 700,

            fontSize: "15px",
          }}
        >
          Free returns within 90 days
        </Typography>

        <Typography
          sx={{
            mt: 1,

            fontSize: "13px",

            color: "#666",

            lineHeight: 1.6,
          }}
        >
          If unsatisfied with items, you can return or get a refund within 90
          days.
        </Typography>
      </Box>
    </Box>
  );
}
