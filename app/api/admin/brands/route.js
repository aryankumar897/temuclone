import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Brand from "@/models/Brand";

// ================= GET ALL BRANDS =================
export async function GET() {
  try {
    await dbConnect();

    const brands = await Brand.find({}).sort({ createdAt: -1 });

   // console.log("brands", brands);

    return NextResponse.json(brands);
  } catch (error) {
    console.log("error==>", error);

    return NextResponse.json(
      { message: "Error fetching brands", error: error.message },
      { status: 500 }
    );
  }
}

// ================= CREATE BRAND =================
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();


  console.log("body===>", body)

    
    // 🔥 Prevent duplicate slug
    const existing = await Brand.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json(
        { message: "Brand already exists" },
        { status: 400 }
      );
    }

    const brand = await Brand.create(body);

    return NextResponse.json(brand, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating brand", error: error.message },
      { status: 500 }
    );
  }
}