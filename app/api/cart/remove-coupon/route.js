import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Cart from "@/models/Cart";

import "@/models/Product";

import "@/models/ProductVariant";

import "@/models/Media";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const { userId } = body;

    // 🔥 FIND CART
    const cart = await Cart.findOne({
      user: userId,
    });

    // ❌ NOT FOUND
    if (!cart) {
      return NextResponse.json({
        success: false,
      });
    }

    // 🔥 REMOVE COUPON
    cart.coupon = {
      code: "",

      discount_amount: 0,

      final_total: 0,
    };

    await cart.save();

    // 🔥 FETCH UPDATED CART
    const updatedCart =
      await Cart.findOne({
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

      cart: updatedCart,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}