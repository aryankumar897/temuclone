import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Cart from "@/models/Cart";

import "@/models/Product";

import "@/models/ProductVariant";

import "@/models/Media";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { userId } = await params;

    console.log(" userId=========================================>", userId);

    const cart = await Cart.findOne({
      user: userId,
    })
      .populate("items.product")
      .populate({
        path: "items.variant",

        populate: {
          path: "media",
        },
      })
      .lean();

    return NextResponse.json({
      success: true,

      cart,
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
