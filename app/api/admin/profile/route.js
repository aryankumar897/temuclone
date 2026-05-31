import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

// ================= GET PROFILE =================
export async function GET() {
  try {
    await dbConnect();

    // ✅ get session properly
    const session = await getServerSession(authOptions);

    console.log("👤 Session:", session);

    // ✅ check auth
    if (!session?.user?._id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const loggedInUserId = session.user._id.toString();

    // ✅ fetch user
    const user = await User.findById(loggedInUserId).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);

  } catch (err) {
    console.log("GET PROFILE ERROR:", err);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

// ================= UPDATE PROFILE =================
export async function PUT(req) {
  try {
    await dbConnect();

    // ✅ get session properly
    const session = await getServerSession(authOptions);

    console.log("👤 Session:", session);

    if (!session?.user?._id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const loggedInUserId = session.user._id.toString();

    const body = await req.json();


    console.log("body-----<", body)
    const { name, email, phone, profile_image } = body;

    // ✅ validation
    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and Email required" },
        { status: 400 }
      );
    }

    const user = await User.findById(loggedInUserId);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // ✅ Prevent duplicate email
    const existing = await User.findOne({ email });

    if (existing && existing._id.toString() !== user._id.toString()) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    // ✅ Update fields
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.profile_image = profile_image;

    await user.save();


 console.log("user",user)

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });

  } catch (err) {
    console.log("UPDATE PROFILE ERROR:", err);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}