// "use client";

// import { Box, Typography } from "@mui/material";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { useEffect, useRef, useState } from "react";
// import styles from "./categoryExploreStyles";

// const categories = [
//   "Sports & Outdoors",
//   "Women's Clothing",
//   "Kids' Fashion",
//   "Office & School Supplies",
//   "Jewelry & Accessories",
//   "Cell Phones & Accessories",
//   "Home & Kitchen",
//   "Men's Clothing",
//   "Men's Big & Tall",
//   "Books & Media",
//   "Sports & Outdoors",
//   "Women's Clothing",
//   "Kids' Fashion",
//   "Office & School Supplies",
//   "Jewelry & Accessories",
//   "Cell Phones & Accessories",
//   "Home & Kitchen",
//   "Men's Clothing",
//   "Men's Big & Tall",
//   "Books & Media",
// ];

// export default function CategoryExplore() {
//   const scrollRef = useRef(null);

//   const [showLeft, setShowLeft] = useState(false);
//   const [showRight, setShowRight] = useState(true);

//   const checkArrows = () => {
//     const el = scrollRef.current;

//     if (!el) return;

//     setShowLeft(el.scrollLeft > 0);

//     setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
//   };

//   useEffect(() => {
//     checkArrows();

//     const el = scrollRef.current;
//     el.addEventListener("scroll", checkArrows);

//     return () => el.removeEventListener("scroll", checkArrows);
//   }, []);

//   const scroll = (dir) => {
//     const el = scrollRef.current;

//     el.scrollBy({
//       left: dir === "left" ? -300 : 300,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <Box sx={styles.wrapper}>
//       <Typography sx={styles.title}>🥚 EARLY EASTER DEALS 🥚</Typography>

//       <Typography sx={styles.subtitle}>EXPLORE YOUR INTERESTS</Typography>

//       <Box sx={styles.sliderWrapper}>
//         {showLeft && (
//           <Box
//             sx={{ ...styles.arrow, ...styles.leftArrow }}
//             onClick={() => scroll("left")}
//           >
//             <ArrowBackIosIcon fontSize="small" />
//           </Box>
//         )}

//         <Box ref={scrollRef} sx={styles.scrollArea}>
//           {categories.map((item, i) => (
//             <Box key={i} sx={styles.pill}>
//               {item}
//             </Box>
//           ))}
//         </Box>

//         {showRight && (
//           <Box
//             sx={{ ...styles.arrow, ...styles.rightArrow }}
//             onClick={() => scroll("right")}
//           >
//             <ArrowForwardIosIcon fontSize="small" />
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// }







"use client";

import { Box, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useRef, useState } from "react";
import styles from "./categoryExploreStyles";

export default function CategoryExplore({
  onSelectCategory,
  selectedCategory,
}) {
  const scrollRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkArrows = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.API}/category`);
        const data = await res.json();

        if (data.success) {
          const active = data.data.filter((cat) => cat.is_active);
          setCategories(active);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    checkArrows();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkArrows);
    return () => el.removeEventListener("scroll", checkArrows);
  }, [categories]);

  const scroll = (dir) => {
    const el = scrollRef.current;

    el.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={styles.wrapper}>
      <Typography sx={styles.title}>🥚 EARLY EASTER DEALS 🥚</Typography>
      <Typography sx={styles.subtitle}>EXPLORE YOUR INTERESTS</Typography>

      <Box sx={styles.sliderWrapper}>
        {showLeft && (
          <Box
            sx={{ ...styles.arrow, ...styles.leftArrow }}
            onClick={() => scroll("left")}
          >
            <ArrowBackIosIcon fontSize="small" />
          </Box>
        )}

        <Box ref={scrollRef} sx={styles.scrollArea}>
          {categories.map((cat) => (
            <Box
              key={cat._id}
              onClick={() => onSelectCategory(cat.slug)} // ✅ use slug
              sx={{
                ...styles.pill,
                cursor: "pointer",
                background:
                  selectedCategory === cat.slug ? "#000" : "#f5f5f5",
                color:
                  selectedCategory === cat.slug ? "#fff" : "#000",
              }}
            >
              {cat.name}
            </Box>
          ))}
        </Box>

        {showRight && (
          <Box
            sx={{ ...styles.arrow, ...styles.rightArrow }}
            onClick={() => scroll("right")}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </Box>
        )}
      </Box>
    </Box>
  );
}