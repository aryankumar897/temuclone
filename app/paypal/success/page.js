"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import HomeIcon from "@mui/icons-material/Home";

import { paypalSuccessStyles } from "./paypalSuccessStyles";

export default function PaypalSuccessPage() {
  const router = useRouter();

  const hasRunRef = useRef(false);

  const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (hasRunRef.current) return;

    hasRunRef.current = true;

    const verifyPayment = async () => {
      try {
        const query = new URLSearchParams(window.location.search);

        const token = query.get("token");

        if (!token) {
          router.push("/paypal/cancel");

          return;
        }

        // 🔥 VERIFY
        const response = await fetch(
          `${process.env.API}/payment/paypalpayment/paypalverify`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              token,
            }),
          },
        );

        const data = await response.json();

        // ❌ FAILED
        if (!data.success) {
          router.push("/paypal/cancel");

          return;
        }

        // ✅ SUCCESS
        setOrder(data.order);

        setLoading(false);
      } catch (error) {
        console.log(error);

        router.push("/paypal/cancel");
      }
    };

    verifyPayment();
  }, [router]);

  // 🔥 LOADING
  if (loading) {
    return (
      <Box sx={paypalSuccessStyles.loadingWrapper}>
        <CircularProgress
          sx={{
            color: "#ff4d00",
          }}
        />
      </Box>
    );
  }

  return (
    <Box sx={paypalSuccessStyles.root}>
      <Container maxWidth="md">
        <Paper sx={paypalSuccessStyles.paper} elevation={0}>
          {/* ICON */}

          <Box sx={paypalSuccessStyles.iconWrapper}>
            <CheckCircleIcon sx={paypalSuccessStyles.successIcon} />
          </Box>

          {/* TITLE */}

          <Typography sx={paypalSuccessStyles.title}>
            Payment Successful!
          </Typography>

          <Typography sx={paypalSuccessStyles.subtitle}>
            Your order has been placed successfully
          </Typography>

          {/* ORDER */}

          <Box sx={paypalSuccessStyles.orderBox}>
            <Typography sx={paypalSuccessStyles.orderLabel}>
              Order Number
            </Typography>

            <Typography sx={paypalSuccessStyles.orderValue}>
              {order?.order_number}
            </Typography>
          </Box>

          {/* SHIPPING */}

          <Box sx={paypalSuccessStyles.shippingBox}>
            <LocalShippingIcon
              sx={{
                color: "#00a650",
              }}
            />

            <Box>
              <Typography sx={paypalSuccessStyles.shippingTitle}>
                Estimated delivery
              </Typography>

              <Typography sx={paypalSuccessStyles.shippingText}>
                5-10 business days
              </Typography>
            </Box>
          </Box>

          {/* SUMMARY */}

          <Box sx={paypalSuccessStyles.summaryBox}>
            <Typography sx={paypalSuccessStyles.summaryTitle}>
              Order Summary
            </Typography>

            <Box sx={paypalSuccessStyles.summaryRow}>
              <Typography>Items</Typography>

              <Typography>{order?.items?.length}</Typography>
            </Box>

            <Box sx={paypalSuccessStyles.summaryRow}>
              <Typography>Payment Method</Typography>

              <Typography>PayPal</Typography>
            </Box>

            <Box sx={paypalSuccessStyles.summaryRow}>
              <Typography>Total</Typography>

              <Typography sx={paypalSuccessStyles.total}>
                ₹{order?.total_amount}
              </Typography>
            </Box>
          </Box>

          {/* BUTTONS */}

          <Box sx={paypalSuccessStyles.buttonGroup}>
            <Button
              startIcon={<ShoppingBagIcon />}
              sx={paypalSuccessStyles.primaryBtn}
              onClick={() => router.push("/orders")}
            >
              View Orders
            </Button>

            <Button
              startIcon={<HomeIcon />}
              sx={paypalSuccessStyles.secondaryBtn}
              onClick={() => router.push("/")}
            >
              Continue Shopping
            </Button>
          </Box>

          {/* FOOTER */}

          <Box sx={paypalSuccessStyles.footerBox}>
            <ReceiptLongIcon
              sx={{
                fontSize: 18,

                color: "#777",
              }}
            />

            <Typography sx={paypalSuccessStyles.footerText}>
              Invoice and order details are available in your orders section
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
