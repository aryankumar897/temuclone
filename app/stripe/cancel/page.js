"use client";

import { useRouter } from "next/navigation";

import { Box, Typography, Button, Container, Paper } from "@mui/material";

import CancelIcon from "@mui/icons-material/Cancel";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import RefreshIcon from "@mui/icons-material/Refresh";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { cancelStyles } from "./cancelStyles";

export default function CancelPage() {
  const router = useRouter();

  return (
    <Box sx={cancelStyles.root}>
      <Container maxWidth="md">
        <Paper sx={cancelStyles.paper} elevation={0}>
          {/* ICON */}

          <Box sx={cancelStyles.iconWrapper}>
            <CancelIcon sx={cancelStyles.cancelIcon} />
          </Box>

          {/* TITLE */}

          <Typography sx={cancelStyles.title}>Payment Cancelled</Typography>

          <Typography sx={cancelStyles.subtitle}>
            Your order was not completed
          </Typography>

          {/* MESSAGE */}

          <Box sx={cancelStyles.messageBox}>
            <ErrorOutlineIcon
              sx={{
                color: "#ff4d00",

                fontSize: 24,
              }}
            />

            <Typography sx={cancelStyles.message}>
              Don't worry — no money was deducted from your account. You can try
              again anytime.
            </Typography>
          </Box>

          {/* REASONS */}

          <Box sx={cancelStyles.reasonBox}>
            <Typography sx={cancelStyles.reasonTitle}>
              Possible reasons:
            </Typography>

            <Typography sx={cancelStyles.reasonText}>
              • Payment window was closed
            </Typography>

            <Typography sx={cancelStyles.reasonText}>
              • Payment was declined
            </Typography>

            <Typography sx={cancelStyles.reasonText}>
              • Network or bank issue
            </Typography>

            <Typography sx={cancelStyles.reasonText}>
              • You cancelled the payment
            </Typography>
          </Box>

          {/* BUTTONS */}

          <Box sx={cancelStyles.buttonGroup}>
            <Button
              startIcon={<RefreshIcon />}
              sx={cancelStyles.primaryBtn}
              onClick={() => router.back()}
            >
              Try Again
            </Button>

            <Button
              startIcon={<ShoppingCartIcon />}
              sx={cancelStyles.secondaryBtn}
              onClick={() => router.push("/cart")}
            >
              Back to Cart
            </Button>
          </Box>

          {/* SUPPORT */}

          <Box sx={cancelStyles.supportBox}>
            <SupportAgentIcon
              sx={{
                fontSize: 20,

                color: "#777",
              }}
            />

            <Typography sx={cancelStyles.supportText}>
              Need help? Contact our support team anytime.
            </Typography>
          </Box>

          {/* SUPPORT BUTTON */}

          <Button
            sx={cancelStyles.supportBtn}
            onClick={() => router.push("/support")}
          >
            Contact Support
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
