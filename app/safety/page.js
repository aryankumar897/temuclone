"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WarningIcon from "@mui/icons-material/Warning";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TopBar from "@/components/topbar/TopBar";

import Header from "@/components/layout/Header/Header";
// Reusable Card

const ItemCard = ({ icon, title }) => (
  <Card
    sx={{
      borderRadius: 3,
      border: "1px solid #e0e0e0",
      boxShadow: "none",
      "&:hover": { boxShadow: 3 },
    }}
  >
    <CardContent
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        {icon && (
          <Box
            sx={{
              bgcolor: "#e8f5e9",
              color: "#2e7d32",
              p: 1.2,
              borderRadius: "50%",
              display: "flex",
            }}
          >
            {icon}
          </Box>
        )}

        <Typography fontWeight={500}>{title}</Typography>
      </Box>

      <ChevronRightIcon />
    </CardContent>
  </Card>
);
export default function SafetyCenter() {
  return (
    <>
      <TopBar />
      <Header />

      <Box>
        {/* HERO WITH IMAGE */}
        <Box
          sx={{
            bgcolor: "#16a34a",
            color: "white",
            py: { xs: 6, md: 8 },
          }}
        >
          <Container>
            <Grid container alignItems="center" spacing={4}>
              {/* LEFT TEXT */}
              <Grid size={{ xs: 12, md: 7 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  Safety center
                </Typography>

                <Typography sx={{ maxWidth: 500 }}>
                  Temu is committed to creating a safe shopping environment.
                  Learn about our efforts to enhance Temu's security for you.
                </Typography>
              </Grid>

              {/* RIGHT IMAGE */}
              <Grid
                size={{ xs: 12, md: 5 }}
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-end" },
                }}
              >
                <Box
                  component="img"
                  src="/images/lock.avif"
                  alt="security"
                  sx={{
                    width: { xs: 120, sm: 160, md: 150 },
                    height: "auto",
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* CONTENT */}
        <Container sx={{ mt: { xs: -4, md: -6 }, pb: 6 }}>
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: 4,
              p: { xs: 2, md: 4 },
              boxShadow: 3,
            }}
          >
            {/* Section 1 */}
            <Typography variant="h6" fontWeight={600} mb={2}>
              Protect your information
            </Typography>

            <Grid container spacing={2} mb={4}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <ItemCard icon={<LockIcon />} title="Protect your data" />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <ItemCard
                  icon={<AccountCircleIcon />}
                  title="Protect your account"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <ItemCard
                  icon={<ShoppingCartIcon />}
                  title="Protect your payment"
                />
              </Grid>
            </Grid>

            {/* Section 2 */}
            <Typography variant="h6" fontWeight={600} mb={2}>
              Stay safe from scammers
            </Typography>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <ItemCard icon={<WarningIcon />} title="Recognize scams" />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <ItemCard icon={<EmailIcon />} title="Recognize scam emails" />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <ItemCard
                  icon={<MessageIcon />}
                  title="Recognize scam messages"
                />
              </Grid>
            </Grid>

            {/* ================= REPORT SECTION ================= */}
            <Typography variant="h6" fontWeight={600} mt={4} mb={2}>
              Report something suspicious
            </Typography>

            <Grid container spacing={2} mb={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <ItemCard title="Report a suspicious phone call, email or SMS/text message" />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <ItemCard title="Report a fake website or app similar to Temu" />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <ItemCard title="Report fake promotions, gift card fraud, fake job opportunities, etc" />
              </Grid>
            </Grid>

            {/* ================= SAFETY PARTNERS ================= */}
            <Typography variant="h6" fontWeight={600} mb={1}>
              Safety partners
            </Typography>

            <Typography sx={{ mb: 2, maxWidth: 800 }}>
              Temu is an e-commerce company for global users, we not only{" "}
              <Box component="span" sx={{ color: "green" }}>
                support multiple payment methods
              </Box>
              , but also have{" "}
              <Box component="span" sx={{ color: "green" }}>
                obtained multiple security certifications
              </Box>{" "}
              to ensure your information stays safe. Learn more →
            </Typography>

            <Grid container spacing={2}>
              {[
                "/images/pay1.avif",
                "/images/pay2.avif",
                "/images/pay3.avif",
                "/images/pay4.avif",
                "/images/pay4.avif",
              ].map((logo, i) => (
                <Grid key={i} size={{ xs: 6, sm: 4, md: 2 }}>
                  <Box
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 2,
                      p: 1.5,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      bgcolor: "#fafafa",
                    }}
                  >
                    <Box
                      component="img"
                      src={logo}
                      alt="partner"
                      sx={{
                        maxHeight: 30,
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
