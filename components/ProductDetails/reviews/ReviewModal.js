// "use client";

// import {
//   Dialog,
//   DialogContent,
//   Box,
//   Typography,
//   IconButton,
//   Rating,
//   LinearProgress,
//   Chip,
//   Avatar,
// } from "@mui/material";

// import CloseIcon from "@mui/icons-material/Close";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import ShareIcon from "@mui/icons-material/Share";
// import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

// import { styles } from "./reviewModalStyles";

// export default function ReviewModal({ open, onClose }) {
//   const ratingData = [
//     { stars: 5, percent: 82.4 },
//     { stars: 4, percent: 6 },
//     { stars: 3, percent: 3.8 },
//     { stars: 2, percent: 2 },
//     { stars: 1, percent: 5.8 },
//   ];

//   /* DUMMY REVIEW DATA */

//   const reviews = [
//     {
//       name: "Lm***12",
//       date: "Jan 29, 2026",
//       rating: 5,
//       purchased: "Transparent / 1set",
//       text: `I’m very satisfied with this product. The quality is better than expected for the price. It arrived well packaged and in perfect condition.`,
//       media: [],
//     },
//     {
//       name: "mo***us",
//       date: "Mar 9, 2026",
//       rating: 1,
//       purchased: "Transparent / 1set",
//       text: `Crappy plastic. Was not boxed or anything. Totally deformed shape.`,
//       media: [
//         {
//           type: "video",
//           url: "/images/video1.mp4",
//         },
//         {
//           type: "image",
//           url: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
//         },
//         {
//           type: "image",
//           url: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
//         },
//         {
//           type: "image",
//           url: "/images/img1.avif",
//         },
//       ],
//     },
//     {
//       name: "Mabel Artiles",
//       date: "Dec 6, 2025",
//       rating: 5,
//       purchased: "Transparent / 1set",
//       text: `Works perfectly and fits my microwave well.`,
//       media: [
//         {
//           type: "video",
//           url: "/images/video1.mp4",
//         },
//         {
//           type: "image",
//           url: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
//         },
//       ],
//     },
//   ];

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       scroll="paper"
//       PaperProps={{ sx: styles.dialogPaper }}
//     >
//       {/* HEADER */}

//       <Box sx={styles.header}>
//         <Typography fontSize={22} fontWeight={600}>
//           Item reviews
//         </Typography>

//         <IconButton onClick={onClose} sx={styles.closeBtn}>
//           <CloseIcon />
//         </IconButton>
//       </Box>

//       <DialogContent sx={styles.content}>
//         {/* VERIFIED */}

//         <Box sx={styles.verifiedBanner}>
//           <VerifiedIcon sx={{ fontSize: 18 }} />
//           All reviews are from verified purchases
//         </Box>

//         {/* RATING SUMMARY */}

//         <Box sx={styles.ratingSection}>
//           <Typography sx={styles.bigRating}>4.6</Typography>

//           <Box sx={styles.progressWrapper}>
//             {ratingData.map((r, i) => (
//               <Box key={i} sx={styles.progressRow}>
//                 <Rating value={r.stars} readOnly size="small" />

//                 <LinearProgress
//                   variant="determinate"
//                   value={r.percent}
//                   sx={styles.progressBar}
//                 />

//                 <Typography fontSize={12}>{r.percent}%</Typography>
//               </Box>
//             ))}
//           </Box>
//         </Box>

//         {/* FILTER CHIPS */}

//         <Box sx={styles.chipsWrapper}>
//           {[
//             "Recommended",
//             "Most recent",
//             "Rating filters",
//             "Photos/Videos (166)",
//             "Bought again (144)",
//             "🇺🇸 (5,726)",
//             "Microwave Safe (59)",
//             "Works Well (97)",
//             "Love It (164)",
//           ].map((chip, i) => (
//             <Chip key={i} label={chip} variant="outlined" sx={styles.chip} />
//           ))}
//         </Box>

//         {/* REVIEWS */}

//         {reviews.map((review, index) => (
//           <Box key={index} sx={styles.reviewItem}>
//             <Avatar>{review.name.charAt(0)}</Avatar>

//             <Box>
//               <Typography fontWeight={500}>
//                 {review.name} 🇺🇸 on {review.date}
//               </Typography>

//               <Rating value={review.rating} readOnly size="small" />

//               <Typography fontSize={13} color="gray">
//                 Purchased: {review.purchased}
//               </Typography>

//               {review.text && (
//                 <Typography sx={styles.reviewText}>{review.text}</Typography>
//               )}

//               {/* MEDIA */}

//               {review.media.length > 0 && (
//                 <Box sx={styles.mediaGrid}>
//                   {review.media.map((item, i) =>
//                     item.type === "video" ? (
//                       <Box key={i} sx={styles.videoWrapper}>
//                         <img src={item?.url} style={styles.mediaItem} />
//                         <PlayArrowIcon sx={styles.playIcon} />
//                       </Box>
//                     ) : (
//                       <img key={i} src={item.url} style={styles.mediaItem} />
//                     ),
//                   )}
//                 </Box>
//               )}

//               {/* ACTIONS */}

//               <Box sx={styles.actionRow}>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                   <ShareIcon fontSize="small" />
//                   Share
//                 </Box>

//                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                   <ThumbUpOffAltIcon fontSize="small" />
//                   Helpful
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//         ))}
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Rating,
  LinearProgress,
  Chip,
  Avatar,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import VerifiedIcon from "@mui/icons-material/Verified";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import ShareIcon from "@mui/icons-material/Share";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

import { styles } from "./reviewModalStyles";

export default function ReviewModal({ open, onClose, reviews = [], product }) {
  // 🔥 TOTAL REVIEWS
  const totalReviews = reviews.length || 1;

  // 🔥 AVERAGE RATING
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  // 🔥 RATING %
  const ratingData = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;

    return {
      stars: star,

      percent: ((count / totalReviews) * 100).toFixed(1),
    };
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      PaperProps={{
        sx: styles.dialogPaper,
      }}
    >
      {/* HEADER */}

      <Box sx={styles.header}>
        <Typography fontSize={22} fontWeight={600}>
          Item reviews
        </Typography>

        <IconButton onClick={onClose} sx={styles.closeBtn}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={styles.content}>
        {/* VERIFIED */}

        <Box sx={styles.verifiedBanner}>
          <VerifiedIcon
            sx={{
              fontSize: 18,
            }}
          />
          All reviews are from verified purchases
        </Box>

        {/* RATING SUMMARY */}

        <Box sx={styles.ratingSection}>
          <Typography sx={styles.bigRating}>{averageRating}</Typography>

          <Box sx={styles.progressWrapper}>
            {ratingData.map((r, i) => (
              <Box key={i} sx={styles.progressRow}>
                <Rating value={r.stars} readOnly size="small" />

                <LinearProgress
                  variant="determinate"
                  value={r.percent}
                  sx={styles.progressBar}
                />

                <Typography fontSize={12}>{r.percent}%</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* FILTERS */}

        <Box sx={styles.chipsWrapper}>
          {[
            "Recommended",

            "Most recent",

            "Photos/Videos",

            "Verified",

            "5 Stars",

            "4 Stars",
          ].map((chip, i) => (
            <Chip key={i} label={chip} variant="outlined" sx={styles.chip} />
          ))}
        </Box>

        {/* REVIEWS */}

        {reviews?.map((review, index) => (
          <Box key={review._id || index} sx={styles.reviewItem}>
            <Avatar>{review?.user_id?.name?.charAt(0)}</Avatar>

            <Box>
              {/* NAME */}
              <Typography fontWeight={500}>
                {review?.user_id?.name} 🇺🇸 on{" "}
                {new Date(review.createdAt).toDateString()}
              </Typography>
              {/* STARS */}
              <Rating value={review.rating} readOnly size="small" />
              {/* VERIFIED */}
              <Typography fontSize={13} color="gray">
                Purchased: Verified Purchase
              </Typography>
              {/* TITLE */}
              {review.title && (
                <Typography
                  sx={{
                    fontWeight: 700,

                    mt: 1,
                  }}
                >
                  {review.title}
                </Typography>
              )}
              {/* REVIEW */}
              {review.review && (
                <Typography sx={styles.reviewText}>{review.review}</Typography>
              )}
              {/* MEDIA */}
              /* MEDIA */
              {review?.media?.length > 0 && (
                <Box sx={styles.mediaGrid}>
                  {review.media.map((item, i) => {
                    // 🔥 DETECT VIDEO
                    const isVideo =
                      item.includes("/video/upload") ||
                      item.includes(".mp4") ||
                      item.includes(".mov") ||
                      item.includes(".webm") ||
                      item.includes(".mkv");

                    return isVideo ? (
                      <Box key={i} sx={styles.videoWrapper}>
                        <video
                          controls
                          playsInline
                          preload="metadata"
                          style={{
                            width: "100px",

                            height: "100px",

                            objectFit: "cover",

                            borderRadius: "10px",

                            background: "#000",
                          }}
                        >
                          <source src={item} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </Box>
                    ) : (
                      <img
                        key={i}
                        src={item}
                        style={{
                          width: "100px",

                          height: "100px",

                          objectFit: "cover",

                          borderRadius: "10px",
                        }}
                      />
                    );
                  })}
                </Box>
              )}
              {/* ACTIONS */}
              <Box sx={styles.actionRow}>
                <Box
                  sx={{
                    display: "flex",

                    alignItems: "center",

                    gap: 0.5,
                  }}
                >
                  <ShareIcon fontSize="small" />
                  Share
                </Box>

                <Box
                  sx={{
                    display: "flex",

                    alignItems: "center",

                    gap: 0.5,
                  }}
                >
                  <ThumbUpOffAltIcon fontSize="small" />
                  Helpful ({review.helpful_count || 0})
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
}
