"use client";
import { Box, Grid, Typography } from "@mui/material";

import StatsCard from "@/components/dashboard/vendor/StatsCard";

// Icons
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import KycPending from "./KycPendingAlert";
export default function Page() {
  return (
    <Box>
      {/* HEADER */}
      <Box mb={3}>
        <Typography fontSize="24px" fontWeight={700}>
          Dashboard
        </Typography>

        <Typography color="#777" fontSize="14px">
          Welcome back 👋 Here's what's happening today.
        </Typography>
      </Box>
      <KycPending />
      {/* STATS CARDS */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          <StatsCard
            title="Total Sales"
            value="₹45,000"
            trend="+18%"
            icon={<CurrencyRupeeIcon />}
            color="linear-gradient(135deg, #ff7a18, #ffb347)"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <StatsCard
            title="Orders"
            value="120"
            trend="+9%"
            icon={<ShoppingCartIcon />}
            color="linear-gradient(135deg, #36d1dc, #5b86e5)"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <StatsCard
            title="Products"
            value="45"
            trend="+5%"
            icon={<InventoryIcon />}
            color="linear-gradient(135deg, #11998e, #38ef7d)"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <StatsCard
            title="Customers"
            value="80"
            trend="+12%"
            icon={<PeopleIcon />}
            color="linear-gradient(135deg, #ee0979, #ff6a00)"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
