import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Address from "@/models/Address";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

// ================= GET ALL ADDRESSES =================
export async function GET() {
  try {
    await dbConnect();
   // ✅ Get session
    const session = await getServerSession(
      authOptions
    );

    console.log("👤 Session:", session);

    // ✅ Unauthorized check
    if (!session?.user?._id) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // ✅ Logged in user id
    const userId =
      session.user._id.toString();

    const addresses = await Address.find({ user_id:userId})
      .populate("user_id")
      .sort({ createdAt: -1 });

    return NextResponse.json(addresses);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

// ================= CREATE ADDRESS =================
export async function POST(req) {
  try {
    await dbConnect();

    // ✅ Get session
    const session = await getServerSession(
      authOptions
    );

    console.log("👤 Session:", session);

    // ✅ Unauthorized check
    if (!session?.user?._id) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // ✅ Logged in user id
    const userId =
      session.user._id.toString();

    // ✅ Request body
    const body = await req.json();

    // ✅ Save logged in user id
    body.user_id = userId;

    // ✅ If setting default address
    if (body.is_default) {
      await Address.updateMany(
        { user_id: userId },
        { is_default: false }
      );
    }

    // ✅ Create address
    const address =
      await Address.create(body);

    return NextResponse.json(
      address,
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}