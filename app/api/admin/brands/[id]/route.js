import { NextResponse } from "next/server";
import mongoose from "mongoose";

import dbConnect from "@/utils/dbConnect";
import Brand from "@/models/Brand";

// ================= GET SINGLE BRAND =================
export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid brand ID" },
        { status: 400 }
      );
    }

    const brand = await Brand.findById(id);

    if (!brand) {
      return NextResponse.json(
        { message: "Brand not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(brand);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching brand", error: error.message },
      { status: 500 }
    );
  }
}

// ================= UPDATE BRAND =================
export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid brand ID" },
        { status: 400 }
      );
    }

    // 🔥 Prevent duplicate slug
    if (body.slug) {
      const existing = await Brand.findOne({
        slug: body.slug,
        _id: { $ne: id },
      });

      if (existing) {
        return NextResponse.json(
          { message: "Slug already in use" },
          { status: 400 }
        );
      }
    }

    const updatedBrand = await Brand.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json(updatedBrand);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating brand", error: error.message },
      { status: 500 }
    );
  }
}

// ================= DELETE BRAND =================
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid brand ID" },
        { status: 400 }
      );
    }

    await Brand.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Brand deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting brand", error: error.message },
      { status: 500 }
    );
  }
}