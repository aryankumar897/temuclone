// "use client";

// import { Box, Typography } from "@mui/material";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// import { useEffect, useRef, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import ExploreProducts from "./ExploreProducts";
// import FilterDrawer from "./FilterDrawer";
// import { styles as s } from "./categoryExploreStyles";

// const filters = [
//   "Filters",
//   "Sort by: Relevance",
//   "Color",
//   "Price",
//   "Rating",
//   "Material",
//   "Holidays",
//   "Stainless Steel Grade",
//   "Can Be Used For Food Contact",
//   "Brand",
//   "Power Supply",
//   "Item Shape",
//   "Cover Material",
// ];

// const filterOptions = {
//   Material: [
//     "Stainless Steel",
//     "Plastic",
//     "Silicone",
//     "Metal",
//     "Wood",
//     "Bamboo",
//     "Glass",
//     "Ceramic",
//   ],
//   Color: ["Red", "Blue", "Black", "White", "Green", "Yellow"],
//   Brand: ["Nike", "Adidas", "Puma"],
//   Price: ["Under $6", "$6 - $13", "$13 - $32", "Over $32"],
//   Rating: ["4+", "3+", "2+"],
// };

// export default function CategoryExplore() {
//   const scrollRef = useRef(null);
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [showLeft, setShowLeft] = useState(false);
//   const [showRight, setShowRight] = useState(true);

//   const [activeFilter, setActiveFilter] = useState(null);
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const [openDrawer, setOpenDrawer] = useState(false);
//   const format = (text) =>
//     text?.replace(/-/g, " ")?.replace(/\b\w/g, (c) => c.toUpperCase());

//   const category = searchParams.get("cat");
//   const subcategory = searchParams.get("sub");
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

//   // ✅ URL → dropdown sync
//   useEffect(() => {
//     if (!activeFilter) return;

//     const key = activeFilter.toLowerCase();
//     const values = searchParams.get(key);

//     if (values) {
//       setSelectedOptions(values.split(","));
//     } else {
//       setSelectedOptions([]);
//     }
//   }, [searchParams, activeFilter]);

//   return (
//     <Box sx={s.container}>
//       {/* BREADCRUMB */}
//       <Typography sx={s.breadcrumb}>
//         Home
//         {category && ` › ${format(category)}`}
//         {subcategory && ` › ${format(subcategory)}`}
//       </Typography>

//       {/* FILTER BAR */}
//       <Box sx={s.filterBarWrapper}>
//         {showLeft && (
//           <Box
//             onClick={() => scroll("left")}
//             sx={{ ...s.arrowBtn, ...s.leftArrow }}
//           >
//             <ArrowBackIosIcon fontSize="small" />
//           </Box>
//         )}

//         <Box ref={scrollRef} sx={s.scrollContainer}>
//           {filters.map((item, i) => (
//             <Box
//               key={i}
//               onClick={() => {
//                 if (item === "Filters") {
//                   setOpenDrawer(true);
//                 } else {
//                   setActiveFilter(activeFilter === item ? null : item);
//                 }
//               }}
//               sx={s.filterItem(activeFilter === item)}
//             >
//               {item}
//               {item !== "Filters" && (
//                 <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
//               )}
//             </Box>
//           ))}
//         </Box>

//         {showRight && (
//           <Box
//             onClick={() => scroll("right")}
//             sx={{ ...s.arrowBtn, ...s.rightArrow }}
//           >
//             <ArrowForwardIosIcon fontSize="small" />
//           </Box>
//         )}
//       </Box>

//       {/* DROPDOWN */}
//       {activeFilter && (
//         <Box sx={s.dropdown}>
//           <Typography sx={s.dropdownTitle}>{activeFilter}</Typography>

//           <Box sx={s.optionsWrap}>
//             {(filterOptions[activeFilter] || ["Option 1"]).map((opt, i) => {
//               const isSelected = selectedOptions.includes(opt);

//               return (
//                 <Box
//                   key={i}
//                   onClick={() => {
//                     if (isSelected) {
//                       setSelectedOptions(
//                         selectedOptions.filter((o) => o !== opt),
//                       );
//                     } else {
//                       setSelectedOptions([...selectedOptions, opt]);
//                     }
//                   }}
//                   sx={s.option(isSelected)}
//                 >
//                   {opt}
//                 </Box>
//               );
//             })}
//           </Box>

//           {/* ACTIONS */}
//           <Box sx={s.actions}>
//             <Box onClick={() => setSelectedOptions([])} sx={s.resetBtn}>
//               Reset
//             </Box>

//             <Box
//               onClick={() => {
//                 const query = new URLSearchParams(searchParams.toString());
//                 const key = activeFilter.toLowerCase();

//                 if (selectedOptions.length) {
//                   query.set(key, selectedOptions.join(","));
//                 } else {
//                   query.delete(key);
//                 }

//                 router.push(`/category?${query.toString()}`);
//                 setActiveFilter(null);
//               }}
//               sx={s.applyBtn}
//             >
//               Show {selectedOptions.length || 1000}+ results
//             </Box>
//           </Box>
//         </Box>
//       )}

//       {/* DRAWER */}
//       <FilterDrawer
//         open={openDrawer}
//         onClose={() => setOpenDrawer(false)}
//         filters={filters}
//         filterOptions={filterOptions}
//       />
//       <ExploreProducts searchParams={searchParams} />
//     </Box>
//   );
// }

"use client";

import { Box, Typography } from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useEffect, useRef, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import ExploreProducts from "./ExploreProducts";
import FilterDrawer from "./FilterDrawer";

import { styles as s } from "./categoryExploreStyles";

export default function CategoryExplore() {
  const scrollRef = useRef(null);

  const router = useRouter();

  const searchParams = useSearchParams();

  const category = searchParams.get("cat");

  const subcategory = searchParams.get("sub");

  const [showLeft, setShowLeft] = useState(false);

  const [showRight, setShowRight] = useState(true);

  const [activeFilter, setActiveFilter] = useState(null);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const [openDrawer, setOpenDrawer] = useState(false);

  /* =========================
     DYNAMIC FILTERS
  ========================= */
  const [filters, setFilters] = useState([]);

  const [filterOptions, setFilterOptions] = useState({});

  /* =========================
     FORMAT TEXT
  ========================= */
  const format = (text) =>
    text?.replace(/-/g, " ")?.replace(/\b\w/g, (c) => c.toUpperCase());

  /* =========================
     FETCH CATEGORY FILTERS
  ========================= */
  useEffect(() => {
    if (!category) return;

    const fetchCategoryData = async () => {
      try {
        const res = await fetch(
          `/api/category-products?cat=${category}`,
        );

        const data = await res.json();

        if (data.success) {
          const dynamicFilters =
            Object.keys(data.filters);

          setFilters([
            "Filters",
            "Sort by: Relevance",
            ...dynamicFilters,
          ]);

          setFilterOptions(data.filters);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategoryData();
  }, [category]);


  /* =========================
     ARROWS
  ========================= */
  const checkArrows = () => {
    const el = scrollRef.current;

    if (!el) return;

    setShowLeft(el.scrollLeft > 0);

    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    checkArrows();

    const el = scrollRef.current;

    if (!el) return;

    el.addEventListener("scroll", checkArrows);

    return () => el.removeEventListener("scroll", checkArrows);
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;

    if (!el) return;

    el.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  /* =========================
     URL → DROPDOWN SYNC
  ========================= */
  useEffect(() => {
    if (!activeFilter) return;

    const key = activeFilter.toLowerCase();

    const values = searchParams.get(key);

    if (values) {
      setSelectedOptions(values.split(","));
    } else {
      setSelectedOptions([]);
    }
  }, [searchParams, activeFilter]);

  return (
    <Box sx={s.container}>
      {/* BREADCRUMB */}
      <Typography sx={s.breadcrumb}>
        Home
        {category && ` › ${format(category)}`}
        {subcategory && ` › ${format(subcategory)}`}
      </Typography>

      {/* FILTER BAR */}
      <Box sx={s.filterBarWrapper}>
        {showLeft && (
          <Box
            onClick={() => scroll("left")}
            sx={{
              ...s.arrowBtn,
              ...s.leftArrow,
            }}
          >
            <ArrowBackIosIcon fontSize="small" />
          </Box>
        )}

        <Box ref={scrollRef} sx={s.scrollContainer}>
          {filters.map((item, i) => (
            <Box
              key={i}
              onClick={() => {
                if (item === "Filters") {
                  setOpenDrawer(true);
                } else {
                  setActiveFilter(activeFilter === item ? null : item);
                }
              }}
              sx={s.filterItem(activeFilter === item)}
            >
              {item}

              {item !== "Filters" && (
                <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
              )}
            </Box>
          ))}
        </Box>

        {showRight && (
          <Box
            onClick={() => scroll("right")}
            sx={{
              ...s.arrowBtn,
              ...s.rightArrow,
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </Box>
        )}
      </Box>

      {/* DROPDOWN */}
      {activeFilter && (
        <Box sx={s.dropdown}>
          <Typography sx={s.dropdownTitle}>{activeFilter}</Typography>

          <Box sx={s.optionsWrap}>
            {(filterOptions[activeFilter] || []).map((opt, i) => {
              const isSelected = selectedOptions.includes(opt);

              return (
                <Box
                  key={i}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedOptions(
                        selectedOptions.filter((o) => o !== opt),
                      );
                    } else {
                      setSelectedOptions([...selectedOptions, opt]);
                    }
                  }}
                  sx={s.option(isSelected)}
                >
                  {opt}
                </Box>
              );
            })}
          </Box>

          {/* ACTIONS */}
          <Box sx={s.actions}>
            <Box onClick={() => setSelectedOptions([])} sx={s.resetBtn}>
              Reset
            </Box>

            <Box
              onClick={() => {
                const query = new URLSearchParams(searchParams.toString());

                const key = activeFilter.toLowerCase();

                if (selectedOptions.length) {
                  query.set(key, selectedOptions.join(","));
                } else {
                  query.delete(key);
                }

                router.push(`/category?${query.toString()}`);

                setActiveFilter(null);
              }}
              sx={s.applyBtn}
            >
              Show {selectedOptions.length || 1000}+ results
            </Box>
          </Box>
        </Box>
      )}

      {/* DRAWER */}
      <FilterDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        filters={filters}
        filterOptions={filterOptions}
      />

      {/* PRODUCTS */}
      <ExploreProducts searchParams={searchParams} />
    </Box>
  );
}
