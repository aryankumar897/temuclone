import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Store from "@/models/Store";

// ================= GET ALL STORES =================
export async function GET() {
  try {
    await dbConnect();

    const stores = await Store.find({})
      .populate("seller_id") // optional: populate user
      .sort({ createdAt: -1 });

    return NextResponse.json(stores);
  } catch (error) {
    console.log("error==>", error);

    return NextResponse.json(
      { message: "Error fetching stores", error: error.message },
      { status: 500 }
    );
  }
}

// ================= CREATE STORE =================
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    console.log("body===>", body);

    // 🔥 Prevent duplicate store (by name or email)
    const existing = await Store.findOne({
      $or: [{ name: body.name }, { email: body.email }],
    });

    if (existing) {
      return NextResponse.json(
        { message: "Store already exists" },
        { status: 400 }
      );
    }

    const store = await Store.create(body);

    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating store", error: error.message },
      { status: 500 }
    );
  }
}