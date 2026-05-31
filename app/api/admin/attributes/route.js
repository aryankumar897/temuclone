import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Attribute from "@/models/Attribute";

// ================= GET ALL ATTRIBUTES =================
export async function GET() {
  try {
    await dbConnect();

    const attributes = await Attribute.find({}).sort({ createdAt: -1 });

    return NextResponse.json(attributes);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching attributes", error: error.message },
      { status: 500 },
    );
  }
}

// ================= CREATE ATTRIBUTE =================
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    // 🔥 Validate required
    if (!body.name || !body.slug) {
      return NextResponse.json(
        { message: "Name and slug are required" },
        { status: 400 },
      );
    }

    // 🔥 Prevent duplicate slug
    const existing = await Attribute.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json(
        { message: "Attribute already exists" },
        { status: 400 },
      );
    }

    // 🔥 Normalize values (important)
    const values = (body.values || []).map((v) => ({
      value: v.value?.toLowerCase(),
      label: v.label,
    }));

    const attribute = await Attribute.create({
      ...body,
      values,
    });

    return NextResponse.json(attribute, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating attribute", error: error.message },
      { status: 500 },
    );
  }
}
