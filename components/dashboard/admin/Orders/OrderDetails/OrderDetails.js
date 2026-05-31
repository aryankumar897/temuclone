"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import {
  Box,
  Typography,
  CircularProgress,
  Button,
  MenuItem,
  Select,
} from "@mui/material";

import toast from "react-hot-toast";

import { orderDetailsStyles } from "./orderDetailsStyles";

export default function OrderDetailsPage() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");

  const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState(null);

  const [transaction, setTransaction] = useState(null);

  const [orderStatus, setOrderStatus] = useState("");

  // 🔥 FETCH
  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.API}/admin/orders/${orderId}`,
        );

        const data = await response.json();

        if (data.success) {
          setOrder(data.order);

          setTransaction(data.transaction);

          setOrderStatus(data.order?.order_status);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // 🔥 UPDATE STATUS
  const updateStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/orders/${orderId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            order_status: orderStatus,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Order updated");
      }
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  // 🔥 LOADING
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",

          justifyContent: "center",

          mt: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={orderDetailsStyles.wrapper}>
      {/* HEADER */}

      <Typography sx={orderDetailsStyles.heading}>Order Details</Typography>

      {/* ORDER INFO */}

      <Box sx={orderDetailsStyles.card}>
        <Typography sx={orderDetailsStyles.orderNumber}>
          {order?.order_number}
        </Typography>

        <Typography sx={orderDetailsStyles.grayText}>
          Customer: {order?.user?.name}
        </Typography>

        <Typography sx={orderDetailsStyles.grayText}>
          Email: {order?.user?.email}
        </Typography>

        <Typography sx={orderDetailsStyles.grayText}>
          Date: {new Date(order?.createdAt).toLocaleString()}
        </Typography>

        <Typography sx={orderDetailsStyles.totalPrice}>
          ${order?.total_amount}
        </Typography>

        <Box sx={orderDetailsStyles.statusBadge}>{order?.order_status}</Box>
      </Box>

      {/* SHIPPING ADDRESS */}

      <Box sx={orderDetailsStyles.card}>
        <Typography sx={orderDetailsStyles.sectionTitle}>
          Shipping Address
        </Typography>

        <Typography>{order?.address?.full_name}</Typography>

        <Typography>{order?.address?.phone}</Typography>

        <Typography>{order?.address?.address_line_1}</Typography>

        <Typography>
          {order?.address?.city}, {order?.address?.state}
        </Typography>

        <Typography>{order?.address?.pincode}</Typography>
      </Box>

      {/* ITEMS */}

      <Box sx={orderDetailsStyles.card}>
        <Typography sx={orderDetailsStyles.sectionTitle}>
          Order Items
        </Typography>

        {order?.items?.map((item) => {
          const image =
            item?.variant?.media?.[0]?.url || item?.product?.media?.[0]?.url;

          return (
            <Box key={item._id} sx={orderDetailsStyles.itemRow}>
              <Box
                component="img"
                src={image}
                sx={orderDetailsStyles.productImage}
              />

              <Box>
                <Typography sx={orderDetailsStyles.productName}>
                  {item?.product?.name}
                </Typography>

                <Typography>Qty: {item.quantity}</Typography>

                <Typography>Variant: {item?.variant?.sku}</Typography>

                <Typography sx={orderDetailsStyles.priceText}>
                  ${item.total}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* PAYMENT */}

      <Box sx={orderDetailsStyles.card}>
        <Typography sx={orderDetailsStyles.sectionTitle}>
          Payment Transaction
        </Typography>

        <Box sx={orderDetailsStyles.infoGrid}>
          <Box sx={orderDetailsStyles.infoBox}>
            <Typography sx={orderDetailsStyles.infoLabel}>
              Payment Gateway
            </Typography>

            <Typography sx={orderDetailsStyles.infoValue}>
              {transaction?.payment_gateway}
            </Typography>
          </Box>

          <Box sx={orderDetailsStyles.infoBox}>
            <Typography sx={orderDetailsStyles.infoLabel}>
              Payment Status
            </Typography>

            <Typography sx={orderDetailsStyles.infoValue}>
              {transaction?.status}
            </Typography>
          </Box>

          <Box sx={orderDetailsStyles.infoBox}>
            <Typography sx={orderDetailsStyles.infoLabel}>Amount</Typography>

            <Typography sx={orderDetailsStyles.infoValue}>
              ${transaction?.amount}
            </Typography>
          </Box>

          <Box sx={orderDetailsStyles.infoBox}>
            <Typography sx={orderDetailsStyles.infoLabel}>
              Transaction ID
            </Typography>

            <Typography sx={orderDetailsStyles.infoValue}>
              {transaction?.transaction_id}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* UPDATE STATUS */}

      <Box sx={orderDetailsStyles.card}>
        <Typography sx={orderDetailsStyles.sectionTitle}>
          Update Order Status
        </Typography>

        <Box sx={orderDetailsStyles.statusWrapper}>
          <Select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            size="small"
            sx={orderDetailsStyles.select}
          >
            <MenuItem value="processing">Processing</MenuItem>

            <MenuItem value="shipped">Shipped</MenuItem>

            <MenuItem value="delivered">Delivered</MenuItem>

            <MenuItem value="cancelled">Cancelled</MenuItem>

            <MenuItem value="returned">Returned</MenuItem>
          </Select>

          <Button
            variant="contained"
            onClick={updateStatus}
            sx={orderDetailsStyles.updateBtn}
          >
            Update Status
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
