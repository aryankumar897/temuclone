"use client";

import { useRouter } from "next/navigation";

import { Box, Typography, Button, Container, Paper } from "@mui/material";

import CancelIcon from "@mui/icons-material/Cancel";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import RefreshIcon from "@mui/icons-material/Refresh";

import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import { paypalCancelStyles } from "./paypalCancelStyles";

export default function PaypalCancelPage() {
  const router = useRouter();

  return (
    <Box sx={paypalCancelStyles.root}>
      <Container maxWidth="md">
        <Paper sx={paypalCancelStyles.paper} elevation={0}>
          {/* ICON */}

          <Box sx={paypalCancelStyles.iconWrapper}>
            <CancelIcon sx={paypalCancelStyles.cancelIcon} />
          </Box>

          {/* TITLE */}

          <Typography sx={paypalCancelStyles.title}>
            Payment Cancelled
          </Typography>

          <Typography sx={paypalCancelStyles.subtitle}>
            Your PayPal payment was cancelled
          </Typography>

          {/* MESSAGE */}

          <Box sx={paypalCancelStyles.messageBox}>
            <Typography sx={paypalCancelStyles.message}>
              No worries — your payment was not completed and no money was
              charged.
            </Typography>
          </Box>

          {/* BUTTONS */}

          <Box sx={paypalCancelStyles.buttonGroup}>
            <Button
              startIcon={<RefreshIcon />}
              sx={paypalCancelStyles.primaryBtn}
              onClick={() => router.back()}
            >
              Try Again
            </Button>

            <Button
              startIcon={<ShoppingCartIcon />}
              sx={paypalCancelStyles.secondaryBtn}
              onClick={() => router.push("/cart")}
            >
              Back to Cart
            </Button>
          </Box>

          {/* SUPPORT */}

          <Box sx={paypalCancelStyles.supportBox}>
            <SupportAgentIcon
              sx={{
                color: "#777",
              }}
            />

            <Typography sx={paypalCancelStyles.supportText}>
              Need help? Contact our support team.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
