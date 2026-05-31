// "use client";

// import { Box } from "@mui/material";
// import CartBanner from "./CartBanner";
// import CartSelectRow from "./CartSelectRow";
// import WarehouseRow from "./WarehouseRow";
// import CartItem from "./CartItem";

// import styles from "./cartLeftStyles";

// export default function CartLeft() {
//   return (
//     <Box sx={styles.wrapper}>
//       <Box sx={styles.breadcrumb}>Home › Cart</Box>

//       <CartBanner icon="✓" text="Free shipping from some sellers" />

//       <CartBanner
//         icon="FREE"
//         text="No import charges for all local warehouse items and no extra charges upon delivery"
//       />

//       <CartSelectRow />

//       <WarehouseRow />

//       <CartItem
//         image="/images/img1.avif"
//         title="Car Lumbar Support Pillow and Car Neck Pillow Kit, Ergonomic Car Seat Headrest"
//         price="7.36"
//         oldPrice="75.96"
//         discount="-90%"
//         qty={3}
//       />

//       <WarehouseRow free />

//       <CartItem
//         image="/images/img1.avif"
//         title="Shoulder And Neck Massage Expert, Lower Abdomen Massager"
//         price="22.49"
//         oldPrice="72.26"
//         discount="-68%"
//         qty={12}
//       />

   
//     </Box>
//   );
// }



"use client";

import { Box, Typography } from "@mui/material";

import { useSelector } from "react-redux";

import CartBanner from "./CartBanner";

import CartSelectRow from "./CartSelectRow";

import WarehouseRow from "./WarehouseRow";

import CartItem from "./CartItem";

import styles from "./cartLeftStyles";
import { useSession } from "next-auth/react";
export default function CartLeft() {
const { data: session } = useSession();

  const { cart } = useSelector(
    (state) => state.cart
  );

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.breadcrumb}>
        Home › Cart
      </Box>

      <CartBanner
        icon="✓"
        text="Free shipping from some sellers"
      />

      <CartBanner
        icon="FREE"
        text="No import charges for all local warehouse items and no extra charges upon delivery"
      />

      <CartSelectRow />

      {/* 🔥 EMPTY */}

      {!cart?.items?.length && (
        <Typography
          sx={{
            mt: 5,
            textAlign: "center",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          Your cart is empty
        </Typography>
      )}

      {/* 🔥 ITEMS */}

      {cart?.items?.map((item, index) => (
        <Box key={index}>
          <WarehouseRow />

          <CartItem
            item={item}
              userId={session?.user?._id}
            image={
              item.variant?.media?.[0]
                ?.url
            }
            title={item.product?.name}
            price={
              item.special_price ||
              item.price
            }
            oldPrice={item.price}
            discount="SALE"
            qty={item.quantity}
          />
        </Box>
      ))}
    </Box>
  );
}