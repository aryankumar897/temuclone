"use client";

import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  Button,
  Modal,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import InventoryIcon from "@mui/icons-material/Inventory";

import AutorenewIcon from "@mui/icons-material/Autorenew";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import DoneAllIcon from "@mui/icons-material/DoneAll";

import { useSearchParams, useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { fetchOrders } from "@/slice/orderSlice";

import { ordersStyles } from "./ordersStyles";

export default function OrdersContent() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const dispatch = useDispatch();

  const { data: session } = useSession();

  // 🔥 TRANSACTION MODAL
  const [openTransaction, setOpenTransaction] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const active = searchParams.get("tab") || "all";

  // 🔥 REDUX
  const { orders, loading } = useSelector((state) => state.orders);

  // 🔥 FETCH ORDERS
  useEffect(() => {
    if (session?.user?._id) {
      dispatch(fetchOrders(session.user._id));
    }
  }, [session, dispatch]);

  const tabs = [
    {
      label: "All orders",

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
      label: "Returns",

      key: "returns",

      icon: <AutorenewIcon fontSize="small" />,
    },
  ];

  const changeTab = (key) => {
    router.push(`/dashboard/customer?tab=${key}`);
  };

  // 🔥 FILTER
  const filteredOrders =
    active === "all"
      ? orders
      : orders.filter((item) => item.order_status === active);

  // 🔥 OPEN TRANSACTION
  const handleOpenTransaction = (transaction) => {
    setSelectedTransaction(transaction);

    setOpenTransaction(true);
  };

  return (
    <Box sx={ordersStyles.container}>
      {/* TOP BAR */}

      <Box sx={ordersStyles.topBar}>
        <Box sx={ordersStyles.tabs}>
          {tabs.map((tab) => {
            const isActive = active === tab.key;

            return (
              <Box
                key={tab.key}
                onClick={() => changeTab(tab.key)}
                sx={{
                  display: "flex",

                  alignItems: "center",

                  gap: "6px",

                  cursor: "pointer",

                  ...(isActive ? ordersStyles.activeTab : {}),
                }}
              >
                {tab.icon}

                {tab.label}
              </Box>
            );
          })}
        </Box>

        <TextField
          size="small"
          sx={ordersStyles.search}
          placeholder="Item name / Order ID / Tracking No."
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
      </Box>

      {/* LOADING */}

      {loading && (
        <Box
          sx={{
            display: "flex",

            justifyContent: "center",

            mt: 10,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* EMPTY */}

      {!loading && !filteredOrders?.length && (
        <Box sx={ordersStyles.emptyState}>
          <Typography variant="h6">
            You don't have any {active} orders
          </Typography>
        </Box>
      )}

      {/* ORDERS */}

      {!loading &&
        filteredOrders?.map((order) => (
          <Box
            key={order._id}
            sx={{
              background: "#fff",

              borderRadius: "12px",

              padding: "20px",

              mb: 2,

              border: "1px solid #eee",
            }}
          >
            {/* TOP */}

            <Box
              sx={{
                display: "flex",

                justifyContent: "space-between",

                mb: 2,

                flexWrap: "wrap",

                gap: "10px",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {order.order_number}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "13px",

                    color: "#777",
                  }}
                >
                  {order.payment_method}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontWeight: 700,

                  color: "#ff4d00",

                  textTransform: "capitalize",
                }}
              >
                {order.order_status}
              </Typography>
            </Box>

            {/* ITEMS */}

            {order.items?.map((item) => {
              const image =
                item?.variant?.media?.[0]?.url ||
                item?.product?.media?.[0]?.url;

              return (
                <Box
                  key={item._id}
                  sx={{
                    display: "flex",

                    gap: "15px",

                    mb: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={image}
                    sx={{
                      width: "90px",

                      height: "90px",

                      borderRadius: "10px",

                      objectFit: "cover",
                    }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {item?.product?.name}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#777",

                        fontSize: "14px",

                        mt: 1,
                      }}
                    >
                      Qty: {item.quantity}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#ff4d00",

                        fontWeight: 700,

                        mt: 1,
                      }}
                    >
                      ${item.total}
                    </Typography>
                  </Box>
                </Box>
              );
            })}

            {/* FOOTER */}

            <Box
              sx={{
                borderTop: "1px solid #eee",

                pt: 2,

                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",

                flexWrap: "wrap",

                gap: "10px",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Total: ₹{order.total_amount}
                </Typography>

                <Typography
                  sx={{
                    color: "#777",

                    fontSize: "14px",
                  }}
                >
                  {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
              </Box>

              {/* 🔥 TRANSACTION BUTTON */}

              <Button
                variant="outlined"
                onClick={() => handleOpenTransaction(order.transaction)}
                sx={{
                  borderColor: "#ff4d00",

                  color: "#ff4d00",

                  textTransform: "none",

                  borderRadius: "10px",

                  "&:hover": {
                    borderColor: "#ff4d00",

                    background: "#fff5f0",
                  },
                }}
              >
                View Transaction
              </Button>
            </Box>
          </Box>
        ))}

      {/* 🔥 TRANSACTION MODAL */}

      <Modal open={openTransaction} onClose={() => setOpenTransaction(false)}>
        <Box
          sx={{
            position: "absolute",

            top: "50%",

            left: "50%",

            transform: "translate(-50%, -50%)",

            width: {
              xs: "95%",

              md: "650px",
            },

            maxHeight: "90vh",

            overflowY: "auto",

            background: "#fff",

            borderRadius: "20px",

            padding: "28px",

            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          }}
        >
          {/* HEADER */}

          <Box
            sx={{
              display: "flex",

              justifyContent: "space-between",

              alignItems: "center",

              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: "26px",

                fontWeight: 700,
              }}
            >
              Payment Transaction
            </Typography>

            <Typography
              sx={{
                background:
                  selectedTransaction?.status === "success"
                    ? "#e8fff1"
                    : "#fff1f0",

                color:
                  selectedTransaction?.status === "success"
                    ? "#00a650"
                    : "#ff4d4f",

                padding: "6px 14px",

                borderRadius: "30px",

                fontSize: "13px",

                fontWeight: 700,

                textTransform: "capitalize",
              }}
            >
              {selectedTransaction?.status}
            </Typography>
          </Box>

          {/* GRID */}

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",

                md: "1fr 1fr",
              },

              gap: "18px",
            }}
          >
            {/* PAYMENT GATEWAY */}

            <Box
              sx={{
                border: "1px solid #eee",

                borderRadius: "14px",

                padding: "18px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "13px",

                  color: "#777",

                  mb: 1,
                }}
              >
                Payment Gateway
              </Typography>

              <Typography
                sx={{
                  fontWeight: 700,

                  textTransform: "capitalize",
                }}
              >
                {selectedTransaction?.payment_gateway}
              </Typography>
            </Box>

            {/* AMOUNT */}

            <Box
              sx={{
                border: "1px solid #eee",

                borderRadius: "14px",

                padding: "18px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "13px",

                  color: "#777",

                  mb: 1,
                }}
              >
                Amount Paid
              </Typography>

              <Typography
                sx={{
                  fontWeight: 700,

                  color: "#ff4d00",

                  fontSize: "22px",
                }}
              >
                ${selectedTransaction?.amount}
              </Typography>
            </Box>

            {/* TRANSACTION ID */}

            <Box
              sx={{
                border: "1px solid #eee",

                borderRadius: "14px",

                padding: "18px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "13px",

                  color: "#777",

                  mb: 1,
                }}
              >
                Transaction ID
              </Typography>

              <Typography
                sx={{
                  fontWeight: 600,

                  fontSize: "13px",

                  wordBreak: "break-all",
                }}
              >
                {selectedTransaction?.transaction_id}
              </Typography>
            </Box>

            {/* PAYMENT ID */}

            <Box
              sx={{
                border: "1px solid #eee",

                borderRadius: "14px",

                padding: "18px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "13px",

                  color: "#777",

                  mb: 1,
                }}
              >
                Payment ID
              </Typography>

              <Typography
                sx={{
                  fontWeight: 600,

                  fontSize: "13px",

                  wordBreak: "break-all",
                }}
              >
                {selectedTransaction?.payment_id}
              </Typography>
            </Box>

            {/* CURRENCY */}

            <Box
              sx={{
                border: "1px solid #eee",

                borderRadius: "14px",

                padding: "18px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "13px",

                  color: "#777",

                  mb: 1,
                }}
              >
                Currency
              </Typography>

              <Typography
                sx={{
                  fontWeight: 700,

                  textTransform: "uppercase",
                }}
              >
                {selectedTransaction?.currency}
              </Typography>
            </Box>

            {/* DATE */}

            <Box
              sx={{
                border: "1px solid #eee",

                borderRadius: "14px",

                padding: "18px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "13px",

                  color: "#777",

                  mb: 1,
                }}
              >
                Payment Date
              </Typography>

              <Typography
                sx={{
                  fontWeight: 700,
                }}
              >
                {new Date(selectedTransaction?.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </Box>

          {/* RAW RESPONSE */}

          <Box
            sx={{
              mt: 4,

              border: "1px solid #eee",

              borderRadius: "14px",

              padding: "18px",

              background: "#fafafa",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,

                mb: 2,
              }}
            >
              Gateway Response
            </Typography>

            <Box
              component="pre"
              sx={{
                fontSize: "12px",

                overflowX: "auto",

                whiteSpace: "pre-wrap",

                wordBreak: "break-word",

                color: "#444",
              }}
            ></Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
