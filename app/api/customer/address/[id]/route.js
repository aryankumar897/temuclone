import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Address from "@/models/Address";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

// ================= GET SINGLE ADDRESS =================
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const address = await Address.findById(id).populate("user_id");

    if (!address) {
      return NextResponse.json(
        {
          success: false,
          message: "Address not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(address);
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

// ================= UPDATE ADDRESS =================

export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { id } =  await params;

    // ✅ Get request body
    const body = await req.json();

    // ✅ Get session
    const session = await getServerSession(authOptions);

    console.log("👤 Session:", session);

    // ✅ Unauthorized check
    if (!session?.user?._id) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    // ✅ Logged in user id
    const userId = session.user._id.toString();

    // ✅ Save logged in user id
    body.user_id = userId;

    // ✅ If setting default address
    if (body.is_default) {
      await Address.updateMany({ user_id: userId }, { is_default: false });
    }

    // ✅ Update only user's address
    const updatedAddress = await Address.findOneAndUpdate(
      {
        _id: id,
        user_id: userId,
      },
      body,
      {
        new: true,
      },
    );

    // ✅ Not found
    if (!updatedAddress) {
      return NextResponse.json(
        {
          success: false,
          message: "Address not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(updatedAddress);
  } catch (error) {

 console.log("error==>", error)

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

// ================= DELETE ADDRESS =================
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const deletedAddress = await Address.findByIdAndDelete(id);

    if (!deletedAddress) {
      return NextResponse.json(
        {
          success: false,
          message: "Address not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Address deleted successfully",
    });
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
