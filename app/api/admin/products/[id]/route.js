import { NextResponse } from "next/server";
import mongoose from "mongoose";

import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";
import ProductVariant from "@/models/ProductVariant";
// ================= GET SINGLE PRODUCT =================
export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 },
      );
    }

    const product = await Product.findById(id)
      .populate("brand_id")
      .populate("tag_id")
      .populate("category")
      .populate("media")
      .populate("attributes");

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    console.log("product=====>", product);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching product", error: error.message },
      { status: 500 },
    );
  }
}

// ================= UPDATE PRODUCT =================
export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 },
      );
    }

    // 🔥 Prevent duplicate slug
    if (body.slug) {
      const existing = await Product.findOne({
        slug: body.slug,
        _id: { $ne: id },
      });

      if (existing) {
        return NextResponse.json(
          { message: "Slug already in use" },
          { status: 400 },
        );
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating product", error: error.message },
      { status: 500 },
    );
  }
}

// ================= DELETE PRODUCT =================

// ================= DELETE PRODUCT =================
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 },
      );
    }

    // 🔥 STEP 1: DELETE VARIANTS FIRST
    await ProductVariant.deleteMany({ product: id });

    // 🔥 STEP 2: DELETE PRODUCT
    await Product.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Product and its variants deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting product", error: error.message },
      { status: 500 },
    );
  }
}
