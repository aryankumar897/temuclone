import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Kyc from "@/models/Kyc";

import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export async function POST(req) {
  try {
    await dbConnect();

    const session =
      await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json(
        {
          message: "Not authenticated",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    const {
      full_name,
      date_of_birth,
      gender,
      full_address,
      document_type,
      document_number,
      document_scan_copy,
    } = body;

    const kyc = await Kyc.create({
      user_id: session.user._id,
      full_name,
      date_of_birth,
      gender,
      full_address,
      document_type,
      document_number,

      // CLOUDINARY URL
      document_scan_copy,

      status: "pending",
    });

    return NextResponse.json({
      success: true,
      data: kyc,
    });
  } catch (error) {
    console.error(error);

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