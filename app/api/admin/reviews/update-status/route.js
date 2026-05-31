import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import ProductRating from "@/models/productRating";

import Product from "@/models/Product";

export async function PUT(req) {
  try {
    await dbConnect();

    const body =
      await req.json();

    const {
      reviewId,
      status,
    } = body;

    // 🔥 VALIDATION
    if (
      !reviewId ||
      !status
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Missing fields",
        },

        { status: 400 }
      );
    }

    // 🔥 UPDATE REVIEW
    const updatedReview =
      await ProductRating.findByIdAndUpdate(
        reviewId,

        {
          status,
        },

        {
          new: true,
        }
      );

    if (!updatedReview) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Review not found",
        },

        { status: 404 }
      );
    }

    // 🔥 RECALCULATE PRODUCT
    const approvedReviews =
      await ProductRating.find({
        product_id:
          updatedReview.product_id,

        status:
          "approved",
      });

    const totalReviews =
      approvedReviews.length;

    const averageRating =
      totalReviews > 0
        ? approvedReviews.reduce(
            (
              acc,
              item
            ) =>
              acc +
              item.rating,
            0
          ) / totalReviews
        : 0;

    // 🔥 UPDATE PRODUCT
    await Product.findByIdAndUpdate(
      updatedReview.product_id,

      {
        average_rating:
          Number(
            averageRating.toFixed(
              1
            )
          ),

        total_reviews:
          totalReviews,
      }
    );

    return NextResponse.json({
      success: true,

      message:
        "Review updated successfully",

      review:
        updatedReview,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to update review",
      },

      { status: 500 }
    );
  }
}