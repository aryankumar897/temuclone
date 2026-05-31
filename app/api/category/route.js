import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/Category";

// GET all categories
export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find().sort({ position: 1 }).populate("filterAttributes")

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}