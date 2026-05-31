import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import ProductRating from "@/models/productRating";

import "@/models/User";

import "@/models/Product";

export async function GET() {
  try {
    await dbConnect();

    // 🔥 FETCH REVIEWS
    const reviews = await ProductRating.find({})
      .populate("user_id", "name image email")
      .populate("product_id", "name slug media average_rating total_reviews")
      .sort({
        createdAt: -1,
      })
      .lean();

    // 🔥 COUNTS
    const totalReviews = reviews.length;

    const approvedReviews = reviews.filter(
      (item) => item.status === "approved",
    ).length;

    const pendingReviews = reviews.filter(
      (item) => item.status === "pending",
    ).length;

    const rejectedReviews = reviews.filter(
      (item) => item.status === "rejected",
    ).length;

    return NextResponse.json({
      success: true,

      reviews,

      analytics: {
        totalReviews,

        approvedReviews,

        pendingReviews,

        rejectedReviews,
      },
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
