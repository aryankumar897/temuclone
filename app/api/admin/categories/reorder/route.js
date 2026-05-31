import dbConnect from "@/utils/dbConnect";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    const { updates } = await request.json();
    
    for (const update of updates) {
      await Category.findByIdAndUpdate(update._id, {
        parent_id: update.parent_id || null,
        position: update.position,
      });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}