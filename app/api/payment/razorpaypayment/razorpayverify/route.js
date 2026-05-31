import Razorpay from "razorpay";

import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";

import Cart from "@/models/Cart";

import Order from "@/models/Order";

import PaymentTransaction from "@/models/PaymentTransaction";

import ProductVariant from "@/models/ProductVariant";

import Coupon from "@/models/Coupon";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,

  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const { razorpay_payment_id } = body;

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

    // 🔥 FETCH PAYMENT
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (payment.status !== "captured") {
      return NextResponse.json(
        {
          error: "Payment failed",
        },

        { status: 400 },
      );
    }

    // 🔥 FETCH CART AGAIN
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

    // 🔥 COUPON
    let discount = 0;

    if (cart?.coupon?.discount_amount) {
      discount = cart.coupon.discount_amount;
    }

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

      payment_method: "razorpay",

      payment_status: "paid",

      payment_id: razorpay_payment_id,

      transaction_id: payment.order_id,

      order_status: "processing",

      order_number: "ORD-" + Date.now(),
    });

    // 🔥 TRANSACTION
    await PaymentTransaction.create({
      user: userId,

      order: order._id,

      payment_gateway: "razorpay",

      transaction_id: payment.order_id,

      payment_id: razorpay_payment_id,

      amount: finalTotal,

      currency: payment.currency,

      gateway_response: payment,
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
        error: "Verification failed",
      },

      { status: 500 },
    );
  }
}
