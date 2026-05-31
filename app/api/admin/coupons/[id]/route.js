// app/api/admin/coupons/[id]/route.js

import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Coupon from "@/models/Coupon";

// ================= GET SINGLE =================
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const coupon = await Coupon.findById(id);

    return NextResponse.json(coupon);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

// ================= UPDATE =================
export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const body = await req.json();
    const { id } = await params;
    const coupon = await Coupon.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json(coupon);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

// ================= DELETE =================
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    await Coupon.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
