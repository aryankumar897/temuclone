import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  Card,
  Rating,
  Avatar,
  Chip,
} from "@mui/material";

import VerifiedIcon from "@mui/icons-material/Verified";

import { styles } from "./reviewStyles";

const ReviewDialog = ({
  open,
  onClose,
  review,
  getStatusChip,
  formatDate,
  theme,
}) => {
  if (!review) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* HEADER */}

      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" fontWeight={700}>
            Review Details
          </Typography>

          {getStatusChip(review.status)}
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box>
          {/* USER */}

          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Avatar
              src={review?.user_id?.image}
              sx={{
                width: 60,
                height: 60,
              }}
            >
              {review?.user_id?.name?.charAt(0)}
            </Avatar>

            <Box>
              <Typography variant="h6" fontWeight={700}>
                {review?.user_id?.name}
              </Typography>

              <Typography color="text.secondary">
                {review?.user_id?.email}
              </Typography>
            </Box>
          </Box>

          {/* DETAILS */}

          <Grid container spacing={3} sx={{ mb: 3 }}>
            {/* PRODUCT */}

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Product
              </Typography>

              <Typography variant="body1" fontWeight={600}>
                {review?.product_id?.name}
              </Typography>
            </Grid>

            {/* RATING */}

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Rating
              </Typography>

              <Box display="flex" alignItems="center" gap={1}>
                <Rating value={review.rating} readOnly />

                <Typography>
                  ({review.rating}
                  /5)
                </Typography>
              </Box>
            </Grid>

            {/* CREATED */}

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Submitted On
              </Typography>

              <Typography variant="body1">
                {formatDate(review.createdAt)}
              </Typography>
            </Grid>

            {/* UPDATED */}

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Last Updated
              </Typography>

              <Typography variant="body1">
                {formatDate(review.updatedAt)}
              </Typography>
            </Grid>
          </Grid>

          {/* VERIFIED */}

          <Chip
            icon={<VerifiedIcon />}
            label="Verified Purchase"
            color="success"
            sx={{
              mb: 3,
            }}
          />

          {/* TITLE */}

          {review.title && (
            <>
              <Typography variant="subtitle2" color="textSecondary">
                Review Title
              </Typography>

              <Card variant="outlined" sx={styles.dialogCard(theme)}>
                <Typography variant="body1" fontWeight={700}>
                  {review.title}
                </Typography>
              </Card>
            </>
          )}

          {/* REVIEW */}

          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{
              mt: 3,
            }}
          >
            Review
          </Typography>

          <Card variant="outlined" sx={styles.dialogCard(theme)}>
            <Typography variant="body1">{review.review}</Typography>
          </Card>

          {/* MEDIA */}

          {review?.media?.length > 0 && (
            <Box mt={4}>
              <Typography variant="subtitle2" color="textSecondary" mb={2}>
                Uploaded Media
              </Typography>

              <Box
                sx={{
                  display: "flex",

                  flexWrap: "wrap",

                  gap: 2,
                }}
              >
                {review.media.map((item, i) => {
                  // 🔥 VIDEO DETECT
                  const isVideo =
                    item.includes("/video/upload") ||
                    item.includes(".mp4") ||
                    item.includes(".mov") ||
                    item.includes(".webm");

                  return isVideo ? (
                    <video
                      key={i}
                      controls
                      playsInline
                      preload="metadata"
                      style={{
                        width: "180px",

                        height: "180px",

                        objectFit: "cover",

                        borderRadius: "12px",

                        background: "#000",
                      }}
                    >
                      <source src={item} type="video/mp4" />
                      Your browser does not support video.
                    </video>
                  ) : (
                    <img
                      key={i}
                      src={item}
                      alt="review-media"
                      style={{
                        width: "180px",

                        height: "180px",

                        objectFit: "cover",

                        borderRadius: "12px",

                        border: "1px solid #eee",
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>

      {/* ACTIONS */}

      <DialogActions
        sx={{
          padding: "20px",
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            background: "#ff4d00",

            "&:hover": {
              background: "#e64500",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDialog;
