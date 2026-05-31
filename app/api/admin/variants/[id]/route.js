import { NextResponse } from "next/server";
import mongoose from "mongoose";

import dbConnect from "@/utils/dbConnect";
import ProductVariant from "@/models/ProductVariant";

// ================= GET SINGLE VARIANT =================



export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid variant ID" },
        { status: 400 }
      );
    }

    const variant = await ProductVariant.findById(id)
      .populate("product", "name") // 🔥 product name
      .populate("attributes.attribute", "name") // 🔥 attribute name
      .populate("media"); // 🔥 full media object

    if (!variant) {
      return NextResponse.json(
        { message: "Variant not found" },
        { status: 404 }
      );
    }

    console.log("variant==>" ,variant)

    return NextResponse.json(variant);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching variant", error: error.message },
      { status: 500 }
    );
  }
}



// ================= UPDATE VARIANT =================
export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid variant ID" },
        { status: 400 }
      );
    }

    // 🔥 Check duplicate SKU (exclude current variant)
    if (body.sku) {
      const existing = await ProductVariant.findOne({
        sku: body.sku,
        _id: { $ne: id },
      });

      if (existing) {
        return NextResponse.json(
          { message: "SKU already exists" },
          { status: 400 }
        );
      }
    }

    const updated = await ProductVariant.findByIdAndUpdate(
      id,
      {
        ...body,
        in_stock: body.stock > 0,
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Variant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating variant", error: error.message },
      { status: 500 }
    );
  }
}

// ================= DELETE VARIANT =================
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid variant ID" },
        { status: 400 },
      );
    }

    await ProductVariant.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Variant deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting variant", error: error.message },
      { status: 500 },
    );
  }
}
