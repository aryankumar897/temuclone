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

import { successStyles } from "./successStyles";

export default function SuccessPage() {
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

        const sessionid = query.get("session_id");

        if (!sessionid) {
          router.push("/stripe/cancel");

          return;
        }

        // 🔥 VERIFY PAYMENT
        const response = await fetch(
          `${process.env.API}/payment/stripepayment/stripeverify`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              sessionid,
            }),
          },
        );

        const data = await response.json();

        if (!data.success) {
          router.push("/stripe/cancel");

          return;
        }

        setOrder(data.order);

        setLoading(false);
      } catch (error) {
        console.log(error);

        router.push("/stripe/cancel");
      }
    };

    verifyPayment();
  }, [router]);

  // 🔥 LOADING
  if (loading) {
    return (
      <Box sx={successStyles.loadingWrapper}>
        <CircularProgress
          sx={{
            color: "#ff4d00",
          }}
        />
      </Box>
    );
  }

  return (
    <Box sx={successStyles.root}>
      <Container maxWidth="md">
        <Paper sx={successStyles.paper} elevation={0}>
          {/* ICON */}

          <Box sx={successStyles.iconWrapper}>
            <CheckCircleIcon sx={successStyles.successIcon} />
          </Box>

          {/* TITLE */}

          <Typography sx={successStyles.title}>
            Order placed successfully!
          </Typography>

          <Typography sx={successStyles.subtitle}>
            Thank you for shopping with us
          </Typography>

          {/* ORDER NUMBER */}

          <Box sx={successStyles.orderBox}>
            <Typography sx={successStyles.orderLabel}>Order Number</Typography>

            <Typography sx={successStyles.orderValue}>
              {order?.order_number}
            </Typography>
          </Box>

          {/* SHIPPING */}

          <Box sx={successStyles.shippingBox}>
            <LocalShippingIcon
              sx={{
                color: "#00a650",
              }}
            />

            <Box>
              <Typography sx={successStyles.shippingTitle}>
                Estimated delivery
              </Typography>

              <Typography sx={successStyles.shippingText}>
                5-10 business days
              </Typography>
            </Box>
          </Box>

          {/* SUMMARY */}

          <Box sx={successStyles.summaryBox}>
            <Typography sx={successStyles.summaryTitle}>
              Order Summary
            </Typography>

            <Box sx={successStyles.summaryRow}>
              <Typography>Items</Typography>

              <Typography>{order?.items?.length}</Typography>
            </Box>

            <Box sx={successStyles.summaryRow}>
              <Typography>Payment</Typography>

              <Typography
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {order?.payment_method}
              </Typography>
            </Box>

            <Box sx={successStyles.summaryRow}>
              <Typography>Total</Typography>

              <Typography sx={successStyles.total}>
                ₹{order?.total_amount}
              </Typography>
            </Box>
          </Box>

          {/* BUTTONS */}

          <Box sx={successStyles.buttonGroup}>
            <Button
              startIcon={<ShoppingBagIcon />}
              sx={successStyles.primaryBtn}
              onClick={() => router.push("/orders")}
            >
              View Orders
            </Button>

            <Button
              startIcon={<HomeIcon />}
              sx={successStyles.secondaryBtn}
              onClick={() => router.push("/")}
            >
              Continue Shopping
            </Button>
          </Box>

          {/* FOOTER */}

          <Box sx={successStyles.footerBox}>
            <ReceiptLongIcon
              sx={{
                fontSize: 18,
                color: "#777",
              }}
            />

            <Typography sx={successStyles.footerText}>
              Invoice and order details are available in your orders section
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
