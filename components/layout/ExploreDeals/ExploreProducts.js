// "use client";

// import { Box } from "@mui/material";
// import ProductCard from "./ProductCard";
// import styles from "./exploreProductsStyles";

// const products = [
//   {
//     img: "https://picsum.photos/300?6",
//     overlay: "4PCS",
//     badge1: "Easter Deal",
//     title: "[Portable Storage Boxes] 4pcs Toothpick Box",
//     description:
//       "Durable portable storage box set. Perfect for keeping toothpicks clean and organized.",
//     price: "$1.02",
//     old: "$3.29",
//     saved: "$0.11",
//     timer: "01:41:13",
//     sold: "34K+ sold",
//   },
//   {
//     img: "https://picsum.photos/300?7",
//     video: "https://cdn.pixabay.com/video/2026/01/28/330898_large.mp4",
//     badge1: "Easter Deal",
//     badge2: "Local",
//     title: "2025 Fall Winter Women's Hoodie",
//     description:
//       "Comfortable fleece hoodie designed for warmth and style.",
//     price: "$9.99",
//     sold: "377 sold",
//     brand: "FME",
//     delivery: true,
//   },
//   {
//     img: "https://picsum.photos/300?8",
//     badge1: "Group Buy",
//     badge2: "Local",
//     title: "Matured Chinese Tea Cake",
//     description:
//       "Traditional fermented Chinese tea cake with rich aroma.",
//     price: "$27.00",
//     old: "$100.00",
//     sold: "57 sold",
//   },

//     {
//     img: "https://picsum.photos/300?9",
//     overlay: "4PCS",
//     badge1: "Easter Deal",
//     title: "[Portable Storage Boxes] 4pcs Toothpick Box",
//     description:
//       "Durable portable storage box set. Perfect for keeping toothpicks clean and organized.",
//     price: "$1.02",
//     old: "$3.29",
//     saved: "$0.11",
//     timer: "01:41:13",
//     sold: "34K+ sold",
//   },
//   {
//     img: "https://picsum.photos/300?10",
//     video: "https://cdn.pixabay.com/video/2026/01/28/330898_large.mp4",
//     badge1: "Easter Deal",
//     badge2: "Local",
//     title: "2025 Fall Winter Women's Hoodie",
//     description:
//       "Comfortable fleece hoodie designed for warmth and style.",
//     price: "$9.99",
//     sold: "377 sold",
//     brand: "FME",
//     delivery: true,
//   },
//   {
//     img: "https://picsum.photos/300?11",
//     badge1: "Group Buy",
//     badge2: "Local",
//     title: "Matured Chinese Tea Cake",
//     description:
//       "Traditional fermented Chinese tea cake with rich aroma.",
//     price: "$27.00",
//     old: "$100.00",
//     sold: "57 sold",
//   },
//   {
//     img: "https://picsum.photos/300?12",
//     overlay: "4PCS",
//     badge1: "Easter Deal",
//     title: "[Portable Storage Boxes] 4pcs Toothpick Box",
//     description:
//       "Durable portable storage box set. Perfect for keeping toothpicks clean and organized.",
//     price: "$1.02",
//     old: "$3.29",
//     saved: "$0.11",
//     timer: "01:41:13",
//     sold: "34K+ sold",
//   },
//   {
//     img: "https://picsum.photos/300?13",
//     video: "https://cdn.pixabay.com/video/2026/01/28/330898_large.mp4",
//     badge1: "Easter Deal",
//     badge2: "Local",
//     title: "2025 Fall Winter Women's Hoodie",
//     description:
//       "Comfortable fleece hoodie designed for warmth and style.",
//     price: "$9.99",
//     sold: "377 sold",
//     brand: "FME",
//     delivery: true,
//   },
//   {
//     img: "https://picsum.photos/300?14",
//     badge1: "Group Buy",
//     badge2: "Local",
//     title: "Matured Chinese Tea Cake",
//     description:
//       "Traditional fermented Chinese tea cake with rich aroma.",
//     price: "$27.00",
//     old: "$100.00",
//     sold: "57 sold",
//   },

// ];

// export default function ExploreProducts( { itemsPerRow = 5 }   ) {
//   return (
//     <Box sx={styles.wrapper}>
//       <Box

//       //  sx={styles.grid}

//        sx={{
//           ...styles.grid, // keep your existing styles
//           gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`, // 👈 dynamic columns
//         }}

//       >
//         {products.map((product, index) => (
//           <ProductCard key={index} product={product} />
//         ))}
//       </Box>
//     </Box>
//   );
// }

"use client";

import { Box, Typography, Button } from "@mui/material";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton"; // ✅ IMPORT
import styles from "./exploreProductsStyles";
import { useEffect, useState } from "react";


export default function ExploreProducts({
  itemsPerRow = 5,
  selectedCategory,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 10;

  const fetchProducts = async (pageNumber = 1) => {
    try {
      setLoading(true);

      let url = `${process.env.API}/product?page=${pageNumber}&limit=${LIMIT}`;

      if (selectedCategory) {
        url += `&category=${selectedCategory}`; // ✅ filter
      }

      const res = await fetch(url);
      const data = await res.json();

      const formatted = data.map((item) => {
        const video = item.media?.find((m) => m.type === "video");
        const image = item.media?.find((m) => m.type === "image");

        return {
          img: image?.url || "https://via.placeholder.com/300",
          video: video?.url || null,
          title: item.name,
          description: item.name,
          price: `$${item.special_price || item.price || 0}`,
          old: item.special_price ? `$${item.price}` : null,
          sold: `${item.viewed || 0} sold`,
          brand: item.brand_id?.name || null,
          slug: item.slug,
          badge1: "Easter Deal",
          badge2: item.in_stock ? "In Stock" : "Out of Stock",
          delivery: true,
        };
      });

      setProducts((prev) =>
        pageNumber === 1 ? formatted : [...prev, ...formatted]
      );

      if (formatted.length < LIMIT) setHasMore(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 reload when category changes
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1);
  }, [selectedCategory || ""]);

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchProducts(next);
  };

  return (
    <Box sx={styles.wrapper}>
      <Box
        sx={{
          ...styles.grid,
          gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
        }}
      >
        {loading && products.length === 0
          ? Array.from({ length: itemsPerRow * 2 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products.map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
      </Box>

      {loading && products.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
            gap: 2,
            mt: 2,
          }}
        >
          {Array.from({ length: itemsPerRow }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </Box>
      )}

      {!loading && hasMore && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button variant="contained" onClick={handleLoadMore}>
            Load More
          </Button>
        </Box>
      )}

      {!hasMore && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography>You’ve reached the end</Typography>
        </Box>
      )}
    </Box>
  );
}