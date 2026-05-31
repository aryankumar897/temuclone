import Razorpay from "razorpay";

import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";

import Cart from "@/models/Cart";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,

  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST() {
  try {
    await dbConnect();

    // 🔥 USER
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },

        { status: 401 },
      );
    }

    const userId = session.user._id;

    // 🔥 FETCH CART
    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart?.items?.length) {
      return NextResponse.json(
        {
          error: "Cart is empty",
        },

        { status: 400 },
      );
    }

    // 🔥 RECALCULATE TOTAL
    let serverTotal = 0;

    for (const item of cart.items) {
      const finalPrice =
        item.special_price > 0 ? item.special_price : item.price;

      serverTotal += finalPrice * item.quantity;
    }

    // 🔥 TAX
    const tax = 5;

    // 🔥 FINAL TOTAL
    const total = serverTotal + tax;

    // 🔥 CREATE ORDER
    const razorpayOrder = await razorpay.orders.create({
      amount: total * 100,

      currency: "INR",

      receipt: "receipt_" + Date.now(),

      notes: {
        userId: userId.toString(),

        total: total.toFixed(2),
      },
    });

    return NextResponse.json(razorpayOrder);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Payment failed",
      },

      { status: 500 },
    );
  }
}
