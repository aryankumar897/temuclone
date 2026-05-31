import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import ProductRating from "@/models/productRating";

import Product from "@/models/Product";

import Order from "@/models/Order";

import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";

import "@/models/User";

// 🔥 GET REVIEWS

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { productId } = await params;

    // 🔥 FETCH REVIEWS
    const reviews = await ProductRating.find({
      product_id: productId,

      status: "approved",
    })
      .populate("user_id", "name image")
      .sort({
        createdAt: -1,
      })
      .lean();

    // 🔥 TOTAL REVIEWS
    const totalReviews = reviews.length;

    // 🔥 AVERAGE RATING
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((acc, item) => acc + item.rating, 0) / totalReviews
        : 0;

    // 🔥 RATING BREAKDOWN
    const ratingBreakdown = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    reviews.forEach((review) => {
      ratingBreakdown[review.rating] += 1;
    });

    // 🔥 CALCULATE %
    const ratingPercentages = Object.keys(ratingBreakdown).map((star) => ({
      stars: Number(star),

      count: ratingBreakdown[star],

      percent:
        totalReviews > 0
          ? Number(((ratingBreakdown[star] / totalReviews) * 100).toFixed(1))
          : 0,
    }));

    return NextResponse.json({
      success: true,

      reviews,

      totalReviews,

      averageRating: Number(averageRating.toFixed(1)),

      ratingBreakdown: ratingPercentages,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,

        message: "Failed to fetch reviews",
      },

      { status: 500 },
    );
  }
}

// 🔥 CREATE REVIEW

export async function POST(req, { params }) {
  try {
    await dbConnect();

    // 🔥 AUTH
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json(
        {
          success: false,

          message: "Please login first",
        },

        { status: 401 },
      );
    }

    const userId = session.user._id;

    const { productId } = await params;

    const body = await req.json();

    const { rating, title, review, media = [] } = body;

    // 🔥 VALIDATION

    if (!rating) {
      return NextResponse.json(
        {
          success: false,

          message: "Rating is required",
        },

        { status: 400 },
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          success: false,

          message: "Invalid rating",
        },

        { status: 400 },
      );
    }

    // 🔥 CHECK PURCHASE
    const purchasedOrder = await Order.findOne({
      user: userId,

      "items.product": productId,
    });

    if (!purchasedOrder) {
      return NextResponse.json(
        {
          success: false,

          message: "Only buyers can review",
        },

        { status: 400 },
      );
    }

    // 🔥 ALREADY REVIEWED
    const existingReview = await ProductRating.findOne({
      user_id: userId,

      product_id: productId,
    });

    if (existingReview) {
      return NextResponse.json(
        {
          success: false,

          message: "You already reviewed this product",
        },

        { status: 400 },
      );
    }

    // 🔥 CREATE REVIEW
    const newReview = await ProductRating.create({
      user_id: userId,

      product_id: productId,

      order_id: purchasedOrder._id,

      rating,

      title,

      review,

      media,

      verified_purchase: true,

      status: "approved",
    });

    // 🔥 RECALCULATE PRODUCT RATING
    const allReviews = await ProductRating.find({
      product_id: productId,

      status: "approved",
    });

    const totalReviews = allReviews.length;

    const averageRating =
      totalReviews > 0
        ? allReviews.reduce((acc, item) => acc + item.rating, 0) / totalReviews
        : 0;

    // 🔥 UPDATE PRODUCT
    await Product.findByIdAndUpdate(
      productId,

      {
        average_rating: Number(averageRating.toFixed(1)),

        total_reviews: totalReviews,
      },
    );

    return NextResponse.json({
      success: true,

      message: "Review added successfully",

      review: newReview,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,

        message: "Something went wrong",
      },

      { status: 500 },
    );
  }
}
