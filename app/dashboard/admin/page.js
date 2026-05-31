// "use client";
// import { Typography, Box } from "@mui/material";
// import Grid from "@mui/material/Grid";

// import StatsCardAdmin from "@/components/dashboard/admin/StatsCardAdmin";

// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import PeopleIcon from "@mui/icons-material/People";
// import StoreIcon from "@mui/icons-material/Store";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// //import StatCard from "@/components/dashboard/admin/StatsCardAdmin"
// export default function Page() {
//   return (
//     <Box>
//       <Typography fontSize="24px" fontWeight={700} mb={2}>
//         Admin Dashboard 🚀
//       </Typography>

//       {/* ✅ NEW GRID SYSTEM */}

//       <Grid container spacing={3}>

//         <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: "flex" }}>
//           <StatsCardAdmin
//             title="Revenue"
//             value="₹12,45,000"
//             trend="+22%"
//             icon={<CurrencyRupeeIcon />}
//           />
//         </Grid>

//         <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: "flex" }}>
//           <StatsCardAdmin
//             title="Users"
//             value="8,240"
//             trend="+12%"
//             icon={<PeopleIcon />}
//           />
//         </Grid>

//         <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: "flex" }}>
//           <StatsCardAdmin
//             title="Vendors"
//             value="320"
//             trend="+8%"
//             icon={<StoreIcon />}
//           />
//         </Grid>

//         <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: "flex" }}>
//           <StatsCardAdmin
//             title="Orders"
//             value="15,420"
//             trend="+18%"
//             icon={<ShoppingCartIcon />}
//           />
//         </Grid>

//         <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: "flex" }}>
//           <StatsCardAdmin
//             title="Orders"
//             value="15,420"
//             trend="+18%"
//             icon={<ShoppingCartIcon />}
//           />
//         </Grid>

//       </Grid>

//     </Box>
//   );
// }

"use client";

import { Box, Typography, useTheme } from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import Inventory2Icon from "@mui/icons-material/Inventory2";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import ReviewsIcon from "@mui/icons-material/Reviews";

import StorefrontIcon from "@mui/icons-material/Storefront";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import StarIcon from "@mui/icons-material/Star";

import PaidIcon from "@mui/icons-material/Paid";

export default function StatsCardAdmin() {
  const theme = useTheme();

  // 🔥 DUMMY DATA

  const stats = [
    {
      title: "Total Users",

      value: "1,240",

      icon: (
        <PeopleAltIcon
          sx={{
            fontSize: 40,

            color: "#2563eb",
          }}
        />
      ),

      trend: "+24 this week",
    },

    {
      title: "Total Products",

      value: "845",

      icon: (
        <Inventory2Icon
          sx={{
            fontSize: 40,

            color: "#9333ea",
          }}
        />
      ),

      trend: "780 active",
    },

    {
      title: "Total Orders",

      value: "3,521",

      icon: (
        <ShoppingBagIcon
          sx={{
            fontSize: 40,

            color: "#ea580c",
          }}
        />
      ),

      trend: "+132 this week",
    },

    {
      title: "Revenue",

      value: "$4,82,0",

      icon: (
        <CurrencyRupeeIcon
          sx={{
            fontSize: 40,

            color: "#16a34a",
          }}
        />
      ),

      trend: "Store earnings",
    },

    {
      title: "Reviews",

      value: "931",

      icon: (
        <ReviewsIcon
          sx={{
            fontSize: 40,

            color: "#db2777",
          }}
        />
      ),

      trend: "Customer reviews",
    },

    {
      title: "Average Rating",

      value: "4.7",

      icon: (
        <StarIcon
          sx={{
            fontSize: 40,

            color: "#f59e0b",
          }}
        />
      ),

      trend: "Excellent rating",
    },

    {
      title: "Vendors",

      value: "78",

      icon: (
        <StorefrontIcon
          sx={{
            fontSize: 40,

            color: "#0f766e",
          }}
        />
      ),

      trend: "Registered sellers",
    },

    {
      title: "Transactions",

      value: "2,890",

      icon: (
        <PaidIcon
          sx={{
            fontSize: 40,

            color: "#7c3aed",
          }}
        />
      ),

      trend: "Payment records",
    },
  ];

  return (
    <Box>
      {/* TITLE */}

      <Typography
        sx={{
          fontSize: "30px",

          fontWeight: 700,

          mb: 4,
        }}
      >
        Dashboard Analytics
      </Typography>

      {/* GRID */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",

            sm: "1fr 1fr",

            md: "1fr 1fr 1fr",

            lg: "1fr 1fr 1fr 1fr",
          },

          gap: 3,
        }}
      >
        {stats.map((stat, index) => (
          <Box
            key={index}
            sx={{
              p: 3,

              borderRadius: "16px",

              minHeight: 160,

              display: "flex",

              flexDirection: "column",

              justifyContent: "space-between",

              background: theme.palette.background.paper,

              color: theme.palette.text.primary,

              border: `1px solid ${theme.palette.divider}`,

              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",

              transition: "all 0.3s ease",

              "&:hover": {
                transform: "translateY(-5px)",

                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              },
            }}
          >
            {/* TOP */}

            <Box>
              {/* ICON */}

              <Box mb={2}>{stat.icon}</Box>

              {/* TITLE */}

              <Typography
                sx={{
                  fontSize: "13px",

                  color: theme.palette.text.secondary,
                }}
              >
                {stat.title}
              </Typography>

              {/* VALUE */}

              <Typography
                sx={{
                  fontSize: "26px",

                  fontWeight: 700,

                  mt: 0.5,
                }}
              >
                {stat.value}
              </Typography>
            </Box>

            {/* BOTTOM */}

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: 1,

                mt: 2,

                color: "#16a34a",

                fontWeight: 600,
              }}
            >
              <TrendingUpIcon
                sx={{
                  fontSize: 16,
                }}
              />

              <Typography fontSize="12px">{stat.trend}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
