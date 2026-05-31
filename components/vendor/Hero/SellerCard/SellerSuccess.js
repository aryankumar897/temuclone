"use client";

import { Box, Typography,Grid } from "@mui/material";

import SellerCard from "./SellerCard";

export default function SellerSuccess() {
  return (
    <Box sx={{ py: 6, px: 3, background: "#fafafa" }}>
      
      {/* Title */}
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight={700}
        mb={5}
      >
        Seller Success on Temu
      </Typography>

      {/* Cards */}
      <Grid container spacing={4} justifyContent="center">
        
        <Grid size={{ xs: 12, md: 5 }}>
          <SellerCard
            image="/images/top.avif"
            logo="/images/logo1.png"
            title="Grumpy Butcher"
            description="I would like to deliver restaurant-quality meals and premium meats directly to American homes. Temu helped us reach customers we’d never reached before. Now we're growing faster—and hiring just to keep up."
            name="Denys Gorbatiuk"
            role="CEO & Founder of Grumpy Butcher"
            buttonText="See Denys’s story"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <SellerCard
            image="/images/top.avif"
            logo="/images/logo2.png"
            title="Patch Party Club"
            description="I want American-made creativity to shine globally. Temu is giving me the opportunity to do that. It feels like we’re just getting started."
            name="Toyiah Marquis"
            role="CEO & Founder of Patch Party Club"
            buttonText="See Toyiah's story"
          />
        </Grid>

      </Grid>
    </Box>
  );
}