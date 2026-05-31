"use client";

import { Box, Typography, Button } from "@mui/material";
import styles from "./footerStyles";

export default function Footer() {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.container}>
        {/* TOP GRID */}
        <Box sx={styles.grid}>
          {/* Company Info */}
          <Box>
            <Typography sx={styles.columnTitle}>Company info</Typography>

            <Typography sx={styles.link}>About Temu</Typography>
            <Typography sx={styles.link}>
              Affiliate & Influencer Program: Join to Earn
            </Typography>
            <Typography sx={styles.link}>Contact us</Typography>
            <Typography sx={styles.link}>Careers</Typography>
            <Typography sx={styles.link}>Press</Typography>
            <Typography sx={styles.link}>
              Temu's Tree Planting Program
            </Typography>
          </Box>

          {/* Customer Service */}
          <Box>
            <Typography sx={styles.columnTitle}>Customer service</Typography>

            <Typography sx={styles.link}>Return and refund policy</Typography>
            <Typography sx={styles.link}>
              Intellectual property policy
            </Typography>
            <Typography sx={styles.link}>Shipping info</Typography>
            <Typography sx={styles.link}>
              Recalls and product safety alerts
            </Typography>
            <Typography sx={styles.link}>Report suspicious activity</Typography>
            <Typography sx={styles.link}>Prohibited Product List</Typography>
          </Box>

          {/* Help */}
          <Box>
            <Typography sx={styles.columnTitle}>Help</Typography>

            <Typography sx={styles.link}>Support center & FAQ</Typography>
            <Typography sx={styles.link}>Safety center</Typography>
            <Typography sx={styles.link}>Temu purchase protection</Typography>
            <Typography sx={styles.link}>Sitemap</Typography>
            <Typography sx={styles.link}>How to order</Typography>
            <Typography sx={styles.link}>How to track</Typography>
            <Typography sx={styles.link}>Partner with Temu</Typography>
          </Box>

          {/* Right Section */}
          <Box>
            {/* Seller Banner */}
            <Box sx={styles.sellerCard}>
              <Typography sx={styles.sellerTitle}>
                Start Selling to Millions of Buyers on Temu
              </Typography>

              <Button sx={styles.sellerBtn}>Start a Selling Account</Button>
            </Box>

            {/* App Download */}
            <Typography sx={styles.appTitle}>Download the Temu App</Typography>

            <Box sx={styles.featureGrid}>
              <Box sx={styles.featureItem}>✔ Price-drop alerts</Box>
              <Box sx={styles.featureItem}>✔ Track orders any time</Box>
              <Box sx={styles.featureItem}>✔ Faster & secure checkout</Box>
              <Box sx={styles.featureItem}>✔ Low stock alerts</Box>
              <Box sx={styles.featureItem}>✔ Exclusive offers</Box>
              <Box sx={styles.featureItem}>✔ Coupons & deals</Box>
            </Box>

            {/* Store Buttons */}
            <Box sx={styles.storeButtons}>
              <Box sx={styles.storeBtn}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                  width="16"
                />
                App Store
              </Box>

              <Box sx={styles.storeBtn}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg"
                  width="18"
                />
                Google Play
              </Box>
            </Box>

            {/* Social */}
            <Box sx={styles.socialRow}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                style={styles.socialIcon}
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                style={styles.socialIcon}
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png"
                style={styles.socialIcon}
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/3046/3046120.png"
                style={styles.socialIcon}
              />
            </Box>
          </Box>
        </Box>

        {/* BOTTOM SECTION */}
        <Box sx={styles.bottomRow}>
          {/* Security */}
          <Box>
            <Typography sx={styles.columnTitle}>
              Security certification
            </Typography>

            <Box sx={styles.securityRow}>
              <img src="/images/sec1.avif" style={styles.securityIcon} />

              <img src="/images/sec2.avif" style={styles.securityIcon} />
              <img src="/images/sec3.avif" style={styles.securityIcon} />
              <img src="/images/sec4.avif" style={styles.securityIcon} />
            </Box>
          </Box>

          {/* Payment */}
          <Box>
            <Typography sx={styles.columnTitle}>We accept</Typography>

            <Box sx={styles.paymentRow}>
              <img src="/images/pay1.avif" style={styles.paymentIcon} />
              <img src="/images/pay2.avif" style={styles.paymentIcon} />
              <img src="/images/pay3.avif" style={styles.paymentIcon} />
              <img src="/images/pay4.avif" style={styles.paymentIcon} />
              <img src="/images/pay5.avif" style={styles.paymentIcon} />
              <img src="/images/pay6.avif" style={styles.paymentIcon} />
              <img src="/images/pay7.avif" style={styles.paymentIcon} />
              <img src="/images/pay8.avif" style={styles.paymentIcon} />
              <img src="/images/pay9.avif" style={styles.paymentIcon} />
              <img src="/images/pay10.avif" style={styles.paymentIcon} />
              <img src="/images/pay11.avif" style={styles.paymentIcon} />
              <img src="/images/pay12.avif" style={styles.paymentIcon} />
              <img src="/images/pay13.avif" style={styles.paymentIcon} />
              <img src="/images/pay14.avif" style={styles.paymentIcon} />
              <img src="/images/pay15.avif" style={styles.paymentIcon} />
              <img src="/images/pay16.avif" style={styles.paymentIcon} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
