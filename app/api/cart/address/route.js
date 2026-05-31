import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Cart from "@/models/Cart";

export async function PUT(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const {
      userId,

      addressId,
    } = body;

    // 🔥 UPDATE CART
    const cart = await Cart.findOneAndUpdate(
      {
        user: userId,
      },

      {
        address: addressId,
      },

      {
        new: true,
      },
    );

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
