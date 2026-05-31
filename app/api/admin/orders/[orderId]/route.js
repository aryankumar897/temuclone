import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Order from "@/models/Order";

import PaymentTransaction from "@/models/PaymentTransaction";

import "@/models/Product";

import "@/models/ProductVariant";

import "@/models/Media";

import "@/models/User";

import "@/models/Address"; // 🔥 IMPORTANT

export async function GET(
  req,
  { params }
) {
  try {
    await dbConnect();

    const { orderId } =
      await params;

    // 🔥 FETCH ORDER
    const order =
      await Order.findById(
        orderId
      )
        .populate("user")

        // 🔥 POPULATE ADDRESS
        .populate("address")

        .populate({
          path: "items.product",

          populate: {
            path: "media",
          },
        })

        .populate({
          path: "items.variant",

          populate: {
            path: "media",
          },
        })

        .lean();

    // 🔥 FETCH TRANSACTION
    const transaction =
      await PaymentTransaction.findOne(
        {
          order: orderId,
        }
      ).lean();

    return NextResponse.json({
      success: true,

      order,

      transaction,
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

// 🔥 UPDATE ORDER STATUS

export async function PUT(
  req,
  { params }
) {
  try {
    await dbConnect();

    const { orderId } =
      await params;

    const body =
      await req.json();

    const {
      order_status,
    } = body;

    // 🔥 UPDATE
    const order =
      await Order.findByIdAndUpdate(
        orderId,

        {
          order_status,
        },

        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,

      order,
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