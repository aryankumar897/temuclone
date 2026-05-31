// "use client";

// import { Box } from "@mui/material";
// import CartLeft from "@/components/cart/CartLeft/CartLeft";
// import CartRight from "@/components/cart/CartRight/CartRight";

// export default function CartPage() {
//   return (
//     <Box
//       sx={{
//         maxWidth: "1400px",
//         margin: "40px auto",
//         padding: "20px",

//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "flex-start",

//         gap: "40px",
//         /* MOBILE FIX */
//         "@media (max-width:1100px)": {
//           flexDirection: "column",
//         },
//       }}
//     >
//       <CartLeft />

//       <CartRight />
//     </Box>
//   );
// }

"use client";

import { useEffect } from "react";

import { Box } from "@mui/material";

import { useDispatch } from "react-redux";

import { useSession } from "next-auth/react";

import { fetchCart } from "@/slice/cartSlice";

import CartLeft from "@/components/cart/CartLeft/CartLeft";

import CartRight from "@/components/cart/CartRight/CartRight";

import ExploreDeals from "@/components/layout/ExploreDeals/ExploreProducts";

import TopBar from "@/components/topbar/TopBar";

import Header from "@/components/layout/Header/Header";

export default function CartPage() {
  const dispatch = useDispatch();

  const { data: session } = useSession();

  // 🔥 FETCH CART
  useEffect(() => {
    if (session?.user?._id) {
      dispatch(fetchCart(session?.user?._id));
    }
  }, [dispatch, session]);

  return (
    <>
      <TopBar />

      <Header />

      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        
        }}
      >
        {/* Main container */}

        <Box
          sx={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "20px",
            position: "relative",
          }}
        >
          {/* LEFT */}

          <Box
            sx={{
              width: "calc(100% - 500px)",

              marginRight: "auto",

              "@media (max-width:1100px)": {
                width: "100%",
                marginRight: 0,
              },
            }}
          >
            <CartLeft />

            <ExploreDeals itemsPerRow={4} />
          </Box>

          {/* RIGHT */}

          <Box
            sx={{
              width: "460px",

              position: "fixed",

              top: "180px",

              right: "calc(50% - 700px + 20px)",

              maxHeight: "calc(100vh - 120px)",

              overflowY: "auto",

              borderRadius: "8px",

              scrollbarWidth: "none",

              msOverflowStyle: "none",

              "&::-webkit-scrollbar": {
                width: 0,
                height: 0,
                display: "none",
              },

              "&::after": {
                content: '""',

                position: "absolute",

                bottom: 0,

                left: 0,

                right: 0,

                height: "40px",

                pointerEvents: "none",

                opacity: 0,

                transition: "opacity 0.3s",

                borderRadius: "0 0 8px 8px",
              },

              "&:hover::after": {
                opacity: 1,
              },

              "@media (max-width:1400px)": {
                right: "20px",
              },

              "@media (max-width:1100px)": {
                position: "static",

                width: "100%",

                maxHeight: "none",

                overflowY: "visible",

                marginTop: "30px",

                boxShadow: "none",

                backgroundColor: "transparent",

                "&::after": {
                  display: "none",
                },
              },
            }}
          >
            <CartRight />
          </Box>
        </Box>
      </Box>
    </>
  );
}
