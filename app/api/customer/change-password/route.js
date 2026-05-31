import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export async function PUT(req) {
  try {
    await dbConnect();

    // ✅ Get session
    const session = await getServerSession(authOptions);

    console.log("👤 Session:", session);

    if (!session?.user?._id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user._id.toString();

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    // ✅ Basic validation
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // ✅ Get user
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // ✅ Check current password
    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // ✅ Prevent same password reuse
    const isSamePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (isSamePassword) {
      return NextResponse.json(
        { message: "New password must be different" },
        { status: 400 }
      );
    }

    // ✅ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // ✅ Update password
    user.password = hashedPassword;

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Password updated successfully 🔐",
    });

  } catch (error) {
    console.log("CHANGE PASSWORD ERROR:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}