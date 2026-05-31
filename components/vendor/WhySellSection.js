"use client";

import { Box, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import { whySellStyles } from "./WhySellStyles";

const data = [
  {
    title: (
      <>
        <span style={{ color: "#ff7a00" }}>Trending</span> Platform
      </>
    ),
    desc: "Thanks to Temu's global popularity and influence, you'll be able to easily promote your products to more potential customers.",
    icon: <TrendingUpIcon />,
  },
  {
    title: (
      <>
        Fast <span style={{ color: "#ff7a00" }}>First Sale</span>
      </>
    ),
    desc: "With Temu's high traffic, 50% of new sellers make their first sale within 20 days.",
    icon: <ShoppingBagIcon />,
  },
  {
    title: (
      <>
        <span style={{ color: "#ff7a00" }}>Cost-efficient</span> from the Start
      </>
    ),
    desc: "Benefit from cost-efficiency in store setup, selling, operation and marketing",
    icon: <AccountBalanceWalletIcon />,
  },
  {
    title: (
      <>
        <span style={{ color: "#ff7a00" }}>Personalized</span> Seller Support
      </>
    ),
    desc: "Our dedicated team of specialists is here to support your success. From onboarding to boosting product competitiveness, our experienced team provides the guidance you need every step of the way.",
    icon: <SupportAgentIcon />,
  },
];

export default function WhySellSection() {
  return (
    <Box sx={whySellStyles.section}>
      
      <Typography sx={whySellStyles.heading}>
        Why Sell on Temu?
      </Typography>

      <Box sx={whySellStyles.grid}>
        {data.map((item, index) => (
          <Box key={index} sx={whySellStyles.card}>
            
            {/* ICON */}
            <Box sx={whySellStyles.iconBox}>
              {item.icon}
            </Box>

            {/* CONTENT */}
            <Box>
              <Typography sx={whySellStyles.title}>
                {item.title}
              </Typography>

              <Typography sx={whySellStyles.desc}>
                {item.desc}
              </Typography>
            </Box>

          </Box>
        ))}
      </Box>

    </Box>
  );
}