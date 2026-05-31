// app/api/admin/tags/[id]/route.js

import { NextResponse } from "next/server";
import mongoose from "mongoose";

import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/Tag";

// ================= GET SINGLE TAG =================
export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid tag ID" }, { status: 400 });
    }

    const tag = await Tag.findById(id);

    if (!tag) {
      return NextResponse.json({ message: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json(tag);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching tag", error: error.message },
      { status: 500 },
    );
  }
}

// ================= UPDATE TAG =================
export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid tag ID" }, { status: 400 });
    }

    // 🔥 Prevent duplicate slug
    if (body.slug) {
      const existing = await Tag.findOne({
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

    const updatedTag = await Tag.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json(updatedTag);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating tag", error: error.message },
      { status: 500 },
    );
  }
}

// ================= DELETE TAG =================
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid tag ID" }, { status: 400 });
    }

    await Tag.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Tag deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting tag", error: error.message },
      { status: 500 },
    );
  }
}
