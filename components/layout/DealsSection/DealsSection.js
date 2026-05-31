// "use client";

// import { Box, Typography } from "@mui/material";
// import { useRouter } from "next/navigation";
// import BoltIcon from "@mui/icons-material/Bolt";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// import styles from "./dealsStyles";

// const products = [
//   {
//     img: "https://picsum.photos/300?1",
//     price: "$2.68",
//     old: "$17.99",
//     extra: "-86% limited time",
//   },
//   {
//     img: "https://picsum.photos/300?2",
//     price: "$1.79",
//     old: "$12.97",
//     extra: "-86% limited time",
//   },
//   {
//     img: "https://picsum.photos/300?3",
//     price: "$1.69",
//     old: "$8.10",
//     extra: "-79% limited time",
//   },
//   {
//     img: "https://picsum.photos/300?4",
//     price: "$2.83",
//     old: "$7.99",
//     rating: "★★★★★ 2,080",
//   },
//   {
//     img: "https://picsum.photos/300?5",
//     price: "$2.86",
//     old: "$3.05",
//     rating: "★★★★★ 168",
//   },
//   {
//     img: "https://picsum.photos/300?6",
//     price: "$0.89",
//     old: "$5.10",
//     rating: "★★★★★ 77",
//     badge: "LAST 7 AT PROMO PRICE",
//   },
// ];

// export default function Deals() {
//   const router = useRouter();

//   return (
//     <Box sx={styles.wrapper}>
//       {/* HEADER */}
//       <Box sx={styles.headerRow}>
//         <Typography sx={{ ...styles.title, ...styles.lightning }}>
//           <BoltIcon fontSize="large" />
//           LIGHTNING DEALS
//         </Typography>

//         <Typography
//           sx={styles.subText}
//           onClick={() => router.push("/lightning-deals")}
//         >
//           Limited time offer
//           <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
//         </Typography>

//         <Typography sx={{ ...styles.title, ...styles.clearance }}>
//           CLEARANCE DEALS
//         </Typography>

//         <Typography
//           sx={styles.subText}
//           onClick={() => router.push("/clearance-deals")}
//         >
//           Limited stock
//           <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
//         </Typography>
//       </Box>

//       {/* GRID */}
//       <Box sx={styles.grid}>
//         {products.map((p, i) => (
//           <Box key={i} sx={styles.card}>
//             <Box
//               sx={{
//                 ...styles.imageWrapper,
//                 ...styles.imageWrapperHover,
//               }}
//             >
//               <img src={p.img} style={styles.image} />

//               {p.badge && <Box sx={styles.badge}>{p.badge}</Box>}
//             </Box>

//             <Box sx={styles.priceRow}>
//               <Typography sx={styles.price}>{p.price}</Typography>
//               <Typography sx={styles.oldPrice}>{p.old}</Typography>
//             </Box>

//             {p.extra && <Typography sx={styles.discount}>{p.extra}</Typography>}

//             {p.rating && <Typography sx={styles.rating}>{p.rating}</Typography>}
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// }













"use client";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import BoltIcon from "@mui/icons-material/Bolt";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";

import styles from "./dealsStyles";

export default function Deals() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  // ✅ fetch products
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch(`${process.env.API}/product?page=1&limit=6`);
        const data = await res.json();

        const formatted = data.map((item) => {
          const image = item.media?.find((m) => m.type === "image");

          return {
            img: image?.url || "https://via.placeholder.com/300",

            price: `$${item.special_price || item.price || 0}`,
            old: item.special_price ? `$${item.price}` : null,
            slug: item.slug,
            // optional UI mapping
            extra: item.special_price
              ? `-${Math.round(
                  ((item.price - item.special_price) / item.price) * 100,
                )}% limited time`
              : null,

            rating: item.viewed ? `★★★★★ ${item.viewed}` : null,

            badge: item.qty && item.qty < 10 ? "LAST ITEMS LEFT" : null,
          };
        });

        setProducts(formatted);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    fetchDeals();
  }, []);

  return (
    <Box sx={styles.wrapper}>
      {/* HEADER */}
      <Box sx={styles.headerRow}>
        <Typography sx={{ ...styles.title, ...styles.lightning }}>
          <BoltIcon fontSize="large" />
          LIGHTNING DEALS
        </Typography>

        <Typography
          sx={styles.subText}
          onClick={() => router.push("/lightning-deals")}
        >
          Limited time offer
          <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
        </Typography>

        <Typography sx={{ ...styles.title, ...styles.clearance }}>
          CLEARANCE DEALS
        </Typography>

        <Typography
          sx={styles.subText}
          onClick={() => router.push("/clearance-deals")}
        >
          Limited stock
          <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
        </Typography>
      </Box>

      {/* GRID */}
      <Box sx={styles.grid}>
        {products.map((p, i) => (
          <Box
            key={i}
            sx={{ ...styles.card, cursor: "pointer" }}
            onClick={() => {
              if (p.slug) {
                router.push(`/productdetails/${p.slug}`); // ✅ redirect
              }
            }}
          >
            <Box
              sx={{
                ...styles.imageWrapper,
                ...styles.imageWrapperHover,
              }}
            >
              <img src={p.img} style={styles.image} />

              {p.badge && <Box sx={styles.badge}>{p.badge}</Box>}
            </Box>

            <Box sx={styles.priceRow}>
              <Typography sx={styles.price}>{p.price}</Typography>
              {p.old && <Typography sx={styles.oldPrice}>{p.old}</Typography>}
            </Box>

            {p.extra && <Typography sx={styles.discount}>{p.extra}</Typography>}

            {p.rating && <Typography sx={styles.rating}>{p.rating}</Typography>}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
