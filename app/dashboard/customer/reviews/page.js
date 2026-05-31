"use client";

import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  Rating,
  Avatar,
  CircularProgress,
  Chip,
} from "@mui/material";

import toast from "react-hot-toast";

import { useSession } from "next-auth/react";

import StarIcon from "@mui/icons-material/Star";

export default function UserReviews() {
  const { data: session } = useSession();

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  // 🔥 FETCH REVIEWS
  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/customer/reviews/${session?.user?._id}`,
      );

      const data = await response.json();

      if (data.success) {
        setReviews(data.reviews);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?._id) {
      fetchReviews();
    }
  }, [session]);

  // 🔥 LOADING
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",

          justifyContent: "center",

          py: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: "1200px",

        margin: "0 auto",

        padding: {
          xs: "10px",

          md: "20px",
        },
      }}
    >
      {/* TITLE */}

      <Typography variant="h4" fontWeight={700} mb={4}>
        My Reviews
      </Typography>

      {/* EMPTY */}

      {reviews.length === 0 && (
        <Box
          sx={{
            textAlign: "center",

            py: 10,
          }}
        >
          <Typography variant="h6">
            You have not reviewed any product yet
          </Typography>
        </Box>
      )}

      {/* REVIEWS */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",

            md: "1fr 1fr",
          },

          gap: 3,
        }}
      >
        {reviews.map((review) => {
          const productImage = review?.product_id?.media?.[0];

          return (
            <Card
              key={review._id}
              sx={{
                padding: "20px",

                borderRadius: "16px",

                border: "1px solid #eee",

                boxShadow: "none",
              }}
            >
              {/* PRODUCT */}

              <Box
                sx={{
                  display: "flex",

                  gap: 2,

                  mb: 3,
                }}
              >
                <Avatar
                  src={productImage}
                  variant="rounded"
                  sx={{
                    width: 80,

                    height: 80,
                  }}
                />

                <Box>
                  <Typography
                    fontWeight={700}
                    sx={{
                      mb: 1,
                    }}
                  >
                    {review?.product_id?.name}
                  </Typography>

                  <Rating value={review.rating} readOnly />

                  <Typography
                    sx={{
                      mt: 1,

                      color: "#777",

                      fontSize: "14px",
                    }}
                  >
                    {new Date(review.createdAt).toDateString()}
                  </Typography>
                </Box>
              </Box>

              {/* STATUS */}

              <Chip
                icon={<StarIcon />}
                label={review.status}
                color={
                  review.status === "approved"
                    ? "success"
                    : review.status === "rejected"
                      ? "error"
                      : "warning"
                }
                sx={{
                  mb: 2,

                  textTransform: "capitalize",
                }}
              />

              {/* TITLE */}

              {review.title && (
                <Typography fontWeight={700} mb={1}>
                  {review.title}
                </Typography>
              )}

              {/* REVIEW */}

              <Typography
                sx={{
                  color: "#555",

                  lineHeight: 1.8,
                }}
              >
                {review.review}
              </Typography>

              {/* MEDIA */}

              {review?.media?.length > 0 && (
                <Box
                  sx={{
                    display: "flex",

                    gap: 1,

                    flexWrap: "wrap",

                    mt: 3,
                  }}
                >
                  {review.media.map((item, i) => {
                    const isVideo = item.includes("/video/upload");

                    return isVideo ? (
                      <video
                        key={i}
                        controls
                        style={{
                          width: "100px",

                          height: "100px",

                          objectFit: "cover",

                          borderRadius: "10px",
                        }}
                      >
                        <source src={item} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        key={i}
                        src={item}
                        alt="review"
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
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
