import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Kyc from "@/models/Kyc"; // ✅ FIXED
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user._id;

    const [kyc, user] = await Promise.all([
      Kyc.findOne({ user_id: userId })
        .select("status rejected_reason verified_at")
        .lean(),

      User.findById(userId)
        .select("kyc_status")
        .lean(),
    ]);

    return NextResponse.json({
      success: true,
      kyc_status: user?.kyc_status || "not_submitted",
      kyc_verification: kyc || null,
    });

  } catch (error) {
    console.error("KYC STATUS ERROR:", error);

    return NextResponse.json(
      { success: false, message: "KYC status fetch failed" },
      { status: 500 }
    );
  }
}