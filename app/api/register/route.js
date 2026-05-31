import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  try {
    // 1️⃣ Connect to database
    await dbConnect();

    // 2️⃣ Read request body
    const body = await req.json();


 
    const { email, password } = body;

    const finalName = email
      .split("@")[0]
      .replace(/[0-9]/g, "")
      .split(/[._-]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    // 3️⃣ Server-side validation
    if (!email || !password) {
      return NextResponse.json(
        { err: "All fields are required" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { err: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    // 4️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { err: "Email already in use" },
        { status: 409 }, // conflict
      );
    }

    // 5️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6️⃣ Save user
    const user = await User.create({
      name: finalName,
      email,
      password: hashedPassword,
    });

    console.log("User saved:", user);

    // 7️⃣ Success response
    return NextResponse.json(
      { msg: "User registered successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register error:", error);

    return NextResponse.json(
      { err: error.message || "Server error" },
      { status: 500 },
    );
  }
}
