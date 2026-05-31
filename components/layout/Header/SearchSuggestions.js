"use client";

import { Box, Typography } from "@mui/material";
import styles from "./searchSuggestionsStyles";

const suggestions = [
  { text: "cars accessories", img: "/images/img1.avif" },
  { text: "cooking accessories", img: "/images/img1.avif" },
  { text: "car accessories interior", img: "/images/img1.avif" },
  { text: "cooking", img: "/images/img1.avif" },
  { text: "vegetable slicer and chopper", img: "/images/img1.avif" },
  { text: "bottle cap opener", img: "/images/img1.avif" },
  { text: "car pillow", img: "/images/img1.avif" },
  { text: "jar lid opener", img: "/images/img1.avif" },
  { text: "bathroom accessories", img: "/images/img1.avif" },
  { text: "seniors assistance products", img: "/images/img1.avif" },
];

export default function SearchSuggestions() {
  return (
    <Box sx={styles.menuWrapper}>
      <Box sx={styles.arrow} />

      <Box sx={styles.menu}>
        <Typography sx={styles.title}>Popular right now</Typography>

        <Box sx={styles.tagsWrapper}>
          {suggestions.map((item, i) => (
            <Box key={i} sx={styles.tag}>
              <Box component="img" src={item.img} sx={styles.tagImg} />
              {item.text}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}