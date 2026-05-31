import Stripe from "stripe";

import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";

import Cart from "@/models/Cart";

import Order from "@/models/Order";

import ProductVariant from "@/models/ProductVariant";

import PaymentTransaction from "@/models/PaymentTransaction";

import Coupon from "@/models/Coupon";

const stripe = new Stripe(
  "sk_test_51K5nvYSGgs9C5RdZpIIhINkUXAcMb46wbwGbJiGGWlt2VXjXhjP6wQerucW9lc3AUDCoMZ3ArV3zLIMxCQRSI24100pNDDDSew",
);

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const { sessionid } = body;

    console.log(" body ==>", body);
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

    // 🔥 STRIPE SESSION
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionid);

    // 🔥 VERIFY
    if (stripeSession.payment_status !== "paid") {
      return NextResponse.json(
        {
          error: "Payment not completed",
        },

        { status: 400 },
      );
    }

    // 🔥 FETCH CART
    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart?.items?.length) {
      return NextResponse.json(
        {
          error: "Cart empty",
        },

        { status: 400 },
      );
    }

    // 🔥 RECALCULATE
    let subtotal = 0;

    const orderItems = [];

    for (const item of cart.items) {
      const finalPrice =
        item.special_price > 0 ? item.special_price : item.price;

      subtotal += finalPrice * item.quantity;

      orderItems.push({
        product: item.product,

        variant: item.variant,

        quantity: item.quantity,

        price: item.price,

        special_price: item.special_price,

        total: finalPrice * item.quantity,
      });
    }

    // 🔥 DISCOUNT
    const discount = cart?.coupon?.discount_amount || 0;

    // 🔥 TAX
    const tax = 5;

    // 🔥 FINAL TOTAL
    const finalTotal = subtotal - discount + tax;

    // 🔥 CREATE ORDER
    const order = await Order.create({
      user: userId,

      address: cart.address,

      items: orderItems,

      subtotal,

      discount,

      tax,

      shipping_charge: 0,

      total_amount: finalTotal,

      coupon: cart.coupon,

      payment_method: "stripe",

      payment_status: "paid",

      payment_id: stripeSession.payment_intent,

      transaction_id: stripeSession.id,

      order_status: "processing",

      order_number: "ORD-" + Date.now(),
    });

    // 🔥 TRANSACTION
    await PaymentTransaction.create({
      user: userId,

      order: order._id,

      payment_gateway: "stripe",

      transaction_id: stripeSession.id,

      payment_id: stripeSession.payment_intent,

      amount: finalTotal,

      currency: stripeSession.currency,

      gateway_response: stripeSession,
    });

    // 🔥 UPDATE STOCK
    for (const item of cart.items) {
      await ProductVariant.findByIdAndUpdate(
        item.variant,

        {
          $inc: {
            stock: -item.quantity,
          },
        },
      );
    }

    // 🔥 UPDATE COUPON
    if (cart?.coupon?.code) {
      await Coupon.findOneAndUpdate(
        {
          code: cart.coupon.code,
        },

        {
          $inc: {
            used_count: 1,
          },
        },
      );
    }

    // 🔥 CLEAR CART
    await Cart.findOneAndUpdate(
      {
        user: userId,
      },

      {
        items: [],

        coupon: null,
      },
    );

    return NextResponse.json({
      success: true,

      order,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Stripe verification failed",
      },

      { status: 500 },
    );
  }
}
