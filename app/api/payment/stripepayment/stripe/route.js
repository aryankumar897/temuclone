import Stripe from "stripe";

import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";

import Cart from "@/models/Cart";

const stripe = new Stripe(
  "sk_test_51K5nvYSGgs9C5RdZpIIhINkUXAcMb46wbwGbJiGGWlt2VXjXhjP6wQerucW9lc3AUDCoMZ3ArV3zLIMxCQRSI24100pNDDDSew",
);
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

    // 🔥 CART
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

    let subtotal = 0;

    // 🔥 STRIPE ITEMS
    const line_items = cart.items.map((item) => {
      const finalPrice =
        item.special_price > 0 ? item.special_price : item.price;

      subtotal += finalPrice * item.quantity;

      return {
        price_data: {
          currency: "inr",

          product_data: {
            name: "Product",
          },

          unit_amount: Math.round(finalPrice * 100),
        },

        quantity: item.quantity,
      };
    });

    // 🔥 DISCOUNT
    const discount = cart?.coupon?.discount_amount || 0;

    // 🔥 TAX
    const tax = 5;

    // 🔥 TOTAL
    const total = subtotal - discount + tax;

    // 🔥 CREATE SESSION
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items,

      mode: "payment",

      success_url:
        "http://localhost:3000/stripe/success?session_id={CHECKOUT_SESSION_ID}",

      cancel_url: "http://localhost:3000/stripe/cancel",

      metadata: {
        userId: userId.toString(),

        total: total.toFixed(2),
      },
    });

    return NextResponse.json({
      url: stripeSession.url,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Stripe failed",
      },

      { status: 500 },
    );
  }
}
