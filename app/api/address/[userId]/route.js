import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Address from "@/models/Address";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { userId } = await params;

      
    // 🔥 FETCH USER ADDRESSES
    const addresses = await Address.find({
      user_id: userId,

      status: true,
    }).sort({
      is_default: -1,

      createdAt: -1,
    });

    return NextResponse.json({
      success: true,

      addresses,
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