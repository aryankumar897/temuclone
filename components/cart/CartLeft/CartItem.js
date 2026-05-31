// import { Box, Typography, Checkbox, Select, MenuItem } from "@mui/material";

// import styles from "./cartLeftStyles";

// export default function CartItem({
//   image,
//   title,
//   price,
//   oldPrice,
//   discount,
//   qty,
// }) {
//   return (
//     <Box sx={styles.itemRow}>
//       <Checkbox defaultChecked />

//       <Box component="img" src={image} sx={styles.productImage} />

//       <Box sx={styles.productInfo}>
//         <Typography sx={styles.springSale}>Spring Sale</Typography>

//         <Typography sx={styles.title}>{title}</Typography>

//         <Typography sx={styles.bigSale}>Big sale</Typography>

//         <Box sx={styles.priceRow}>
//           <Typography sx={styles.oldPrice}>${oldPrice}</Typography>

//           <Typography sx={styles.price}>${price}</Typography>

//           <Typography sx={styles.discount}>{discount}</Typography>
//         </Box>
//       </Box>

//       <Select defaultValue={qty} size="small" sx={styles.qty}>
//         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map((q) => (
//           <MenuItem key={q} value={q}>
//             Qty {q}
//           </MenuItem>
//         ))}
//       </Select>
//     </Box>
//   );
// }


"use client";

import {
  Box,
  Typography,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";

import { useDispatch } from "react-redux";

import {
  updateCartQuantity,
  removeCartItem,
} from "@/slice/cartSlice";

import styles from "./cartLeftStyles";

export default function CartItem({
  image,
  title,
  price,
  oldPrice,
  discount,
  qty,
  item,
  userId
}) {
  const dispatch = useDispatch();

  return (
    <Box sx={styles.itemRow}>
      <Checkbox defaultChecked />

      <Box
        component="img"
        src={image}
        sx={styles.productImage}
      />

      <Box sx={styles.productInfo}>
        <Typography sx={styles.springSale}>
          Spring Sale
        </Typography>

        <Typography sx={styles.title}>
          {title}
        </Typography>

        <Typography sx={styles.bigSale}>
          Big sale
        </Typography>

        <Box sx={styles.priceRow}>
          <Typography sx={styles.oldPrice}>
            ${oldPrice}
          </Typography>

          <Typography sx={styles.price}>
            ${price}
          </Typography>

          <Typography sx={styles.discount}>
            {discount}
          </Typography>
        </Box>

        {/* REMOVE */}

        <Typography
          sx={{
            mt: 1,
            cursor: "pointer",
            color: "red",
            fontSize: "14px",
          }}
          onClick={() =>
            dispatch(
              removeCartItem({
                userId: userId,

                variantId:
                  item.variant._id,
              })
            )
          }
        >
          Remove
        </Typography>
      </Box>

      {/* QTY */}

      <Select
        value={qty}
        size="small"
        sx={styles.qty}
        onChange={(e) =>
          dispatch(
            updateCartQuantity({
              userId: userId,

              variantId:
                item.variant._id,

              quantity: Number(
                e.target.value
              ),
            })
          )
        }
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map(
          (q) => (
            <MenuItem key={q} value={q}>
              Qty {q}
            </MenuItem>
          )
        )}
      </Select>
    </Box>
  );
}
