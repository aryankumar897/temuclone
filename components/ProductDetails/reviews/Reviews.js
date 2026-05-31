// "use client";

// import { useState } from "react";
// import { Avatar, Box, Typography, Rating, Button } from "@mui/material";

// import { styles } from "./reviewStyles";
// import ReviewModal from "./ReviewModal";

// const reviews = [
//   {
//     name: "Lm***12",
//     date: "Jan 29, 2026",
//     rating: 5,
//     text: `I’m very satisfied with this product. The quality is better than expected for the price. It arrived well packaged and in perfect condition. The design matches the pictures and it works exactly as described.

// It’s easy to use, practical, and feels well made. After using it, I can say it’s definitely worth buying and I would purchase it again. Perfect if you’re looking for something affordable without sacrificing quality. Highly recommend both the product and the seller.`,
//   },
//   {
//     name: "Christopher Lopez",
//     date: "Feb 28, 2026",
//     rating: 5,
//     text: `This microwave food cover with steamer has turned out to be a great little addition to the kitchen. It does exactly what it's supposed to do — keeps food from splattering while reheating and helps things warm more evenly.

// One of my favorite features is the handle. It makes it really easy to grab and remove without burning your fingers or fumbling around with a hot plate. Small detail, but it makes a big difference.`,
//   },
//   {
//     name: "gr***kr",
//     date: "Oct 21, 2025",
//     rating: 4,
//     text: `My wife really liked the first one I bought, however, it warped slightly after she ran it through the dishwasher. So I bought her this new one, exactly like the previous one. It really does help control the splatter when microwaving some items.`,
//   },
//   {
//     name: "ms***00",
//     date: "Mar 3, 2026",
//     rating: 4,
//     text: `simple piece. convenient and effective. good purchase.`,
//   },
// ];

// export default function Reviews() {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <Box sx={styles.wrapper}>
//         {/* FILTER BUTTONS */}

//         <Box sx={styles.tabsWrapper}>
//           <Box sx={styles.tab}>Recommended</Box>
//           <Box sx={styles.tab}>Most recent</Box>
//           <Box sx={styles.tab}>Microwave Safe (59)</Box>
//           <Box sx={styles.tab}>Works Well (97)</Box>
//           <Box sx={styles.tab}>Love It (164)</Box>
//         </Box>

//         {/* REVIEWS */}

//         {reviews.map((review, index) => (
//           <Box key={index} sx={styles.reviewItem}>
//             <Avatar sx={styles.avatar} />

//             <Box sx={styles.reviewContent}>
//               {/* NAME + DATE */}

//               <Box sx={styles.nameRow}>
//                 <Typography fontWeight={500}>{review.name}</Typography>

//                 <Typography fontSize={14}>in</Typography>

//                 <img
//                   src="https://flagcdn.com/us.svg"
//                   width={16}
//                   style={{ marginTop: 2 }}
//                 />

//                 <Typography sx={styles.date}>on {review.date}</Typography>
//               </Box>

//               {/* STARS */}

//               <Rating
//                 value={review.rating}
//                 readOnly
//                 size="small"
//                 sx={{ mt: 0.5 }}
//               />

//               {/* REVIEW TEXT */}

//               <Typography sx={styles.text}>{review.text}</Typography>
//             </Box>
//           </Box>
//         ))}

//         {/* SEE ALL REVIEWS BUTTON */}

//         <Box sx={styles.center}>
//           <Button
//             variant="outlined"
//             sx={styles.seeAllBtn}
//             onClick={() => setOpen(true)}
//           >
//             See all reviews
//           </Button>
//         </Box>
//       </Box>

//       {/* MODAL */}

//       <ReviewModal open={open} onClose={() => setOpen(false)} />
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Typography,
  Rating,
  Button,
  TextField,
} from "@mui/material";

import UploadIcon from "@mui/icons-material/Upload";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { styles } from "./reviewStyles";

import ReviewModal from "./ReviewModal";

import toast from "react-hot-toast";

import { useSession } from "next-auth/react";

export default function Reviews({ product }) {
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(false);

  const [rating, setRating] = useState(5);

  const [title, setTitle] = useState("");

  const [review, setReview] = useState("");

  // 🔥 MEDIA
  const [media, setMedia] = useState([]);

  // 🔥 FETCH REVIEWS
  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/reviews/${product?._id}`,
      );

      const data = await response.json();

      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (product?._id) {
      fetchReviews();
    }
  }, [product]);

  // 🔥 HANDLE MEDIA UPLOAD
  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);

    // 🔥 MAX LIMIT
    if (files.length > 6) {
      toast.error("Maximum 6 files allowed");

      return;
    }

    const uploadedFiles = [];

    for (const file of files) {
      // 🔥 TYPE
      const isImage = file.type.startsWith("image");

      const isVideo = file.type.startsWith("video");

      // ❌ INVALID
      if (!isImage && !isVideo) {
        toast.error(`${file.name} is not supported`);

        continue;
      }

      // 🔥 IMAGE SIZE
      if (isImage && file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB`);

        continue;
      }

      // 🔥 VIDEO SIZE
      if (isVideo && file.size > 20 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 20MB`);

        continue;
      }

      try {
        // 🔥 FORM DATA
        const formDataImg = new FormData();

        formDataImg.append("file", file);

        formDataImg.append("upload_preset", "ml_default");

        // 🔥 CLOUDINARY URL
        const uploadUrl = isVideo
          ? `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`
          : `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

        // 🔥 UPLOAD
        const response = await fetch(uploadUrl, {
          method: "POST",

          body: formDataImg,
        });

        const data = await response.json();

        // ❌ ERROR
        if (!data.secure_url) {
          toast.error(`Failed to upload ${file.name}`);

          continue;
        }

        // ✅ SAVE
        uploadedFiles.push({
          url: data.secure_url,

          type: isVideo ? "video" : "image",
        });

        toast.success(`${file.name} uploaded`);
      } catch (error) {
        console.log(error);

        toast.error(`Upload failed for ${file.name}`);
      }
    }

    // 🔥 UPDATE STATE
    setMedia((prev) => [...prev, ...uploadedFiles]);
  };

  // 🔥 SUBMIT REVIEW
  const submitReview = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.API}/reviews/${product?._id}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            rating,

            title,

            review,

            media: media.map((item) => item.url),
          }),
        },
      );

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);

        return;
      }

      toast.success("Review submitted");

      setRating(5);

      setTitle("");

      setReview("");

      setMedia([]);

      fetchReviews();
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={styles.wrapper}>
        {/* FILTERS */}

        <Box sx={styles.tabsWrapper}>
          <Box sx={styles.tab}>Recommended</Box>

          <Box sx={styles.tab}>Most recent</Box>

          <Box sx={styles.tab}>Photos/Videos</Box>

          <Box sx={styles.tab}>Love It</Box>
        </Box>

        {/* RATING */}

        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: "10px",

            mb: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: "34px",

              fontWeight: 700,
            }}
          >
            {product?.average_rating}
          </Typography>

          <Rating
            value={product?.average_rating || 0}
            precision={0.5}
            readOnly
          />

          <Typography>({product?.total_reviews} reviews)</Typography>
        </Box>

        {/* REVIEW FORM */}

        {session && (
          <Box
            sx={{
              border: "1px solid #eee",

              borderRadius: "16px",

              padding: "20px",

              mb: 4,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,

                mb: 2,

                fontSize: "20px",
              }}
            >
              Write a review
            </Typography>

            {/* STARS */}

            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
            />

            {/* TITLE */}

            <TextField
              fullWidth
              placeholder="Review title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mt: 2 }}
            />

            {/* REVIEW */}

            <TextField
              fullWidth
              multiline
              rows={5}
              placeholder="Write your review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              sx={{ mt: 2 }}
            />

            {/* UPLOAD */}

            <Button
              component="label"
              startIcon={<UploadIcon />}
              sx={{
                mt: 2,

                border: "1px solid #ddd",

                color: "#333",

                textTransform: "none",
              }}
            >
              Upload Photos/Videos
              <input
                hidden
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFiles}
              />
            </Button>

            {/* PREVIEW */}

            {media.length > 0 && (
              <Box
                sx={{
                  display: "flex",

                  gap: "10px",

                  flexWrap: "wrap",

                  mt: 2,
                }}
              >
                {media.map((item, index) =>
                  item.type === "video" ? (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                      }}
                    >
                      <video
                        src={item.url}
                        style={{
                          width: "90px",

                          height: "90px",

                          objectFit: "cover",

                          borderRadius: "10px",
                        }}
                      />

                      <PlayArrowIcon
                        sx={{
                          position: "absolute",

                          top: "50%",

                          left: "50%",

                          transform: "translate(-50%, -50%)",

                          color: "#fff",
                        }}
                      />
                    </Box>
                  ) : (
                    <img
                      key={index}
                      src={item.url}
                      style={{
                        width: "90px",

                        height: "90px",

                        objectFit: "cover",

                        borderRadius: "10px",
                      }}
                    />
                  ),
                )}
              </Box>
            )}

            {/* SUBMIT */}

            <Button
              variant="contained"
              disabled={loading}
              onClick={submitReview}
              sx={{
                mt: 3,

                background: "#ff4d00",

                textTransform: "none",

                borderRadius: "30px",

                px: 4,

                "&:hover": {
                  background: "#e64500",
                },
              }}
            >
              Submit Review
            </Button>
          </Box>
        )}

        {/* REVIEWS */}

        {reviews?.map((review) => (
          <Box key={review._id} sx={styles.reviewItem}>
            <Avatar sx={styles.avatar}>
              {review?.user_id?.name?.charAt(0)}
            </Avatar>

            <Box sx={styles.reviewContent}>
              {/* NAME */}

              <Box sx={styles.nameRow}>
                <Typography fontWeight={500}>
                  {review?.user_id?.name}
                </Typography>

                <Typography sx={styles.date}>
                  on {new Date(review.createdAt).toDateString()}
                </Typography>
              </Box>

              {/* STARS */}

              <Rating
                value={review.rating}
                readOnly
                size="small"
                sx={{
                  mt: 0.5,
                }}
              />

              {/* TITLE */}

              <Typography
                sx={{
                  fontWeight: 700,

                  mt: 1,
                }}
              >
                {review.title}
              </Typography>

              {/* REVIEW */}

              <Typography sx={styles.text}>{review.review}</Typography>

              {/* MEDIA */}

              {review?.media?.length > 0 && (
                <Box
                  sx={{
                    display: "flex",

                    gap: "10px",

                    flexWrap: "wrap",

                    mt: 2,
                  }}
                >
                  {review.media.map((item, i) => {
                    const isVideo =
                      item.includes(".mp4") ||
                      item.includes(".mov") ||
                      item.includes(".webm");

                    return isVideo ? (
                      <video
                        key={i}
                        controls
                        src={item}
                        style={{
                          width: "100px",

                          height: "100px",

                          objectFit: "cover",

                          borderRadius: "10px",
                        }}
                      />
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
            </Box>
          </Box>
        ))}

        {/* SEE ALL */}

        <Box sx={styles.center}>
          <Button
            variant="outlined"
            sx={styles.seeAllBtn}
            onClick={() => setOpen(true)}
          >
            See all reviews
          </Button>
        </Box>
      </Box>

      {/* MODAL */}

      <ReviewModal
        open={open}
        onClose={() => setOpen(false)}
        reviews={reviews}
        product={product}
      />
    </>
  );
}
