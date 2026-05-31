"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
  Card,
  Rating,
  Avatar,
  Stack,
} from "@mui/material";

import {
  Visibility as ViewIcon,
} from "@mui/icons-material";

import toast from "react-hot-toast";

import ReviewDialog from "./ReviewDialog";

import { styles } from "./reviewStyles";

const AdminReviewsDashboard =
  () => {
    const [
      reviews,
      setReviews,
    ] = useState([]);

    const [
      analytics,
      setAnalytics,
    ] = useState({});

    const [
      loading,
      setLoading,
    ] = useState(true);

    const [error, setError] =
      useState("");

    const [
      selectedReview,
      setSelectedReview,
    ] = useState(null);

    const [
      viewDialogOpen,
      setViewDialogOpen,
    ] = useState(false);

    const [
      updating,
      setUpdating,
    ] = useState(false);

    const theme =
      useTheme();

    const isMobile =
      useMediaQuery(
        theme.breakpoints.down(
          "md"
        )
      );

    // 🔥 FETCH REVIEWS
    const fetchReviews =
      async () => {
        try {
          setLoading(true);

          const response =
            await fetch(
              `${process.env.API}/admin/reviews`
            );

          const data =
            await response.json();

          if (
            data.success
          ) {
            setReviews(
              data.reviews ||
                []
            );

            setAnalytics(
              data.analytics ||
                {}
            );
          } else {
            setError(
              data.message
            );
          }
        } catch (error) {
          console.log(error);

          setError(
            "Failed to fetch reviews"
          );
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
      fetchReviews();
    }, []);

    // 🔥 UPDATE STATUS
    const updateReviewStatus =
      async (
        reviewId,
        newStatus
      ) => {
        try {
          setUpdating(true);

          const response =
            await fetch(
              `${process.env.API}/admin/reviews/update-status`,
              {
                method:
                  "PUT",

                headers:
                  {
                    "Content-Type":
                      "application/json",
                  },

                body: JSON.stringify(
                  {
                    reviewId,

                    status:
                      newStatus,
                  }
                ),
              }
            );

          const data =
            await response.json();

          if (
            !data.success
          ) {
            toast.error(
              data.message
            );

            return;
          }

          toast.success(
            "Review updated"
          );

          setReviews(
            (
              prev
            ) =>
              prev.map(
                (
                  review
                ) =>
                  review._id ===
                  reviewId
                    ? {
                        ...review,

                        status:
                          newStatus,
                      }
                    : review
              )
          );
        } catch (error) {
          console.log(error);

          toast.error(
            "Update failed"
          );
        } finally {
          setUpdating(false);
        }
      };

    // 🔥 VIEW REVIEW
    const handleViewReview =
      (review) => {
        setSelectedReview(
          review
        );

        setViewDialogOpen(
          true
        );
      };

    // 🔥 CLOSE
    const handleCloseDialog =
      () => {
        setViewDialogOpen(
          false
        );

        setSelectedReview(
          null
        );
      };

    // 🔥 STATUS CHIP
    const getStatusChip =
      (status) => {
        let color =
          "warning";

        if (
          status ===
          "approved"
        ) {
          color =
            "success";
        }

        if (
          status ===
          "rejected"
        ) {
          color = "error";
        }

        return (
          <Chip
            label={status}
            color={color}
            size="small"
            sx={{
              textTransform:
                "capitalize",
            }}
          />
        );
      };

    // 🔥 DATE
    const formatDate =
      (dateString) => {
        return new Date(
          dateString
        ).toLocaleDateString(
          "en-US",
          {
            year:
              "numeric",

            month:
              "short",

            day: "numeric",

            hour:
              "2-digit",

            minute:
              "2-digit",
          }
        );
      };

    // 🔥 MOBILE CARD
    const renderMobileCard =
      (review) => (
        <Card
          key={review._id}
          sx={
            styles.mobileCard
          }
        >
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
          >
            <Box>
              <Typography fontWeight={700}>
                {
                  review
                    ?.user_id
                    ?.name
                }
              </Typography>

              <Typography variant="body2">
                {
                  review
                    ?.product_id
                    ?.name
                }
              </Typography>
            </Box>

            {getStatusChip(
              review.status
            )}
          </Box>

          <Rating
            value={
              review.rating
            }
            readOnly
            size="small"
          />

          <Typography
            sx={{
              mt: 1,

              fontSize:
                "14px",
            }}
          >
            {
              review.review
            }
          </Typography>

          {/* MEDIA */}

          {review?.media
            ?.length >
            0 && (
            <Stack
              direction="row"
              spacing={1}
              sx={{
                mt: 2,
              }}
            >
              {review.media.map(
                (
                  item,
                  i
                ) => {
                  const isVideo =
                    item.includes(
                      "/video/upload"
                    );

                  return isVideo ? (
                    <video
                      key={
                        i
                      }
                      controls
                      style={{
                        width:
                          "70px",

                        height:
                          "70px",

                        objectFit:
                          "cover",

                        borderRadius:
                          "10px",
                      }}
                    >
                      <source
                        src={
                          item
                        }
                        type="video/mp4"
                      />
                    </video>
                  ) : (
                    <img
                      key={
                        i
                      }
                      src={
                        item
                      }
                      style={{
                        width:
                          "70px",

                        height:
                          "70px",

                        objectFit:
                          "cover",

                        borderRadius:
                          "10px",
                      }}
                    />
                  );
                }
              )}
            </Stack>
          )}

          <Typography
            variant="caption"
            sx={{
              mt: 2,

              display:
                "block",
            }}
          >
            {formatDate(
              review.createdAt
            )}
          </Typography>

          <Box
            sx={{
              display:
                "flex",

              justifyContent:
                "space-between",

              mt: 2,
            }}
          >
            <IconButton
              color="primary"
              onClick={() =>
                handleViewReview(
                  review
                )
              }
            >
              <ViewIcon />
            </IconButton>

            <Select
              size="small"
              value={
                review.status
              }
              disabled={
                updating
              }
              onChange={(
                e
              ) =>
                updateReviewStatus(
                  review._id,
                  e.target.value
                )
              }
            >
              <MenuItem value="pending">
                Pending
              </MenuItem>

              <MenuItem value="approved">
                Approved
              </MenuItem>

              <MenuItem value="rejected">
                Rejected
              </MenuItem>
            </Select>
          </Box>
        </Card>
      );

    // 🔥 LOADING
    if (loading) {
      return (
        <Box
          sx={
            styles.loadingBox
          }
        >
          <CircularProgress />
        </Box>
      );
    }

    return (
      <Box
        sx={
          styles.container
        }
      >
        {/* TITLE */}

        <Typography
          variant="h4"
          sx={styles.title}
        >
          Review Management
        </Typography>

        {/* ANALYTICS */}

        <Box
          sx={{
            display:
              "grid",

            gridTemplateColumns:
              {
                xs: "1fr 1fr",

                md: "repeat(4, 1fr)",
              },

            gap: 2,

            mb: 4,
          }}
        >
          <Card
            sx={
              styles.analyticsCard
            }
          >
            <Typography
              variant="h5"
              fontWeight={700}
            >
              {
                analytics.totalReviews
              }
            </Typography>

            <Typography>
              Total Reviews
            </Typography>
          </Card>

          <Card
            sx={
              styles.analyticsCard
            }
          >
            <Typography
              variant="h5"
              fontWeight={700}
            >
              {
                analytics.approvedReviews
              }
            </Typography>

            <Typography>
              Approved
            </Typography>
          </Card>

          <Card
            sx={
              styles.analyticsCard
            }
          >
            <Typography
              variant="h5"
              fontWeight={700}
            >
              {
                analytics.pendingReviews
              }
            </Typography>

            <Typography>
              Pending
            </Typography>
          </Card>

          <Card
            sx={
              styles.analyticsCard
            }
          >
            <Typography
              variant="h5"
              fontWeight={700}
            >
              {
                analytics.rejectedReviews
              }
            </Typography>

            <Typography>
              Rejected
            </Typography>
          </Card>
        </Box>

        {/* ERROR */}

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
            }}
          >
            {error}
          </Alert>
        )}

        {/* MOBILE */}

        {isMobile ? (
          <Box>
            {reviews.map(
              renderMobileCard
            )}
          </Box>
        ) : (
          <TableContainer
            component={
              Paper
            }
          >
            <Table>
              <TableHead
                sx={styles.tableHead(
                  theme
                )}
              >
                <TableRow>
                  <TableCell>
                    User
                  </TableCell>

                  <TableCell>
                    Product
                  </TableCell>

                  <TableCell>
                    Rating
                  </TableCell>

                  <TableCell>
                    Review
                  </TableCell>

                  <TableCell>
                    Status
                  </TableCell>

                  <TableCell>
                    Date
                  </TableCell>

                  <TableCell align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {reviews.map(
                  (
                    review
                  ) => (
                    <TableRow
                      key={
                        review._id
                      }
                      hover
                    >
                      {/* USER */}

                      <TableCell>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          <Avatar>
                            {review?.user_id?.name?.charAt(
                              0
                            )}
                          </Avatar>

                          {
                            review
                              ?.user_id
                              ?.name
                          }
                        </Box>
                      </TableCell>

                      {/* PRODUCT */}

                      <TableCell>
                        {
                          review
                            ?.product_id
                            ?.name
                        }
                      </TableCell>

                      {/* RATING */}

                      <TableCell>
                        <Rating
                          value={
                            review.rating
                          }
                          readOnly
                          size="small"
                        />
                      </TableCell>

                      {/* REVIEW */}

                      <TableCell
                        sx={{
                          maxWidth:
                            "250px",
                        }}
                      >
                        {review
                          ?.review
                          ?.length >
                        120
                          ? `${review.review.substring(
                              0,
                              120
                            )}...`
                          : review.review}
                      </TableCell>

                      {/* STATUS */}

                      <TableCell>
                        {getStatusChip(
                          review.status
                        )}
                      </TableCell>

                      {/* DATE */}

                      <TableCell>
                        {formatDate(
                          review.createdAt
                        )}
                      </TableCell>

                      {/* ACTION */}

                      <TableCell align="center">
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          <IconButton
                            color="primary"
                            onClick={() =>
                              handleViewReview(
                                review
                              )
                            }
                          >
                            <ViewIcon />
                          </IconButton>

                          <Select
                            size="small"
                            value={
                              review.status
                            }
                            disabled={
                              updating
                            }
                            onChange={(
                              e
                            ) =>
                              updateReviewStatus(
                                review._id,
                                e.target.value
                              )
                            }
                          >
                            <MenuItem value="pending">
                              Pending
                            </MenuItem>

                            <MenuItem value="approved">
                              Approved
                            </MenuItem>

                            <MenuItem value="rejected">
                              Rejected
                            </MenuItem>
                          </Select>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* DIALOG */}

        <ReviewDialog
          open={
            viewDialogOpen
          }
          onClose={
            handleCloseDialog
          }
          review={
            selectedReview
          }
          getStatusChip={
            getStatusChip
          }
          formatDate={
            formatDate
          }
          theme={theme}
        />
      </Box>
    );
  };

export default AdminReviewsDashboard;