"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import { Box, Typography, Stack, Radio, Divider, Button } from "@mui/material";

import { useSelector } from "react-redux";

import toast from "react-hot-toast";

import { sectionBox, paymentRow, orangeButton } from "./checkoutStyles";

export default function PaymentMethods({
  paymentMethods,

  selectedPayment,

  setSelectedPayment,
}) {
  const router = useRouter();

  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  // 🔥 CART
  const { cart } = useSelector((state) => state.cart);

  // 🔥 ADDRESS
  const { selectedCheckoutAddress } = useSelector(
    (state) => state.checkoutAddress,
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    const loadHandler = () => {
      console.log("Razorpay script loaded");
    };

    script.addEventListener("load", loadHandler);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", loadHandler);
      document.body.removeChild(script);
    };
  }, []);


    // 🔥 VERIFY PAYMENT
  const verifyRazorpayPayment = async (paymentId) => {
    try {
      const response = await fetch(
        `${process.env.API}/payment/razorpaypayment/razorpayverify`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            razorpay_payment_id: paymentId,
          }),
        },
      );

      const data = await response.json();

      // ❌ FAILED
      if (!data.success) {
        toast.error(data.error || "Verification failed");

        router.push("/stripe/cancel");

        return;
      }

      // ✅ SUCCESS
      toast.success("Payment successful");

      // 🔥 SUCCESS PAGE
      router.push(`/`);
    } catch (error) {
      console.log(error);

      toast.error("Verification failed");
    }
  };

  // 🔥 RAZORPAY
  const handleRazorpay = async () => {
    try {
      setLoading(true);

      // 🔥 CREATE ORDER
      const response = await fetch(
        `${process.env.API}/payment/razorpaypayment/razorpay`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(checkoutData),
        },
      );

      const serverdata = await response.json();

      // ❌ FAILED
      if (!response.ok) {
        throw new Error(serverdata.error || "Payment failed");
      }

      // 🔥 OPTIONS
      const options = {
        key: process.env.RAZORPAY_KEY_ID,

        amount: serverdata.amount,

        currency: serverdata.currency,

        name: "Temu Clone",

        description: "Order Payment",

        order_id: serverdata.id,

        // 🔥 SUCCESS
        handler: async function (response) {
          await verifyRazorpayPayment(response.razorpay_payment_id);

          setLoading(false);
        },

        // 🔥 PREFILL
        prefill: {
          name: session?.user?.name || "",

          email: session?.user?.email || "",
        },

        // 🔥 THEME
        theme: {
          color: "#ff4d00",
        },

        // 🔥 CANCEL
        modal: {
          ondismiss: function () {
            setLoading(false);

            toast.error("Payment cancelled");
          },
        },
      };

      // 🔥 OPEN RAZORPAY
      const rzp1 = new window.Razorpay(options);

      rzp1.open();
    } catch (error) {
      console.log(error);

      toast.error(error.message);

      setLoading(false);
    }
  };
  // 🔥 TOTAL
  const totalAmount =
    cart?.items?.reduce((acc, item) => {
      const price =
        item?.special_price > 0 ? item.special_price : item?.price || 0;

      return acc + price * item.quantity;
    }, 0) || 0;

  // 🔥 CHECKOUT DATA
  const checkoutData = {
    items:
      cart?.items?.map((item) => ({
        productId: item?.product?._id,

        variantId: item?.variant?._id,

        quantity: item.quantity,

        price: item?.special_price > 0 ? item.special_price : item.price,
      })) || [],

    totalAmount,

    userId: session?.user?._id,

    addressId: selectedCheckoutAddress?._id,

    coupon: cart?.coupon || null,
  };

  // 🔥 STRIPE
  const handleStripe = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.API}/payment/stripepayment/stripe`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(checkoutData),
        },
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error(error.message);

      setLoading(false);
    }
  };

  // 🔥 PAYPAL
  const handlePaypal = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.API}/payment/paypalpayment/paypal`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(checkoutData),
        },
      );

      const data = await response.json();

      if (data?.url) {
        router.push(data.url);
      }
    } catch (error) {
      toast.error(error.message);

      setLoading(false);
    }
  };


  // 🔥 PLACE ORDER
  const handlePlaceOrder = async () => {
    if (!selectedCheckoutAddress?._id) {
      toast.error("Please select address");

      return;
    }

    if (!cart?.items?.length) {
      toast.error("Your cart is empty");

      return;
    }

    if (selectedPayment === "PayPal") {
      handlePaypal();

      return;
    }

    if (selectedPayment === "Card") {
      handleStripe();

      return;
    }

    if (
      selectedPayment === "Razorpay" ||
      selectedPayment === "Google Pay" ||
      selectedPayment === "Apple Pay" ||
      selectedPayment === "Afterpay" ||
      selectedPayment === "Klarna"
    ) {
      handleRazorpay();

      return;
    }
  };

  return (
    <Box sx={sectionBox}>
      {/* TITLE */}

      <Typography
        sx={{
          fontWeight: 700,
          mb: 2,
        }}
      >
        3 Payment methods
      </Typography>

      {/* PAYMENT LIST */}

      <Box
        sx={{
          border: "1px solid #e8e8e8",

          borderRadius: "12px",

          overflow: "hidden",

          background: "#fff",
        }}
      >
        {paymentMethods.map((item, index) => (
          <Box key={index}>
            <Box
              sx={{
                ...paymentRow,

                cursor: "pointer",
              }}
              onClick={() => setSelectedPayment(item.name)}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Radio size="small" checked={selectedPayment === item.name} />

                {/* ICON */}

                <Box
                  component="img"
                  src={item.icon}
                  alt={item.name}
                  sx={{
                    width: 32,
                    height: 22,
                    objectFit: "contain",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "15px",

                    fontWeight: 500,
                  }}
                >
                  {item.name}
                </Typography>
              </Stack>

              {(item.name === "Afterpay" || item.name === "Klarna") && (
                <Typography
                  sx={{
                    fontSize: "13px",

                    color: "#777",
                  }}
                >
                  4 interest-free payments
                </Typography>
              )}
            </Box>

            {index !== paymentMethods.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>

      {/* BUTTON */}

      <Button
        fullWidth
        sx={orangeButton}
        onClick={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? "Processing..." : "Place your order"}
      </Button>

      {/* TEXT */}

      <Typography
        sx={{
          mt: 2,

          textAlign: "center",

          fontSize: "12px",

          color: "#757575",
        }}
      >
        By clicking "Place your order", you agree to our Terms of Use and
        Privacy Policy.
      </Typography>
    </Box>
  );
}
