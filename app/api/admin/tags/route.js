// app/api/admin/tags/route.js

import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/Tag";

// ================= GET ALL TAGS =================
export async function GET() {
  try {
    await dbConnect();

    const tags = await Tag.find({}).sort({ createdAt: -1 });


    return NextResponse.json(tags);
  } catch (error) {
     console.log("error==>" ,  error)
    return NextResponse.json(
      { message: "Error fetching tags", error: error.message },
      { status: 500 }
    );
  }
}

// ================= CREATE TAG =================
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    // 🔥 Prevent duplicate slug
    const existing = await Tag.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json(
        { message: "Tag already exists" },
        { status: 400 }
      );
    }

    const tag = await Tag.create(body);

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating tag", error: error.message },
      { status: 500 }
    );
  }
}