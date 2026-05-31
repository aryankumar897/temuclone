import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Cart from "@/models/Cart";

import Coupon from "@/models/Coupon";

import "@/models/Product";

import "@/models/ProductVariant";

import "@/models/Media";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const { userId, code } = body;

    // 🔥 FIND CART
    const cart = await Cart.findOne({
      user: userId,
    });

    // ❌ CART NOT FOUND
    if (!cart) {
      return NextResponse.json({
        success: false,

        message: "Cart not found",
      });
    }

    // 🔥 FIND COUPON
    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),

      is_active: true,
    });

    // ❌ INVALID COUPON
    if (!coupon) {
      return NextResponse.json({
        success: false,

        message: "Invalid coupon code",
      });
    }

    // ❌ EXPIRED
    if (new Date(coupon.expires_at) < new Date()) {
      return NextResponse.json({
        success: false,

        message: "Coupon expired",
      });
    }

    // ❌ USAGE LIMIT
    if (coupon.used_count >= coupon.usage_limit) {
      return NextResponse.json({
        success: false,

        message: "Coupon usage limit reached",
      });
    }

    // 🔥 SUBTOTAL
    const subtotal = cart.items.reduce(
      (acc, item) => acc + (item.special_price || item.price) * item.quantity,
      0,
    );

    // ❌ MINIMUM ORDER
    if (subtotal < coupon.minimum_order_amount) {
      return NextResponse.json({
        success: false,

        message: `Minimum order amount is $${coupon.minimum_order_amount}`,
      });
    }

    // 🔥 USER LIMIT
    const userUsage = coupon.used_by.find(
      (u) => u.user_id.toString() === userId,
    );

    if (userUsage && userUsage.count >= coupon.per_user_limit) {
      return NextResponse.json({
        success: false,

        message: "You already used this coupon",
      });
    }

    // 🔥 CALCULATE DISCOUNT
    let discountAmount = 0;

    // PERCENTAGE
    if (coupon.discount_type === "percentage") {
      discountAmount = (subtotal * coupon.discount_value) / 100;

      // MAX DISCOUNT
      if (coupon.max_discount > 0 && discountAmount > coupon.max_discount) {
        discountAmount = coupon.max_discount;
      }
    }

    // FIXED
    if (coupon.discount_type === "fixed") {
      discountAmount = coupon.discount_value;
    }

    // 🔥 FINAL TOTAL
    const finalTotal = subtotal - discountAmount;

    // 🔥 SAVE COUPON IN CART
    cart.coupon = {
      code: coupon.code,

      discount_amount: discountAmount,

      final_total: finalTotal,
    };

    await cart.save();

    // 🔥 RETURN UPDATED CART
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

        message: "Server Error",
      },
      { status: 500 },
    );
  }
}
