import Product from "@/models/Product";
import Category from "@/models/Category"; // ✅ ADD THIS
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const slug = searchParams.get("category"); // ✅ GET CATEGORY SLUG

    const skip = (page - 1) * limit;

    let filter = {}; // ✅ FILTER OBJECT

    // 🔥 CATEGORY FILTER LOGIC
    if (slug) {
      const category = await Category.findOne({ slug });

      if (category) {
        // IMPORTANT: category is ARRAY in Product
        filter.category = { $in: [category._id] };
      }
    }

    const products = await Product.find(filter) // ✅ USE FILTER
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-description -short_description")
      .populate("brand_id", "name logo")
      .populate("category", "name slug") // 👈 include slug if needed
      .populate("tag_id", "name")
      .populate("attributes", "name values")
      .populate("media");

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products", error: error.message },
      { status: 500 }
    );
  }
}

