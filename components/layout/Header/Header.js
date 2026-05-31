"use client";
import { useState, useRef,useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from "@mui/icons-material/Menu";
import SupportMenu from "./SupportMenu";
import CategoriesMenu from "./CategoriesMenu";
import AccountMenu from "./AccountMenu";
import SearchSuggestions from "./SearchSuggestions";
import AuthModal from "@/components/layout/Header/AuthModal/AuthModal";
import RegisterModal from "@/components/layout/Header/AuthModal/RegisterModal";
import VerificationModal from "@/components/layout/Header/AuthModal/VerificationModal";

import SignInModal from "@/components/layout/Header/AuthModal/SignInModal";
import styles from "./headerStyles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Badge } from "@mui/material";
import { fetchCart } from "@/slice/cartSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
export default function Header() {
   const dispatch = useDispatch();
  const [showSupport, setShowSupport] = useState(false);
  const closeTimer = useRef(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const router = useRouter();
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";

  const [authOpen, setAuthOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [email, setEmail] = useState("");

  const [otpOpen, setOtpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  // 🔥 CART
  const { cart } = useSelector((state) => state.cart);

  // 🔥 TOTAL ITEMS
  const totalItems =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  // 🔥 FETCH DATA
  useEffect(() => {
    if (session?.user?._id) {
      // 🔥 FETCH CART
      dispatch(fetchCart(session.user._id));
    }
  }, [dispatch]);

  const handleClick = () => {
    if (!isLoggedIn) {
      return;
    }

    const userType = session?.user?.user_type || "customer";

    router.push(`/dashboard/${userType}`); // 👈 dynamic redirect
  };

  const handleMouseEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    setShowSupport(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setShowSupport(false);
    }, 200); // delay closing
  };

  return (
    <>
      <Box sx={styles.wrapper}>
        <Box sx={styles.container}>
          {/* LEFT SECTION */}
          <Box sx={styles.leftSection}>
            <Box sx={styles.logo} onClick={() => router.push("/")}>
              TEMU
            </Box>

            <Box sx={{ ...styles.navItem, ...styles.desktopOnly }}>
              <ThumbUpAltOutlinedIcon fontSize="small" />
              Best-Selling Items
            </Box>

            <Box sx={{ ...styles.navItem, ...styles.desktopOnly }}
              onClick={() => router.push("/star-rated")}
            
            >
              <StarBorderIcon fontSize="small" />
              5-Star Rated
            </Box>
     
            <Box sx={{ ...styles.navItem, ...styles.desktopOnly }}>
              <LocalShippingOutlinedIcon fontSize="small" />
              Local Warehouse
            </Box>

            <Box
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
              sx={{
                ...styles.navItem,
                ...styles.desktopOnly,
                padding: "14px 10px",
                borderRadius: "30px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                fontSize: "14px",
                "&:hover": {
                  background: "rgba(0,0,0,0.6)",
                },
              }}
            >
              Categories
              <KeyboardArrowDownIcon fontSize="small" />
              {showCategories && <CategoriesMenu />}
            </Box>
          </Box>

          {/* SEARCH */}
          <Box sx={styles.searchContainer}>
            <Box
              sx={{ ...styles.searchContainer }}
              onMouseEnter={() => setShowSearchSuggestions(true)}
              onMouseLeave={() => setShowSearchSuggestions(false)}
            >
              <input placeholder="wallet" style={styles.searchInput} />

              <Box sx={styles.searchButton}>
                <SearchIcon fontSize="small" />
              </Box>

              {showSearchSuggestions && <SearchSuggestions />}
            </Box>
          </Box>

          {/* DESKTOP RIGHT */}
          <Box sx={{ ...styles.rightSection, ...styles.desktopOnly }}>
            {/* 
            <Box
              onClick={() => {
                if (!isLoggedIn) {
                  setAuthOpen(true); // ✅ correct
                }
              }}
              onMouseEnter={() => isLoggedIn && setShowAccount(true)}
              onMouseLeave={() => setShowAccount(false)}
            >
              <Typography sx={styles.accountText}>
                {isLoggedIn ? (
                  <>
                    Hello, Ho***34 <br />
                    Orders & Account
                  </>
                ) : (
                  <>
                    Hello, Sign in <br />
                    Account & Orders
                  </>
                )}
              </Typography>

              {isLoggedIn && showAccount && <AccountMenu />}
            </Box> */}

            <Box
              onClick={() => {
                if (!isLoggedIn) {
                  setAuthOpen(true);
                }
              }}
              onMouseEnter={() => isLoggedIn && setShowAccount(true)}
              onMouseLeave={() => setShowAccount(false)}
            >
              <Typography
                sx={{ ...styles.accountText, cursor: "pointer" }}
                onClick={handleClick}
              >
                {isLoggedIn ? (
                  <>
                    Hello, {session?.user?.name || session?.user?.email} <br />
                    Orders & Account
                  </>
                ) : (
                  <>
                    Hello, Sign in <br />
                    Account & Orders
                  </>
                )}
              </Typography>

              {isLoggedIn && showAccount && <AccountMenu />}
            </Box>

            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Box
                sx={{
                  ...styles.iconItem,
                  padding: "14px 10px",
                  borderRadius: "30px",
                }}
              >
                <SupportAgentOutlinedIcon fontSize="small" />
                Support
              </Box>

              {showSupport && <SupportMenu />}
            </Box>
            <Box sx={styles.iconItem}>🇺🇸 English</Box>

            {/* <IconButton
              onClick={() => router.push("/cart")}
              sx={{
                ...styles.iconItem,
                padding: "10px 10px",
                borderRadius: "30px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                fontSize: "4px",
                "&:hover": {
                  background: "rgba(0, 0, 0, 0.6)",
                },
              }}
            >
              <ShoppingCartOutlinedIcon />
            </IconButton>
 */}

            <IconButton
              onClick={() => router.push("/cart")}
              sx={{
                ...styles.iconItem,

                padding: "10px 10px",

                borderRadius: "30px",

                cursor: "pointer",

                transition: "all 0.25s ease",

                fontSize: "4px",

                "&:hover": {
                  background: "rgba(0, 0, 0, 0.6)",
                },
              }}
            >
              {/* 🔥 BADGE */}
              <Badge
                badgeContent={totalItems}
                color="error"
                overlap="circular"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "11px",

                    minWidth: "18px",

                    height: "18px",

                    fontWeight: 700,
                  },
                }}
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>

          {/* MOBILE ICONS */}
          <Box sx={styles.mobileIcons}>
            <IconButton sx={{ color: "#fff" }}>
              <MenuIcon />
            </IconButton>

            <IconButton sx={{ color: "#fff" }}>
              <PersonOutlineIcon />
            </IconButton>

            <IconButton sx={{ color: "#fff" }}>
              <ShoppingCartOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* 🔥 LOGIN MODAL */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        setEmail={setEmail}
        email={email}
        onContinue={() => {
          setAuthOpen(false);
          setRegisterOpen(true);
        }}
        onOpenSignIn={() => {
          setAuthOpen(false);
          setSignInOpen(true);
        }}
      />

      {/* 🔥 REGISTER MODAL */}
      <RegisterModal
        open={registerOpen}
        email={email}
        setEmail={setEmail}
        onClose={() => setRegisterOpen(false)}
        onBack={() => {
          setRegisterOpen(false);
          setAuthOpen(true);
        }}
        onVerify={() => {
          setRegisterOpen(false);
          setOtpOpen(true); // 🔥 THIS OPENS OTP
        }}
      />

      <VerificationModal
        open={otpOpen}
        email={email}
        onClose={() => setOtpOpen(false)}
        onBack={() => {
          setOtpOpen(false);
          setRegisterOpen(true);
        }}
      />

      <SignInModal
        open={signInOpen}
        email={email}
        onClose={() => setSignInOpen(false)}
        onBack={() => {
          setSignInOpen(false);
          setAuthOpen(true); // 👈 go back to auth modal
        }}
      />
    </>
  );
}
