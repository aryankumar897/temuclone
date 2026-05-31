// "use client";

// import { useState } from "react";
// import { Box, Typography } from "@mui/material";
// import styles from "./categoriesMenuStyles";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import { useRouter } from "next/navigation";

// // ✅ SLUG FUNCTION (added)
// const slugify = (text) =>
//   text
//     .toLowerCase()
//     .replace(/&/g, "and")
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-");

// const categories = [
//   "Featured",
//   "Electronics",
//   "Mobiles & Tablets",
//   "Computers & Accessories",
//   "Home & Kitchen",
//   "Women's Clothing",
//   "Women's Shoes",
//   "Men's Clothing",
//   "Men's Shoes",
//   "Sports & Outdoors",
//   "Jewelry & Accessories",
//   "Beauty & Health",
//   "Toys & Games",
//   "Books & Stationery",
//   "Automotive",
//   "Grocery & Essentials",
//   "Pet Supplies",
// ];

// /* CATEGORY → ITEMS DATA */

// const categoryItems = {
//   Featured: [
//     "Trending Products",
//     "Best Sellers",
//     "Top Deals",
//     "Editor's Picks",
//     "New Arrivals",
//     "Limited Time Offers",
//     "Clearance Sale",
//   ],

//   Electronics: [
//     "Smart TVs",
//     "Bluetooth Speakers",
//     "Headphones",
//     "Cameras",
//     "Smart Watches",
//     "Gaming Consoles",
//     "Projectors",
//   ],

//   "Mobiles & Tablets": [
//     "Android Phones",
//     "iPhones",
//     "Tablets",
//     "Mobile Accessories",
//     "Power Banks",
//     "Wireless Chargers",
//   ],

//   "Computers & Accessories": [
//     "Laptops",
//     "Keyboards",
//     "Mouse",
//     "Laptop Bags",
//     "Monitors",
//     "External Hard Drives",
//     "USB Hubs",
//   ],

//   "Home & Kitchen": [
//     "Kitchen Utensils",
//     "Dining & Entertaining",
//     "Home Decor",
//     "Bedroom Furniture",
//     "Living Room Furniture",
//     "Bath Fixtures",
//     "Storage & Organization",
//     "Lighting",
//   ],

//   "Women's Clothing": [
//     "Women's Dresses",
//     "Women's Tops",
//     "Women's Jeans",
//     "Women's Jackets",
//     "Women's Ethnic Wear",
//     "Women's Nightwear",
//   ],

//   "Women's Shoes": [
//     "High Heels",
//     "Sneakers",
//     "Sandals",
//     "Boots",
//     "Flats",
//     "Sports Shoes",
//   ],

//   "Men's Clothing": [
//     "Men's Jackets",
//     "Men's Shirts",
//     "Men's Jeans",
//     "Men's T-Shirts",
//     "Men's Hoodies",
//     "Men's Ethnic Wear",
//   ],

//   "Men's Shoes": [
//     "Formal Shoes",
//     "Casual Shoes",
//     "Sneakers",
//     "Sports Shoes",
//     "Boots",
//     "Sandals",
//   ],

//   "Sports & Outdoors": [
//     "Camping Gear",
//     "Fitness Equipment",
//     "Cycling Accessories",
//     "Hiking Tools",
//     "Yoga Mats",
//     "Sports Clothing",
//   ],

//   "Jewelry & Accessories": [
//     "Women's Jewelry",
//     "Necklaces",
//     "Bracelets",
//     "Rings",
//     "Watches",
//     "Sunglasses",
//   ],

//   "Beauty & Health": [
//     "Electric Massagers",
//     "Skin Care",
//     "Hair Care",
//     "Makeup",
//     "Beauty Tools",
//     "Health Supplements",
//   ],

//   "Toys & Games": [
//     "Educational Toys",
//     "Remote Control Toys",
//     "Board Games",
//     "Building Blocks",
//     "Outdoor Toys",
//   ],

//   "Books & Stationery": [
//     "Academic Books",
//     "Novels",
//     "Notebooks",
//     "Pens & Markers",
//     "Art Supplies",
//   ],

//   Automotive: [
//     "Car Accessories",
//     "Bike Accessories",
//     "Car Electronics",
//     "Helmet & Riding Gear",
//     "Car Cleaning Tools",
//   ],

//   "Grocery & Essentials": [
//     "Snacks",
//     "Beverages",
//     "Cooking Oils",
//     "Rice & Grains",
//     "Household Supplies",
//   ],

//   "Pet Supplies": [
//     "Dog Food",
//     "Cat Food",
//     "Pet Toys",
//     "Pet Grooming",
//     "Pet Beds",
//   ],
// };

// export default function CategoriesMenu() {
//   const [activeCategory, setActiveCategory] = useState("Featured");
//   const router = useRouter();

//   return (
//     <Box sx={styles.menuWrapper}>
//       <Box sx={styles.arrow} />

//       <Box sx={styles.menu}>
//         {/* LEFT SIDEBAR */}
//         <Box sx={styles.sidebar}>
//           {categories.map((cat, i) => (
//             <Box
//               key={i}
//               sx={{
//                 ...styles.sidebarItem,
//                 background: activeCategory === cat ? "#f5f5f5" : "transparent",
//                 fontWeight: activeCategory === cat ? 600 : 400,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//               onMouseEnter={() => setActiveCategory(cat)}
//             >
//               {cat}
//               <KeyboardArrowRightIcon sx={{ fontSize: 18, color: "#888" }} />
//             </Box>
//           ))}
//         </Box>

//         {/* RIGHT SIDE */}
//         <Box sx={{ flex: 1, padding: "24px" }}>
//           {/* CATEGORY TITLE */}
//           <Box
//             onClick={() =>
//              router.push(`/category?cat=${slugify(activeCategory)}`)
//             }
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: "6px",
//               fontWeight: 200,
//               fontSize: "16px",
//               marginBottom: "3px",
//               cursor: "pointer",
//               color: "black",
//               width: "fit-content",

//               "&:hover .categoryText": {
//                 textDecoration: "underline",
//               },
//             }}
//           >
//             <Typography
//               className="categoryText"
//               sx={{
//                 fontWeight: 300,
//                 fontSize: "16px",
//               }}
//             >
//               All {activeCategory}
//             </Typography>

//             <KeyboardArrowRightIcon />
//           </Box>

//           {/* GRID */}
//           <Box sx={styles.gridSection}>
//             {categoryItems[activeCategory]?.map((item, i) => (
//               <Box
//                 key={i}
//                 sx={{ ...styles.card, cursor: "pointer" }}
//                 onClick={() =>
//                   router.push(
//                       `/category?cat=${slugify(activeCategory)}&sub=${slugify(item)}`
//                   )
//                 }
//               >
//                 <Box
//                   component="img"
//                   src="/images/img1.avif"
//                   sx={styles.image}
//                 />

//                 <Typography sx={styles.text}>{item}</Typography>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }





"use client";

import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import styles from "./categoriesMenuStyles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/navigation";

// slug
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export default function CategoriesMenu() {
  const [categories, setCategories] = useState([]);
  const [categoryItems, setCategoryItems] = useState({});
  const [activeCategory, setActiveCategory] = useState("");

  const router = useRouter();

  // 🔥 FETCH FROM DB
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.API}/header/categories`);
        const result = await res.json();

        if (!result.success) return;

        const data = result.data;

        // sidebar categories
        const catNames = data.map((cat) => cat.name);

        // map children + images
        const itemsMap = {};

        data.forEach((cat) => {
          itemsMap[cat.name] =
            cat.children?.map((child) => ({
              name: child.name,
              slug: child.slug,
              image: child.image, // 🔥 from category
            })) || [];
        });

        setCategories(catNames);
        setCategoryItems(itemsMap);

        if (catNames.length > 0) {
          setActiveCategory(catNames[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Box sx={styles.menuWrapper}>
      <Box sx={styles.arrow} />

      <Box sx={styles.menu}>
        {/* LEFT SIDEBAR */}
        <Box sx={styles.sidebar}>
          {categories.map((cat, i) => (
            <Box
              key={i}
              sx={{
                ...styles.sidebarItem,
                background:
                  activeCategory === cat ? "#f5f5f5" : "transparent",
                fontWeight: activeCategory === cat ? 600 : 400,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onMouseEnter={() => setActiveCategory(cat)}
            >
              {cat}
              <KeyboardArrowRightIcon sx={{ fontSize: 18, color: "#888" }} />
            </Box>
          ))}
        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{ flex: 1, padding: "24px" }}>
          {/* CATEGORY TITLE */}
          <Box
            onClick={() =>
              router.push(`/category/${slugify(activeCategory)}`)
            }
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontWeight: 200,
              fontSize: "16px",
              marginBottom: "3px",
              cursor: "pointer",
              color: "black",
              width: "fit-content",

              "&:hover .categoryText": {
                textDecoration: "underline",
              },
            }}
          >
            <Typography
              className="categoryText"
              sx={{
                fontWeight: 300,
                fontSize: "16px",
              }}
            >
              All {activeCategory}
            </Typography>

            <KeyboardArrowRightIcon />
          </Box>

          {/* GRID */}
          <Box sx={styles.gridSection}>
            {categoryItems[activeCategory]?.map((item, i) => (
              <Box
                key={i}
                sx={{ ...styles.card, cursor: "pointer" }}
                onClick={() =>
                  router.push(`/category?cat=${item.slug}`)
                }
              >
                {/* 🔥 IMAGE FROM CATEGORY */}
                <Box
                  component="img"
                  src={item.image || "/images/img1.avif"}
                  sx={styles.image}
                />

                <Typography sx={styles.text}>
                  {item.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}