"use client";

import { Box, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import BoltIcon from "@mui/icons-material/Bolt";
import { useRef } from "react";
import { useRouter } from "next/navigation";
export default function ProductCard({ p, styles }) {
  const videoRef = useRef(null);
  const router = useRouter();
  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = 1;
    video.play().catch(() => {});
  };

  const stopVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    video.style.opacity = 0;
  };
  const goToProduct = () => {
    router.push(`/productdetails?slug=${p.slug}`);
  };
  return (
    <Box
      sx={{
        ...styles.card,
        cursor: "pointer",
      }}
      onClick={goToProduct}
    >
      {/* MEDIA */}
      <Box
        sx={styles.imageWrapper}
        onMouseEnter={playVideo}
        onMouseLeave={stopVideo}
      >
        <img src={p.img} style={styles.image} />

        {p.video && (
          <>
            <video
              ref={videoRef}
              src={p.video}
              muted
              loop
              style={styles.video}
            />

            <Box sx={styles.playIcon}>
              <PlayArrowIcon fontSize="small" />
            </Box>
          </>
        )}

        {p.overlay && <Box sx={styles.overlay}>{p.overlay}</Box>}
      </Box>

      {/* TOOLTIP */}
      <Box className="tooltip" sx={styles.tooltip}>
        {p.title}
      </Box>

      {/* BADGES */}
      <Box sx={styles.badgeRow}>
        {p.badge1 && (
          <Box sx={{ ...styles.badge, ...styles.easter }}>{p.badge1}</Box>
        )}
        {p.badge2 && (
          <Box sx={{ ...styles.badge, ...styles.local }}>{p.badge2}</Box>
        )}
      </Box>

      <Typography sx={styles.title}>{p.title}</Typography>

      {/* PRICE */}
      <Box sx={styles.priceRow}>
        <Typography sx={styles.lastDay}>LAST DAY</Typography>
        <Typography sx={styles.price}>{p.price}</Typography>
        {p.old && <Typography sx={styles.oldPrice}>{p.old}</Typography>}
      </Box>

      {/* CART */}
      <Box sx={styles.cart}>
        <ShoppingCartIcon fontSize="small" />
      </Box>

      {/* SAVE */}
      {p.saved && (
        <Box sx={styles.saveRow}>
          <Box sx={styles.saveBadge}>
            <BoltIcon sx={{ fontSize: 14 }} /> Saved {p.saved}
          </Box>
          <Box sx={styles.timer}>{p.timer}</Box>
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
        <Typography>{p.sold}</Typography>
      </Box>

      {p.brand && (
        <Box sx={styles.storeRow}>
          <Box sx={styles.starStore}>Star store</Box>
          <Box sx={styles.brand}>Brand: {p.brand}</Box>
        </Box>
      )}

      {p.delivery && (
        <Typography sx={styles.delivery}>
          Arrives in 2+ business days
        </Typography>
      )}
    </Box>
  );
}
