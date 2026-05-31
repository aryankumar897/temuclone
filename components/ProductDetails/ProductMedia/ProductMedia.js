// "use client";

// import { Box, Typography } from "@mui/material";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { useState } from "react";
// import styles from "./productMediaStyles";

// export default function ProductDetails() {
//   const media = [
//     { type: "video", src: "/images/video1.mp4" },
//     { type: "image", src: "/images/img1.avif" },
//     { type: "image", src: "/images/img2.avif" },
//     { type: "image", src: "/images/img3.avif" },
//   ];

//   const [showAll, setShowAll] = useState(false);

//   const visibleMedia = showAll ? media : media.slice(0, 2);

//   return (
//     <Box sx={styles.container}>
//       {/* HEADER */}
//       <Box sx={styles.header}>
//         <Typography sx={styles.title}>Product details</Typography>

//         <Box sx={styles.headerActions}>
//           <FavoriteBorderIcon sx={{ fontSize: 18 }} />
//           Save | Report issue ›
//         </Box>
//       </Box>

//       {/* ATTRIBUTES */}
//       <Box sx={styles.attributesRow}>
//         <Box sx={styles.attribute}>
//           <Typography sx={styles.label}>Material</Typography>
//           <Typography sx={styles.value}>Stainless Steel</Typography>
//         </Box>

//         <Box sx={styles.divider} />

//         <Box sx={styles.attribute}>
//           <Typography sx={styles.label}>Brand</Typography>
//           <Typography sx={styles.value}>AQUASAFE</Typography>
//         </Box>

//         <Box sx={styles.divider} />

//         <Box sx={styles.attribute}>
//           <Typography sx={styles.label}>Stainless Steel Grade</Typography>
//           <Typography sx={styles.value}>301 Stainless Steel</Typography>
//         </Box>
//       </Box>

//       {/* LINKS */}
//       <Typography sx={styles.linkRow}>
//         See all details and dimensions <ExpandMoreIcon sx={{ fontSize: 16 }} />
//       </Typography>

//       <Typography sx={styles.storeInfo}>Store Information ›</Typography>

//       {/* MEDIA */}
//       {visibleMedia.map((item, i) => (
//         <Box key={i} sx={styles.mediaWrapper}>
//           {item.type === "video" ? (
//             <video controls style={styles.media} src={item.src} />
//           ) : (
//             <img src={item.src} style={styles.media} alt="product" />
//           )}

//           {!showAll && i === visibleMedia.length - 1 && media.length > 2 && (
//             <Box sx={styles.fadeOverlay}>
//               <button
//                 style={styles.seeMoreBtn}
//                 onClick={() => setShowAll(true)}
//               >
//                 See more <ExpandMoreIcon fontSize="small" />
//               </button>
//             </Box>
//           )}
//         </Box>
//       ))}
//     </Box>
//   );
// }

"use client";

import { useMemo, useState } from "react";

import { Box, Typography } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import styles from "./productMediaStyles";
import { marked } from "marked";
export default function ProductMedia({ product }) {
  // 🔥 Convert DB media format
  const media = useMemo(() => {
    if (!product?.media) return [];

    return product.media.map((item) => ({
      type: item.type,
      src: item.url,
    }));
  }, [product]);

  const [showAll, setShowAll] = useState(false);

  // 🔥 Show only first 2 initially
  const visibleMedia = showAll ? media : media.slice(0, 2);

  return (
    <Box sx={styles.container}>
      {/* HEADER */}

      <Box sx={styles.header}>
        <Typography sx={styles.title}>Product details</Typography>

        <Box sx={styles.headerActions}>
          <FavoriteBorderIcon sx={{ fontSize: 18 }} />
          Save | Report issue ›
        </Box>
      </Box>

      {/* ATTRIBUTES */}

      <Box sx={styles.attributesRow}>
        {/* BRAND */}

        <Box sx={styles.attribute}>
          <Typography sx={styles.label}>Brand</Typography>

          <Typography sx={styles.value}>
            {product?.brand_id?.name || "N/A"}
          </Typography>
        </Box>

        <Box sx={styles.divider} />

        {/* SKU */}

        <Box sx={styles.attribute}>
          <Typography sx={styles.label}>SKU</Typography>

          <Typography sx={styles.value}>{product?.sku || "N/A"}</Typography>
        </Box>

        <Box sx={styles.divider} />

        {/* STOCK */}

        <Box sx={styles.attribute}>
          <Typography sx={styles.label}>Stock</Typography>

          <Typography sx={styles.value}>
            {product?.in_stock ? "In Stock" : "Out of Stock"}
          </Typography>
        </Box>
      </Box>

      {/* DESCRIPTION */}

      <Box
        sx={styles.linkRow}
        dangerouslySetInnerHTML={{
          __html: marked.parse(
            product?.short_description || "No description available",
          ),
        }}
      />

      <ExpandMoreIcon sx={{ fontSize: 16 }} />

      {/* STORE */}

      <Typography sx={styles.storeInfo}>
        {product?.store_id?.name || "Store Information"} ›
      </Typography>

      {/* MEDIA */}

      {visibleMedia.map((item, i) => (
        <Box key={i} sx={styles.mediaWrapper}>
          {/* VIDEO */}

          {item.type === "video" ? (
            <video controls style={styles.media} src={item.src} />
          ) : (
            /* IMAGE */
            <img src={item.src} style={styles.media} alt="product" />
          )}

          {/* SEE MORE OVERLAY */}

          {!showAll && i === visibleMedia.length - 1 && media.length > 2 && (
            <Box sx={styles.fadeOverlay}>
              <button
                style={styles.seeMoreBtn}
                onClick={() => setShowAll(true)}
              >
                See more <ExpandMoreIcon fontSize="small" />
              </button>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
