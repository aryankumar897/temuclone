"use client";

import { useState } from "react";

import { Box, Typography, Stack, MenuItem, Select } from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useSelector, useDispatch } from "react-redux";

import { setCheckoutAddress } from "@/slice/checkoutAddressSlice";

import PaymentMethods from "./PaymentMethods";

import { leftCard, sectionBox } from "./checkoutStyles";
import { useSession } from "next-auth/react";
const paymentMethods = [
  {
    name: "Card",

    icon: "/images/pay7.avif",
  },

  {
    name: "PayPal",

    icon: "/images/pay1.avif",
  },

  {
    name: "Razorpay",

    icon: "/images/pay2.avif",
  },

  {
    name: "Afterpay",

    icon: "/images/pay3.avif",
  },

  {
    name: "Klarna",

    icon: "/images/pay4.avif",
  },

  {
    name: "Google Pay",

    icon: "/images/pay5.avif",
  },

  {
    name: "Apple Pay",

    icon: "/images/pay6.avif",
  },
];

export default function CheckoutLeft() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  // 🔥 PAYMENT
  const [selectedPayment, setSelectedPayment] = useState("Card");

  // 🔥 ADDRESS
  const { checkoutAddresses, selectedCheckoutAddress } = useSelector(
    (state) => state.checkoutAddress,
  );

  return (
    <Box sx={leftCard}>
      {/* HEADER */}

      <Typography
        sx={{
          fontSize: {
            xs: "28px",
            md: "34px",
          },

          fontWeight: 700,

          color: "#e1440b",
        }}
      >
        Checkout
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center" mt={1}>
        <LockIcon
          sx={{
            color: "#00a650",

            fontSize: 18,
          }}
        />

        <Typography
          sx={{
            fontSize: "14px",

            fontWeight: 700,

            color: "#00a650",
          }}
        >
          All data is encrypted
        </Typography>
      </Stack>

      <Typography
        sx={{
          fontSize: "13px",

          color: "#757575",

          mt: 0.4,
        }}
      >
        Temu protects your card information
      </Typography>

      {/* SHIPPING ADDRESS */}

      <Box sx={sectionBox}>
        <Typography
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          1 Shipping address
        </Typography>

        {/* ADDRESS SELECT */}

        <Select
          fullWidth
          size="small"
          value={selectedCheckoutAddress?._id || ""}
          // onChange={(e) => {
          //   const address = checkoutAddresses?.find(
          //     (item) => item._id === e.target.value,
          //   );

          //   dispatch(setCheckoutAddress(address));
          // }}

          onChange={async (e) => {
            const address = checkoutAddresses?.find(
              (item) => item._id === e.target.value,
            );

            // 🔥 REDUX
            dispatch(setCheckoutAddress(address));

            // 🔥 SAVE TO CART
            await fetch(`${process.env.API}/cart/address`, {
              method: "PUT",

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                userId: session?.user?._id,

                addressId: address?._id,
              }),
            });
          }}
          sx={{
            mb: 2,
            background: "#fff",
          }}
        >
          {checkoutAddresses?.map((address) => (
            <MenuItem key={address._id} value={address._id}>
              {address.full_name}
              {" - "}
              {address.address_line_1}
            </MenuItem>
          ))}
        </Select>

        {/* ADDRESS CARD */}

        <Box
          sx={{
            border: "1px solid #e8e8e8",

            borderRadius: "12px",

            p: 2,

            background: "#fff",
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                {selectedCheckoutAddress?.full_name}
                &nbsp;
                {selectedCheckoutAddress?.phone}
              </Typography>

              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                {selectedCheckoutAddress?.address_line_1}
              </Typography>

              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                {selectedCheckoutAddress?.address_line_2}
              </Typography>

              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                {selectedCheckoutAddress?.city},{" "}
                {selectedCheckoutAddress?.state}{" "}
                {selectedCheckoutAddress?.pincode},{" "}
                {selectedCheckoutAddress?.country}
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                color: "#111",
              }}
            >
              Edit
            </Typography>
          </Stack>
        </Box>
      </Box>

      {/* SHIPPING METHOD */}

      <Box sx={sectionBox}>
        <Typography
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          2 Shipping methods
        </Typography>

        <Box
          sx={{
            border: "1px solid #e8e8e8",

            borderRadius: "12px",

            p: 2,

            display: "flex",

            justifyContent: "space-between",

            alignItems: "center",

            background: "#fff",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#00a650",

                fontWeight: 700,

                fontSize: "15px",
              }}
            >
              FREE shipping
            </Typography>

            <Typography
              sx={{
                fontSize: "13px",

                color: "#666",
              }}
            >
              Standard shipping: FREE, delivery: 5-10 business days
            </Typography>

            <Typography
              sx={{
                fontSize: "13px",

                color: "#666",
              }}
            >
              Express shipping: $12.90, delivery: 3-5 business days
            </Typography>
          </Box>

          <ChevronRightIcon
            sx={{
              color: "#777",
            }}
          />
        </Box>
      </Box>

      {/* PAYMENT */}

      <PaymentMethods
        paymentMethods={paymentMethods}
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
      />
    </Box>
  );
}
