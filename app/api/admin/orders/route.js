import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Order from "@/models/Order";

import "@/models/Product";

import "@/models/ProductVariant";

import "@/models/Media";

import "@/models/User";

export async function GET() {
  try {
    await dbConnect();

    const orders = await Order.find({})
      .populate("user")
      .populate({
        path: "items.product",

        populate: {
          path: "media",
        },
      })
      .populate({
        path: "items.variant",

        populate: {
          path: "media",
        },
      })
      .sort({
        createdAt: -1,
      })
      .lean();

    return NextResponse.json({
      success: true,

      orders,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },

      { status: 500 },
    );
  }
}
