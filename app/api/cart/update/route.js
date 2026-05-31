import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Cart from "@/models/Cart";

import "@/models/Product";

import "@/models/ProductVariant";

import "@/models/Media";

export async function PUT(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const {
      userId,
      variantId,
      quantity,
    } = body;

    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return NextResponse.json({
        success: false,
      });
    }

    // 🔥 FIND ITEM
    const item = cart.items.find(
      (item) =>
        item.variant.toString() === variantId
    );

    // 🔥 UPDATE QTY
    if (item) {
      item.quantity = quantity;
    }

    await cart.save();

    // 🔥 REFETCH POPULATED CART
    const updatedCart = await Cart.findOne({
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