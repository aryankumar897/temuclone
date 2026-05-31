import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import ProductRating from "@/models/productRating";

import "@/models/Product";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { userId } = await params;

    // 🔥 FETCH USER REVIEWS
    const reviews = await ProductRating.find({
      user_id: userId,
    })
      .populate("product_id", "name slug media average_rating")
      .sort({
        createdAt: -1,
      })
      .lean();

    return NextResponse.json({
      success: true,

      reviews,
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
