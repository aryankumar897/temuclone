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

    const { userId, productId, variantId, quantity, price, special_price } =
      body;

    // 🔥 FIND CART
    let cart = await Cart.findOne({
      user: userId,
    });

    // 🔥 CREATE CART
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [],
      });
    }

    // 🔥 CHECK EXISTING ITEM
    const existingItem = cart.items.find(
      (item) => item.variant.toString() === variantId,
    );

    // 🔥 UPDATE QTY
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      // 🔥 ADD NEW ITEM
      cart.items.push({
        product: productId,
        variant: variantId,
        quantity,
        price,
        special_price,
      });
    }

    await cart.save();

    return NextResponse.json({
      success: true,
      cart,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 },
    );
  }
}
