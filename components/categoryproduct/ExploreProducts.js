// "use client";

// import { Box, Typography } from "@mui/material";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import StarIcon from "@mui/icons-material/Star";
// import BoltIcon from "@mui/icons-material/Bolt";
// import { useRef } from "react";

// import styles from "./exploreProductsStyles";

// const products = [
//   {
//     img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
//     overlay: "4PCS",
//     badge1: "Easter Deal",
//     title: "[Portable Storage Boxes] 4pcs Toothpick Box",
//     description:
//       "Durable portable storage box set. Perfect for keeping toothpicks clean and organized in kitchen or travel.",
//     price: "$1.02",
//     old: "$3.29",
//     saved: "$0.11",
//     timer: "01:41:13",
//     sold: "34K+ sold",
//   },

//   {
//     img: "https://images.unsplash.com/photo-1604654894610-df63bc536371",
//     video: "https://cdn.pixabay.com/video/2026/01/28/330898_large.mp4",
//     badge1: "Easter Deal",
//     badge2: "Local",
//     title: "2025 Fall Winter Women's Hoodie",
//     description:
//       "Comfortable fleece hoodie designed for warmth and style during winter season.",
//     price: "$9.99",
//     sold: "377 sold",
//     brand: "FME",
//     delivery: true,
//   },

//   {
//     img: "https://images.unsplash.com/photo-1604654894610-df63bc536371",
//     video: "https://cdn.pixabay.com/video/2026/01/28/330898_large.mp4",
//     title: "Flower Engraved Band Compatible with Apple Watch",
//     description:
//       "Premium engraved Apple Watch band designed with elegant floral pattern.",
//     price: "$2.12",
//     saved: "$0.52",
//     timer: "01:41:13",
//     sold: "7.7K+ sold",
//     brand: "SONGSIER",
//   },

//   {
//     img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
//     badge1: "Group Buy",
//     badge2: "Local",
//     title: "Matured Chinese Tea Cake",
//     description:
//       "Traditional fermented Chinese tea cake with rich aroma and smooth flavor.",
//     price: "$27.00",
//     old: "$100.00",
//     sold: "57 sold",
//   },

//   {
//     img: "https://images.unsplash.com/photo-1604654894610-df63bc536371",
//     title: "1pc 5D Embossed Green Vine Nail Art",
//     description:
//       "Luxury 5D embossed nail art stickers perfect for professional manicure design.",
//     price: "$1.44",
//     old: "$11.71",
//     saved: "$0.07",
//     timer: "11:32:28",
//     sold: "21K+ sold",
//   },

// ];

// export default function ExploreProducts() {
//   return (
//     <Box sx={styles.wrapper}>
//       <Box sx={styles.grid}>
//         {products.map((p, i) => {
//           const videoRef = useRef(null);

//           const playVideo = () => {
//             const video = videoRef.current;
//             if (!video) return;

//             video.style.opacity = 1;

//             const playPromise = video.play();
//             if (playPromise !== undefined) {
//               playPromise.catch(() => {});
//             }
//           };

//           const stopVideo = () => {
//             const video = videoRef.current;
//             if (!video) return;

//             video.pause();
//             video.currentTime = 0;
//             video.style.opacity = 0;
//           };

//           return (
//             <Box key={i} sx={styles.card}>
//               {/* MEDIA */}
//               <Box
//                 sx={styles.imageWrapper}
//                 onMouseEnter={playVideo}
//                 onMouseLeave={stopVideo}
//               >
//                 <img src={p.img} style={styles.image} />

//                 {p.video && (
//                   <>
//                     <video
//                       ref={videoRef}
//                       src={p.video}
//                       muted
//                       loop
//                       style={styles.video}
//                     />

//                     <Box sx={styles.playIcon}>
//                       <PlayArrowIcon fontSize="small" />
//                     </Box>
//                   </>
//                 )}

//                 {p.overlay && <Box sx={styles.overlay}>{p.overlay}</Box>}
//               </Box>

//               {/* TOOLTIP DESCRIPTION */}
//               <Box className="tooltip" sx={styles.tooltip}>
//                 {p.description}
//               </Box>

//               {/* BADGES */}
//               <Box sx={styles.badgeRow}>
//                 {p.badge1 && (
//                   <Box sx={{ ...styles.badge, ...styles.easter }}>
//                     {p.badge1}
//                   </Box>
//                 )}
//                 {p.badge2 && (
//                   <Box sx={{ ...styles.badge, ...styles.local }}>
//                     {p.badge2}
//                   </Box>
//                 )}
//               </Box>

//               <Typography sx={styles.title}>{p.title}</Typography>

//               {/* PRICE */}
//               <Box sx={styles.priceRow}>
//                 <Typography sx={styles.lastDay}>LAST DAY</Typography>
//                 <Typography sx={styles.price}>{p.price}</Typography>
//                 {p.old && <Typography sx={styles.oldPrice}>{p.old}</Typography>}
//               </Box>

//               {/* CART */}
//               <Box sx={styles.cart}>
//                 <ShoppingCartIcon fontSize="small" />
//               </Box>

//               {/* SAVE */}
//               {p.saved && (
//                 <Box sx={styles.saveRow}>
//                   <Box sx={styles.saveBadge}>
//                     <BoltIcon sx={{ fontSize: 14 }} /> Saved {p.saved}
//                   </Box>
//                   <Box sx={styles.timer}>{p.timer}</Box>
//                 </Box>
//               )}

//               <Typography sx={styles.promoText}>
//                 BEST-SELLING ITEM | Last 6 months
//               </Typography>

//               {/* RATING */}
//               <Box sx={styles.ratingRow}>
//                 <StarIcon sx={{ fontSize: 16 }} />
//                 <StarIcon sx={{ fontSize: 16 }} />
//                 <StarIcon sx={{ fontSize: 16 }} />
//                 <StarIcon sx={{ fontSize: 16 }} />
//                 <Typography>{p.sold}</Typography>
//               </Box>

//               {p.brand && (
//                 <Box sx={styles.storeRow}>
//                   <Box sx={styles.starStore}>Star store</Box>
//                   <Box sx={styles.brand}>Brand: {p.brand}</Box>
//                 </Box>
//               )}

//               {p.delivery && (
//                 <Typography sx={styles.delivery}>
//                   Arrives in 2+ business days
//                 </Typography>
//               )}
//             </Box>
//           );
//         })}
//       </Box>
//     </Box>
//   );
// }


"use client";

import {
  Box,
  Typography,
} from "@mui/material";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import styles from "./exploreProductsStyles";

import ProductCard from "./ProductCard";

export default function ExploreProducts({
  searchParams,
}) {
  const category =
    searchParams.get("cat");

  /* =========================
     FILTERS FROM URL
  ========================= */
  const filters = useMemo(() => {
    const obj = {};

    if (!searchParams) return obj;

    for (const key of searchParams.keys()) {
      obj[key] =
        searchParams
          .get(key)
          ?.split(",") || [];
    }

    return obj;
  }, [searchParams]);

  /* =========================
     PRODUCTS
  ========================= */
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================
     FETCH PRODUCTS
  ========================= */
  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.API}/category-products?cat=${category}`,
        );

        const data = await res.json();

        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  /* =========================
     FILTER PRODUCTS
  ========================= */
 const filteredProducts = useMemo(() => {

  return products.filter((product) => {

    return Object.entries(filters).every(
      ([key, values]) => {

        /* IGNORE URL PARAMS */
        if (
          key === "cat" ||
          key === "sub"
        ) {
          return true;
        }

        const productValue =
          product.attributes?.[key];

        /* PRODUCT DOES NOT HAVE ATTRIBUTE */
        if (!productValue) {
          return false;
        }

        /* ARRAY MATCH */
        if (Array.isArray(productValue)) {

          return values.some((selected) =>
            productValue.includes(selected)
          );
        }

        /* SINGLE VALUE MATCH */
        return values.includes(
          productValue,
        );
      },
    );
  });

}, [products, filters]);
  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        Loading products...
      </Box>
    );
  }

  /* =========================
     UI
  ========================= */
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.grid}>
        {filteredProducts.length ===
          0 && (
          <Typography sx={{ p: 3 }}>
            No products found 😢
          </Typography>
        )}

        {filteredProducts.map((p) => (
          <ProductCard
            key={p._id}
            p={p}
            styles={styles}
          />
        ))}
      </Box>
    </Box>
  );
}