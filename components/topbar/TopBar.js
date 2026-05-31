"use client";

import { Box, Typography, Button } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import styles from "./topbarstyles";

export default function TopBar() {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.container}>

        <Box sx={styles.leftSection}>

          {/* FREE SHIPPING (ALWAYS VISIBLE) */}
          <Box sx={styles.item}>
            <LocalShippingOutlinedIcon sx={styles.greenIcon} />

            <Box>
              <Box sx={styles.row}>
                <Typography sx={styles.greenTitle}>
                  Free shipping
                </Typography>
                <ChevronRightIcon sx={styles.greenArrow}/>
              </Box>

              <Typography sx={styles.greenSub}>
                Excludes local items
              </Typography>
            </Box>

            <Box sx={styles.divider}/>
          </Box>


          {/* DELIVERY GUARANTEE (HIDE ON SMALL DEVICE) */}
          <Box sx={styles.hideOnMobile}>
            <Box sx={styles.item}>
              <Inventory2OutlinedIcon sx={styles.yellowIcon} />

              <Box>
                <Typography sx={styles.yellowTitle}>
                  Delivery guarantee
                </Typography>

                <Typography sx={styles.yellowSub}>
                  Refund for any issues
                </Typography>
              </Box>

              <Box sx={styles.divider}/>
            </Box>
          </Box>


          {/* TEMU APP (HIDE ON SMALL DEVICE) */}
          <Box sx={styles.hideOnMobile}>
            <Box sx={styles.itemLast}>
              <PhoneIphoneOutlinedIcon sx={styles.yellowIcon} />

              <Typography sx={styles.yellowTitle}>
                Get the Temu App
              </Typography>

              <Box sx={styles.divider}/>
            </Box>
          </Box>

        </Box>


        {/* BUTTONS (HIDE ON MOBILE) */}
        <Box sx={styles.hideOnMobile}>
          <Box sx={styles.buttonWrapper}>
            <Button sx={styles.sellBtn}>Sell on Temu</Button>

            <Button sx={styles.joinBtn}
            
            href="/vendor-register"
            >
              Join Now
              <ChevronRightIcon sx={{ fontSize: 16, ml: 0.5 }} />
            </Button>
          </Box>
        </Box>

      </Box>
    </Box>
  );
}