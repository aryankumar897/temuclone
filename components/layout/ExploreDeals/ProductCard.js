"use client";

import { Box, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import BoltIcon from "@mui/icons-material/Bolt";
import { useRef } from "react";
import styles from "./exploreProductsStyles";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const router = useRouter();
  const videoRef = useRef(null);
  const handleClick = () => {
    if (product.slug) {
      router.push(`/productdetails?slug=${product.slug}`); // ✅ REDIRECT
    }
  };
  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = 1;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  };

  const stopVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    video.style.opacity = 0;
  };

  return (
    <Box sx={styles.card} onClick={handleClick} style={{ cursor: "pointer" }}>
      {/* MEDIA */}
      <Box
        sx={styles.imageWrapper}
        onMouseEnter={playVideo}
        onMouseLeave={stopVideo}
      >
        <img src={product.img} style={styles.image} />

        {product.video && (
          <>
            <video
              ref={videoRef}
              src={product.video}
              muted
              loop
              style={styles.video}
            />
            <Box sx={styles.playIcon}>
              <PlayArrowIcon fontSize="small" />
            </Box>
          </>
        )}

        {product.overlay && <Box sx={styles.overlay}>{product.overlay}</Box>}
      </Box>

      {/* TOOLTIP */}
      <Box className="tooltip" sx={styles.tooltip}>
        {product.description}
      </Box>

      {/* BADGES */}
      <Box sx={styles.badgeRow}>
        {product.badge1 && (
          <Box sx={{ ...styles.badge, ...styles.easter }}>{product.badge1}</Box>
        )}
        {product.badge2 && (
          <Box sx={{ ...styles.badge, ...styles.local }}>{product.badge2}</Box>
        )}
      </Box>

      <Typography sx={styles.title}>{product.title}</Typography>

      {/* PRICE */}
      <Box sx={styles.priceRow}>
        <Typography sx={styles.lastDay}>LAST DAY</Typography>
        <Typography sx={styles.price}>{product.price}</Typography>
        {product.old && (
          <Typography sx={styles.oldPrice}>{product.old}</Typography>
        )}
      </Box>

      {/* CART */}
      <Box sx={styles.cart}>
        <ShoppingCartIcon fontSize="small" />
      </Box>

      {/* SAVE */}
      {product.saved && (
        <Box sx={styles.saveRow}>
          <Box sx={styles.saveBadge}>
            <BoltIcon sx={{ fontSize: 14 }} /> Saved {product.saved}
          </Box>
          <Box sx={styles.timer}>{product.timer}</Box>
        </Box>
      )}

      <Typography sx={styles.promoText}>
        BEST-SELLING ITEM | Last 6 months
      </Typography>

      {/* RATING */}
      <Box sx={styles.ratingRow}>
        <StarIcon sx={{ fontSize: 16 }} />
        <StarIcon sx={{ fontSize: 16 }} />
        <StarIcon sx={{ fontSize: 16 }} />
        <StarIcon sx={{ fontSize: 16 }} />
        <Typography>{product.sold}</Typography>
      </Box>

      {product.brand && (
        <Box sx={styles.storeRow}>
          <Box sx={styles.starStore}>Star store</Box>
          <Box sx={styles.brand}>Brand: {product.brand}</Box>
        </Box>
      )}

      {product.delivery && (
        <Typography sx={styles.delivery}>
          Arrives in 2+ business days
        </Typography>
      )}
    </Box>
  );
}
