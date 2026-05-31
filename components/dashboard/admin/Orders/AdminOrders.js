"use client";

import { Box, Typography, CircularProgress, Button } from "@mui/material";

import InventoryIcon from "@mui/icons-material/Inventory";

import AutorenewIcon from "@mui/icons-material/Autorenew";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import DoneAllIcon from "@mui/icons-material/DoneAll";

import CancelIcon from "@mui/icons-material/Cancel";

import ReplayIcon from "@mui/icons-material/Replay";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchAdminOrders } from "@/slice/adminOrderSlice";

import { useRouter } from "next/navigation";

import { adminOrdersStyles } from "./adminOrdersStyles";

export default function AdminOrders() {
  const dispatch = useDispatch();

  const router = useRouter();

  const [activeTab, setActiveTab] = useState("all");

  const { orders, loading } = useSelector((state) => state.adminOrders);

  // 🔥 FETCH
  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  // 🔥 TABS
  const tabs = [
    {
      label: "All Orders",

      key: "all",

      icon: <InventoryIcon fontSize="small" />,
    },

    {
      label: "Processing",

      key: "processing",

      icon: <AutorenewIcon fontSize="small" />,
    },

    {
      label: "Shipped",

      key: "shipped",

      icon: <LocalShippingIcon fontSize="small" />,
    },

    {
      label: "Delivered",

      key: "delivered",

      icon: <DoneAllIcon fontSize="small" />,
    },

    {
      label: "Cancelled",

      key: "cancelled",

      icon: <CancelIcon fontSize="small" />,
    },

    {
      label: "Returned",

      key: "returned",

      icon: <ReplayIcon fontSize="small" />,
    },
  ];

  // 🔥 FILTER
  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.order_status === activeTab);

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
    <Box sx={adminOrdersStyles.wrapper}>
      {/* HEADER */}

      <Typography sx={adminOrdersStyles.heading}>All Orders</Typography>

      {/* TABS */}

      <Box sx={adminOrdersStyles.tabsWrapper}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <Box
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              sx={{
                ...adminOrdersStyles.tab,

                ...(isActive ? adminOrdersStyles.activeTab : {}),
              }}
            >
              {tab.icon}

              {tab.label}
            </Box>
          );
        })}
      </Box>

      {/* EMPTY */}

      {!filteredOrders?.length && (
        <Box sx={adminOrdersStyles.emptyWrapper}>
          <Typography sx={adminOrdersStyles.emptyText}>
            No {activeTab} orders
          </Typography>
        </Box>
      )}

      {/* ORDERS */}

      {filteredOrders?.map((order) => (
        <Box key={order._id} sx={adminOrdersStyles.orderCard}>
          {/* TOP */}

          <Box sx={adminOrdersStyles.topRow}>
            <Box>
              <Typography sx={adminOrdersStyles.orderNumber}>
                {order.order_number}
              </Typography>

              <Typography sx={adminOrdersStyles.userName}>
                {order?.user?.name}
              </Typography>

              <Typography sx={adminOrdersStyles.userEmail}>
                {order?.user?.email}
              </Typography>
            </Box>

            <Typography sx={adminOrdersStyles.orderStatus}>
              {order.order_status}
            </Typography>
          </Box>

          {/* ITEMS */}

          {order.items?.map((item) => {
            const image =
              item?.variant?.media?.[0]?.url || item?.product?.media?.[0]?.url;

            return (
              <Box key={item._id} sx={adminOrdersStyles.itemRow}>
                <Box
                  component="img"
                  src={image}
                  sx={adminOrdersStyles.productImage}
                />

                <Box>
                  <Typography sx={adminOrdersStyles.productName}>
                    {item?.product?.name}
                  </Typography>

                  <Typography sx={adminOrdersStyles.qtyText}>
                    Qty: {item.quantity}
                  </Typography>
                </Box>
              </Box>
            );
          })}

          {/* FOOTER */}

          <Box sx={adminOrdersStyles.footer}>
            <Typography sx={adminOrdersStyles.totalPrice}>
              ₹{order.total_amount}
            </Typography>

            <Button
              variant="contained"
              onClick={() => router.push(`/dashboard/admin/orders-details?orderId=${order._id}`)}
              sx={adminOrdersStyles.detailsBtn}
            >
              View Details
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
