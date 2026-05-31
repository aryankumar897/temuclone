import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Kyc from "@/models/Kyc";

export async function GET() {
  try {
    await dbConnect();

    // ✅ Fetch all KYC (latest first)
    const kycList = await Kyc.find()
      .sort({ createdAt: -1 })
      .populate("user_id", "name email"); // optional

    return NextResponse.json({
      success: true,
      data: kycList,
    });
  } catch (error) {
    console.error("GET KYC ERROR:", error);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}