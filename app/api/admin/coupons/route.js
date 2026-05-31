// app/api/admin/coupons/route.js

import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Coupon from "@/models/Coupon";

// ================= CREATE =================
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const coupon = await Coupon.create(body);

    return NextResponse.json(coupon, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// ================= GET ALL =================
export async function GET() {
  try {
    await dbConnect();

    const coupons = await Coupon.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(coupons);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}