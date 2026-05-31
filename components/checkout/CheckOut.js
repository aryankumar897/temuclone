// // components/checkout/CheckoutPage.jsx

// "use client";

// import { Box, Grid } from "@mui/material";

// import CheckoutLeft from "./CheckoutLeft";
// import CheckoutRight from "./CheckoutRight";

// import { pageWrapper, containerStyles } from "./checkoutStyles";

// export default function CheckoutPage() {
//   return (
//     <Box sx={pageWrapper}>
//       <Box sx={containerStyles}>
//         <Grid container spacing={2}>
//           {/* LEFT SIDE */}
//           <Grid size={{ xs: 12, lg: 8 }}>
//             <CheckoutLeft />
//           </Grid>

//           {/* RIGHT SIDE */}
//           <Grid size={{ xs: 12, lg: 4 }}>
//             <CheckoutRight />
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// }



"use client";

import { useEffect } from "react";

import { Box, Grid } from "@mui/material";

import { useDispatch } from "react-redux";

import { useSession } from "next-auth/react";

import { fetchCheckoutAddresses } from "@/slice/checkoutAddressSlice";

import { fetchCart } from "@/slice/cartSlice";

import CheckoutLeft from "./CheckoutLeft";

import CheckoutRight from "./CheckoutRight";

import {
  pageWrapper,
  containerStyles,
} from "./checkoutStyles";

export default function CheckoutPage() {
  const dispatch = useDispatch();

  const { data: session } =
    useSession();

  // 🔥 FETCH DATA
  useEffect(() => {
    if (session?.user?._id) {
      // 🔥 FETCH ADDRESSES
      dispatch(
        fetchCheckoutAddresses(
          session.user._id
        )
      );

      // 🔥 FETCH CART
      dispatch(
        fetchCart(
          session.user._id
        )
      );
    }
  }, [dispatch, session]);

  return (
    <Box sx={pageWrapper}>
      <Box sx={containerStyles}>
        <Grid container spacing={2}>
          {/* LEFT SIDE */}

          <Grid size={{ xs: 12, lg: 8 }}>
            <CheckoutLeft />
          </Grid>

          {/* RIGHT SIDE */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <CheckoutRight />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}