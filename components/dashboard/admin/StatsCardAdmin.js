// "use client";
// import { Box, Typography } from "@mui/material";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";

// export default function StatsCardAdmin({
//   title,
//   value,
//   icon,
//   color,
//   trend,
// }) {
//   return (
//     <Box
//       sx={{
//         p: 3,
//         borderRadius: "16px",
//         background: "#fff",
//         boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
//         transition: "0.3s",

//         "&:hover": {
//           transform: "translateY(-5px)",
//         },
//       }}
//     >
//       <Box mb={2}>{icon}</Box>

//       <Typography fontSize="13px" color="#777">
//         {title}
//       </Typography>

//       <Typography fontSize="26px" fontWeight={700}>
//         {value}
//       </Typography>

//       <Box display="flex" alignItems="center" gap={1} mt={1}>
//         <TrendingUpIcon fontSize="small" />
//         <Typography fontSize="12px">{trend}</Typography>
//       </Box>
//     </Box>
//   );
// }

// "use client";

// import { Box, Typography, Grid } from "@mui/material";

// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

// import Inventory2Icon from "@mui/icons-material/Inventory2";

// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

// import ReviewsIcon from "@mui/icons-material/Reviews";

// import StorefrontIcon from "@mui/icons-material/Storefront";

// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

// import StarIcon from "@mui/icons-material/Star";

// import PaidIcon from "@mui/icons-material/Paid";

// import StatsCardAdmin from "./StatsCardAdmin";

// export default function AdminAnalytics() {
//   // 🔥 DUMMY STATS

//   const stats = [
//     {
//       title: "Total Users",

//       value: 1240,

//       icon: (
//         <PeopleAltIcon
//           sx={{
//             fontSize: 40,

//             color: "#2563eb",
//           }}
//         />
//       ),

//       trend: "+24 this week",
//     },

//     {
//       title: "Total Products",

//       value: 845,

//       icon: (
//         <Inventory2Icon
//           sx={{
//             fontSize: 40,

//             color: "#9333ea",
//           }}
//         />
//       ),

//       trend: "780 active",
//     },

//     {
//       title: "Total Orders",

//       value: 3521,

//       icon: (
//         <ShoppingBagIcon
//           sx={{
//             fontSize: 40,

//             color: "#ea580c",
//           }}
//         />
//       ),

//       trend: "+132 this week",
//     },

//     {
//       title: "Revenue",

//       value: "₹4,82,000",

//       icon: (
//         <CurrencyRupeeIcon
//           sx={{
//             fontSize: 40,

//             color: "#16a34a",
//           }}
//         />
//       ),

//       trend: "Store earnings",
//     },

//     {
//       title: "Reviews",

//       value: 931,

//       icon: (
//         <ReviewsIcon
//           sx={{
//             fontSize: 40,

//             color: "#db2777",
//           }}
//         />
//       ),

//       trend: "Customer reviews",
//     },

//     {
//       title: "Average Rating",

//       value: 4.7,

//       icon: (
//         <StarIcon
//           sx={{
//             fontSize: 40,

//             color: "#f59e0b",
//           }}
//         />
//       ),

//       trend: "Excellent rating",
//     },

//     {
//       title: "Vendors",

//       value: 78,

//       icon: (
//         <StorefrontIcon
//           sx={{
//             fontSize: 40,

//             color: "#0f766e",
//           }}
//         />
//       ),

//       trend: "Registered sellers",
//     },

//     {
//       title: "Transactions",

//       value: 2890,

//       icon: (
//         <PaidIcon
//           sx={{
//             fontSize: 40,

//             color: "#7c3aed",
//           }}
//         />
//       ),

//       trend: "Payment records",
//     },

//     {
//       title: "Processing Orders",

//       value: 98,

//       icon: (
//         <ShoppingBagIcon
//           sx={{
//             fontSize: 40,

//             color: "#2563eb",
//           }}
//         />
//       ),

//       trend: "Current processing",
//     },

//     {
//       title: "Shipped Orders",

//       value: 421,

//       icon: (
//         <ShoppingBagIcon
//           sx={{
//             fontSize: 40,

//             color: "#0ea5e9",
//           }}
//         />
//       ),

//       trend: "Out for delivery",
//     },

//     {
//       title: "Delivered Orders",

//       value: 2870,

//       icon: (
//         <ShoppingBagIcon
//           sx={{
//             fontSize: 40,

//             color: "#16a34a",
//           }}
//         />
//       ),

//       trend: "Completed orders",
//     },

//     {
//       title: "Low Stock",

//       value: 18,

//       icon: (
//         <Inventory2Icon
//           sx={{
//             fontSize: 40,

//             color: "#dc2626",
//           }}
//         />
//       ),

//       trend: "Need restock",
//     },
//   ];

//   return (
//     <Box>
//       {/* TITLE */}

//       <Typography
//         sx={{
//           fontSize: "28px",

//           fontWeight: 700,

//           mb: 4,
//         }}
//       >
//         Dashboard Analytics
//       </Typography>

//       {/* GRID */}

//       <Grid container spacing={3}>
//         {stats.map((stat, index) => (
//           <Grid
//             key={index}
//             size={{
//               xs: 12,

//               sm: 6,

//               md: 4,

//               lg: 3,
//             }}
//           >
//             <StatsCardAdmin
//               title={stat.title}
//               value={stat.value}
//               icon={stat.icon}
//               trend={stat.trend}
//             />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }
