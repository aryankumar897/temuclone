import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Store from "@/models/Store";

// ================= GET ALL STORES =================
export async function GET() {
  try {
    await dbConnect();

    const stores = await Store.find({})
      .sort({ createdAt: -1 })
      .select("_id name"); // 🔥 only needed fields

    return NextResponse.json(stores);
  } catch (error) {
    console.log("Store fetch error:", error);

    return NextResponse.json(
      {
        message: "Error fetching stores",
        error: error.message,
      },
      { status: 500 }
    );
  }
}