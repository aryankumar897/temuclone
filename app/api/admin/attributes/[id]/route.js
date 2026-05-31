import { NextResponse } from "next/server";
import mongoose from "mongoose";

import dbConnect from "@/utils/dbConnect";
import Attribute from "@/models/Attribute";

// ================= GET SINGLE =================
export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } =await  params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    const attribute = await Attribute.findById(id);

    if (!attribute) {
      return NextResponse.json(
        { message: "Attribute not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(attribute);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching attribute", error: error.message },
      { status: 500 }
    );
  }
}

// ================= UPDATE =================
export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { id } =await params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    // 🔥 Prevent duplicate slug
    if (body.slug) {
      const existing = await Attribute.findOne({
        slug: body.slug,
        _id: { $ne: id },
      });

      if (existing) {
        return NextResponse.json(
          { message: "Slug already exists" },
          { status: 400 }
        );
      }
    }

    // 🔥 Normalize values
    if (body.values) {
      body.values = body.values.map((v) => ({
        value: v.value?.toLowerCase(),
        label: v.label,
      }));
    }

    const updated = await Attribute.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating attribute", error: error.message },
      { status: 500 }
    );
  }
}

// ================= DELETE =================
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } =await  params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    await Attribute.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Attribute deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting attribute", error: error.message },
      { status: 500 }
    );
  }
}