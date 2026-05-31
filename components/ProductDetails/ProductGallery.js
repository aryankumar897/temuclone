// "use client";

// import { useState, useRef } from "react";
// import { Box, Typography, Rating, IconButton, Skeleton } from "@mui/material";

// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// import styles from "./ProductGalleryStyles";

// const media = [
//   {
//     type: "video",
//     video: "/images/video1.mp4",
//     thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/maxresdefault.jpg",
//   },
//   { type: "image", src: "/images/img1.avif" },
//   { type: "image", src: "/images/img2.avif" },
//   { type: "image", src: "/images/img3.avif" },
//   { type: "image", src: "/images/img4.avif" },

//   {
//     type: "video",
//     video: "/images/video1.mp4",
//     thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/maxresdefault.jpg",
//   },
//   { type: "image", src: "/images/img1.avif" },
//   { type: "image", src: "/images/img2.avif" },
//   { type: "image", src: "/images/img3.avif" },
//   { type: "image", src: "/images/img4.avif" },

//   {
//     type: "video",
//     video: "/images/video1.mp4",
//     thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/maxresdefault.jpg",
//   },
//   { type: "image", src: "/images/img1.avif" },
//   { type: "image", src: "/images/img2.avif" },
//   { type: "image", src: "/images/img3.avif" },
//   { type: "image", src: "/images/img4.avif" },
// ];

// export default function ProductGallery() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const thumbRefs = useRef([]);

//   const nextSlide = () => {
//     const newIndex = (activeIndex + 1) % media.length;
//     setActiveIndex(newIndex);

//     thumbRefs.current[newIndex]?.scrollIntoView({
//       behavior: "smooth",
//       block: "nearest",
//     });
//   };

//   const prevSlide = () => {
//     const newIndex = (activeIndex - 1 + media.length) % media.length;
//     setActiveIndex(newIndex);

//     thumbRefs.current[newIndex]?.scrollIntoView({
//       behavior: "smooth",
//       block: "nearest",
//     });
//   };

//   const active = media[activeIndex];

//   return (
//     <Box sx={styles.wrapper}>
//       {/* MAIN MEDIA */}

//       <Box sx={styles.mainMediaBox}>
//         {loading && (
//           <Skeleton variant="rectangular" width="100%" height="100%" />
//         )}

//         {active.type === "video" ? (
//           <video
//             controls
//             style={styles.mainMedia}
//             onLoadedData={() => setLoading(false)}
//           >
//             <source src={active.video} />
//           </video>
//         ) : (
//           <Box
//             component="img"
//             src={active.src}
//             sx={styles.mainMedia}
//             onLoad={() => setLoading(false)}
//           />
//         )}

//         <IconButton sx={styles.leftArrow} onClick={prevSlide}>
//           <ArrowBackIosNewIcon fontSize="small" />
//         </IconButton>

//         <IconButton sx={styles.rightArrow} onClick={nextSlide}>
//           <ArrowForwardIosIcon fontSize="small" />
//         </IconButton>
//       </Box>

//       {/* THUMBNAILS */}

//       <Box sx={styles.thumbnailColumn}>
//         {media.map((item, index) => (
//           <Box
//             key={index}
//             ref={(el) => (thumbRefs.current[index] = el)}
//             sx={{
//               ...styles.thumbnailBox,
//               border:
//                 activeIndex === index ? "2px solid black" : "1px solid #ddd",
//             }}
//             onClick={() => {
//               setActiveIndex(index);

//               thumbRefs.current[index]?.scrollIntoView({
//                 behavior: "smooth",
//                 block: "nearest",
//               });
//             }}
//           >
//             {item.type === "video" ? (
//               <Box sx={styles.videoThumb}>
//                 <img src={item.thumbnail} style={styles.thumbMedia} />

//                 <Box sx={styles.videoOverlay}>
//                   <PlayArrowIcon sx={styles.playIcon} />
//                 </Box>
//               </Box>
//             ) : (
//               <img src={item.src} style={styles.thumbMedia} />
//             )}
//           </Box>
//         ))}
//       </Box>

//       {/* REVIEW + RATING */}

//       <Box sx={styles.reviewRow}>
//         <Typography sx={styles.reviewText}>89 reviews</Typography>

//         <Rating value={4.5} precision={0.5} readOnly />

//         <Typography sx={styles.verified}>
//           ✔ All reviews are from verified purchases
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// "use client";

// import { useState, useRef } from "react";
// import {
//   Box,
//   Typography,
//   Rating,
//   IconButton,
//   Skeleton,
//   Dialog,
// } from "@mui/material";

// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import CloseIcon from "@mui/icons-material/Close";
// import Reviews from "@/components/ProductDetails/reviews/Reviews";
// import styles from "./ProductGalleryStyles";
// import StoreHeader from "@/components/ProductDetails/StoreHeader/StoreHeader";
// import ProductMedia from "@/components/ProductDetails/ProductMedia/ProductMedia";

// const media = [
//   {
//     type: "video",
//     video: "/images/video1.mp4",
//     thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/maxresdefault.jpg",
//   },
//   { type: "image", src: "/images/img1.avif" },
//   { type: "image", src: "/images/img2.avif" },
//   { type: "image", src: "/images/img3.avif" },
//   { type: "image", src: "/images/img4.avif" },

//   { type: "image", src: "/images/img5.avif" },
//   { type: "image", src: "/images/img6.avif" },
// ];

// export default function ProductGallery() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [zoomStyle, setZoomStyle] = useState({});
//   const [fullscreen, setFullscreen] = useState(false);

//   const thumbRefs = useRef([]);
//   const startX = useRef(0);

//   const active = media[activeIndex];

//   const nextSlide = () => {
//     const newIndex = (activeIndex + 1) % media.length;
//     setActiveIndex(newIndex);
//   };

//   const prevSlide = () => {
//     const newIndex = (activeIndex - 1 + media.length) % media.length;
//     setActiveIndex(newIndex);
//   };

//   /* ---------------------- */
//   /* HOVER ZOOM MAGNIFIER   */
//   /* ---------------------- */

//   const handleMouseMove = (e) => {
//     const { left, top, width, height } =
//       e.currentTarget.getBoundingClientRect();

//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;

//     setZoomStyle({
//       transformOrigin: `${x}% ${y}%`,
//       transform: "scale(2)",
//     });
//   };

//   const handleMouseLeave = () => {
//     setZoomStyle({
//       transform: "scale(1)",
//     });
//   };

//   /* ---------------------- */
//   /* MOBILE SWIPE           */
//   /* ---------------------- */

//   const handleTouchStart = (e) => {
//     startX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = (e) => {
//     const endX = e.changedTouches[0].clientX;

//     if (startX.current - endX > 50) nextSlide();
//     if (endX - startX.current > 50) prevSlide();
//   };

//   return (
//     <Box sx={styles.wrapper}>
//       {/* MAIN MEDIA */}

//       <Box
//         sx={styles.mainMediaBox}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={handleMouseLeave}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//         onClick={() => setFullscreen(true)}
//       >
//         {loading && (
//           <Skeleton variant="rectangular" width="100%" height="100%" />
//         )}

//         {active.type === "video" ? (
//           <video
//             controls
//             style={styles.mainMedia}
//             onLoadedData={() => setLoading(false)}
//           >
//             <source src={active.video} />
//           </video>
//         ) : (
//           <Box
//             component="img"
//             src={active.src}
//             loading="lazy"
//             sx={{ ...styles.mainMedia, ...zoomStyle }}
//             onLoad={() => setLoading(false)}
//           />
//         )}

//         <IconButton sx={styles.leftArrow} onClick={prevSlide}>
//           <ArrowBackIosNewIcon fontSize="small" />
//         </IconButton>

//         <IconButton sx={styles.rightArrow} onClick={nextSlide}>
//           <ArrowForwardIosIcon fontSize="small" />
//         </IconButton>
//       </Box>

//       {/* THUMBNAILS */}

//       <Box sx={styles.thumbnailColumn}>
//         {media.map((item, index) => (
//           <Box
//             key={index}
//             ref={(el) => (thumbRefs.current[index] = el)}
//             sx={{
//               ...styles.thumbnailBox,
//               border:
//                 activeIndex === index ? "2px solid black" : "1px solid #ddd",
//             }}
//             onClick={() => setActiveIndex(index)}
//           >
//             {item.type === "video" ? (
//               <Box sx={styles.videoThumb}>
//                 <img
//                   src={item.thumbnail}
//                   loading="lazy"
//                   style={styles.thumbMedia}
//                 />

//                 <Box sx={styles.videoOverlay}>
//                   <PlayArrowIcon sx={styles.playIcon} />
//                 </Box>
//               </Box>
//             ) : (
//               <img src={item.src} loading="lazy" style={styles.thumbMedia} />
//             )}
//           </Box>
//         ))}
//       </Box>

//       {/* REVIEW */}

//       <Box sx={styles.reviewRow}>
//         <Typography sx={styles.reviewText}>89 reviews</Typography>
//         <Rating value={4.5} precision={0.5} readOnly />
//         <Typography sx={styles.verified}>
//           ✔ All reviews are from verified purchases
//         </Typography>
//       </Box>

//       {/* FULLSCREEN VIEWER */}

//       <Dialog
//         open={fullscreen}
//         onClose={() => setFullscreen(false)}
//         fullScreen
//         PaperProps={{
//           sx: styles.fullscreenDialog,
//         }}
//       >
//         <Box sx={styles.fullscreenContainer}>
//           {/* CLOSE BUTTON */}

//           <IconButton
//             sx={styles.fullscreenClose}
//             onClick={() => setFullscreen(false)}
//           >
//             <CloseIcon />
//           </IconButton>

//           {/* LEFT ARROW */}

//           <IconButton sx={styles.fullscreenLeft} onClick={prevSlide}>
//             <ArrowBackIosNewIcon />
//           </IconButton>

//           {/* MAIN MEDIA */}

//           <Box sx={styles.fullscreenImageWrapper}>
//             {active.type === "video" ? (
//               <video controls style={styles.fullscreenMedia}>
//                 <source src={active.video} />
//               </video>
//             ) : (
//               <img src={active.src} style={styles.fullscreenMedia} />
//             )}
//           </Box>

//           {/* RIGHT ARROW */}

//           <IconButton sx={styles.fullscreenRight} onClick={nextSlide}>
//             <ArrowForwardIosIcon />
//           </IconButton>

//           {/* THUMBNAILS */}

//           <Box sx={styles.fullscreenThumbs}>
//             {media.map((item, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   ...styles.fullscreenThumb,
//                   border:
//                     activeIndex === index
//                       ? "2px solid white"
//                       : "1px solid rgba(255,255,255,0.3)",
//                 }}
//                 onClick={() => setActiveIndex(index)}
//               >
//                 {item.type === "video" ? (
//                   <img src={item.thumbnail} style={styles.thumbMedia} />
//                 ) : (
//                   <img src={item.src} style={styles.thumbMedia} />
//                 )}
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       </Dialog>

//       <Reviews />
//       <StoreHeader />
//       <ProductMedia />
//     </Box>
//   );
// }

"use client";

import { useState, useRef, useMemo } from "react";

import {
  Box,
  Typography,
  Rating,
  IconButton,
  Skeleton,
  Dialog,
} from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import CloseIcon from "@mui/icons-material/Close";

import styles from "./ProductGalleryStyles";
import Reviews from "@/components/ProductDetails/reviews/Reviews";

import StoreHeader from "@/components/ProductDetails/StoreHeader/StoreHeader";
import ProductMedia from "@/components/ProductDetails/ProductMedia/ProductMedia";

export default function ProductGallery({ product, selectedVariant }) {
  // 🔥 Convert DB media to gallery format
  // const media = useMemo(() => {
  //   if (!product?.media) return [];

  //   return product.media.map((item) => ({
  //     type: item.type,
  //     src: item.url,
  //   }));
  // }, [product]);

  const media = useMemo(() => {
    // 🔥 VARIANT MEDIA
    if (selectedVariant?.media?.length > 0) {
      return selectedVariant.media.map((item) => ({
        type: item.type,
        src: item.url,
      }));
    }

    // 🔥 PRODUCT MEDIA
    if (!product?.media) return [];

    return product.media.map((item) => ({
      type: item.type,
      src: item.url,
    }));
  }, [product, selectedVariant]);

  const [activeIndex, setActiveIndex] = useState(0);

  const [loading, setLoading] = useState(true);

  const [zoomStyle, setZoomStyle] = useState({});

  const [fullscreen, setFullscreen] = useState(false);

  const thumbRefs = useRef([]);

  const startX = useRef(0);

  // 🔥 Current active media
  const active = media[activeIndex];

  const nextSlide = () => {
    const newIndex = (activeIndex + 1) % media.length;

    setActiveIndex(newIndex);

    setLoading(true);
  };

  const prevSlide = () => {
    const newIndex = (activeIndex - 1 + media.length) % media.length;

    setActiveIndex(newIndex);

    setLoading(true);
  };

  /* ---------------------- */
  /* HOVER ZOOM             */
  /* ---------------------- */

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;

    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
    });
  };

  /* ---------------------- */
  /* MOBILE SWIPE           */
  /* ---------------------- */

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    if (startX.current - endX > 50) nextSlide();

    if (endX - startX.current > 50) prevSlide();
  };

  // ❌ No media
  if (!media.length) {
    return (
      <Box
        sx={{
          width: "500px",
          height: "500px",
          background: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No Image
      </Box>
    );
  }

  return (
    <Box sx={styles.wrapper}>
      {/* MAIN MEDIA */}

      <Box
        sx={styles.mainMediaBox}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => setFullscreen(true)}
      >
        {loading && (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        )}

        {active?.type === "video" ? (
          <video
            controls
            style={styles.mainMedia}
            onLoadedData={() => setLoading(false)}
          >
            <source src={active.src} />
          </video>
        ) : (
          <Box
            component="img"
            src={active?.src}
            loading="lazy"
            sx={{
              ...styles.mainMedia,
              ...zoomStyle,
              display: loading ? "none" : "block",
            }}
            onLoad={() => setLoading(false)}
          />
        )}

        {/* LEFT */}

        <IconButton sx={styles.leftArrow} onClick={prevSlide}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        {/* RIGHT */}

        <IconButton sx={styles.rightArrow} onClick={nextSlide}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* THUMBNAILS */}

      <Box sx={styles.thumbnailColumn}>
        {media.map((item, index) => (
          <Box
            key={index}
            ref={(el) => (thumbRefs.current[index] = el)}
            sx={{
              ...styles.thumbnailBox,
              border:
                activeIndex === index ? "2px solid black" : "1px solid #ddd",
            }}
            onClick={() => {
              setActiveIndex(index);

              setLoading(true);
            }}
          >
            {item.type === "video" ? (
              <Box sx={styles.videoThumb}>
                <video src={item.src} style={styles.thumbMedia} />

                <Box sx={styles.videoOverlay}>
                  <PlayArrowIcon sx={styles.playIcon} />
                </Box>
              </Box>
            ) : (
              <img src={item.src} loading="lazy" style={styles.thumbMedia} />
            )}
          </Box>
        ))}
      </Box>

      {/* REVIEW */}

      <Box sx={styles.reviewRow}>
        <Typography sx={styles.reviewText}>
          {product?.total_reviews || 0} reviews
        </Typography>

        <Rating value={product?.average_rating || 0} precision={0.5} readOnly />

        <Typography sx={styles.verified}>
          ✔ All reviews are from verified purchases
        </Typography>
      </Box>

      {/* FULLSCREEN */}

      <Dialog
        open={fullscreen}
        onClose={() => setFullscreen(false)}
        fullScreen
        PaperProps={{
          sx: styles.fullscreenDialog,
        }}
      >
        <Box sx={styles.fullscreenContainer}>
          <IconButton
            sx={styles.fullscreenClose}
            onClick={() => setFullscreen(false)}
          >
            <CloseIcon />
          </IconButton>

          <IconButton sx={styles.fullscreenLeft} onClick={prevSlide}>
            <ArrowBackIosNewIcon />
          </IconButton>

          <Box sx={styles.fullscreenImageWrapper}>
            {active?.type === "video" ? (
              <video controls style={styles.fullscreenMedia}>
                <source src={active.src} />
              </video>
            ) : (
              <img src={active?.src} style={styles.fullscreenMedia} />
            )}
          </Box>

          <IconButton sx={styles.fullscreenRight} onClick={nextSlide}>
            <ArrowForwardIosIcon />
          </IconButton>

          {/* FULLSCREEN THUMB */}

          <Box sx={styles.fullscreenThumbs}>
            {media.map((item, index) => (
              <Box
                key={index}
                sx={{
                  ...styles.fullscreenThumb,
                  border:
                    activeIndex === index
                      ? "2px solid white"
                      : "1px solid rgba(255,255,255,0.3)",
                }}
                onClick={() => setActiveIndex(index)}
              >
                <img src={item.src} style={styles.thumbMedia} />
              </Box>
            ))}
          </Box>
        </Box>
      </Dialog>

      <Reviews product={product} />
      <StoreHeader product={product} />
      <ProductMedia product={product} />
    </Box>
  );
}
