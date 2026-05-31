import { NextResponse } from "next/server";
import mongoose from "mongoose";

import dbConnect from "@/utils/dbConnect";
import Kyc from "@/models/Kyc";

// ✅ GET single KYC
export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } =  await  params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid KYC ID" },
        { status: 400 }
      );
    }

    const kyc = await Kyc.findById(id)
      .populate("user_id", "email name"); // optional

    if (!kyc) {
      return NextResponse.json(
        { message: "KYC not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(kyc);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

// // ✅ UPDATE KYC STATUS
// export async function PUT(req, { params }) {
//   try {
//     await dbConnect();

//     const { id } = params;
//     const body = await req.json();

//     const { status, rejected_reason } = body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json(
//         { message: "Invalid KYC ID" },
//         { status: 400 }
//       );
//     }

//     const kyc = await Kyc.findById(id);

//     if (!kyc) {
//       return NextResponse.json(
//         { message: "KYC not found" },
//         { status: 404 }
//       );
//     }

//     // ✅ Update fields
//     kyc.status = status;

//     if (status === "rejected") {
//       kyc.rejected_reason = rejected_reason || "Not provided";
//     } else {
//       kyc.rejected_reason = "";
//     }

//     // ✅ When approved
//     if (status === "approved") {
//       kyc.verified_at = new Date();

//       // 👉 replace with real admin id from session
//       kyc.verified_by = kyc.user_id; 
//     }

//     await kyc.save();

//     return NextResponse.json({
//       message: "KYC updated successfully",
//       kyc,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Server error" },
//       { status: 500 }
//     );
//   }
// }