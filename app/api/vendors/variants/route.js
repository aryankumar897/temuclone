import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import ProductVariant from "@/models/ProductVariant";

// ================= GET ALL VARIANTS (by productId) =================
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { message: "productId is required" },
        { status: 400 },
      );
    }

    const variants = await ProductVariant.find({
      product: productId,
    }).sort({ createdAt: -1 });

    return NextResponse.json(variants);
  } catch (error) {
    console.log("error==>", error);

    return NextResponse.json(
      { message: "Error fetching variants", error: error.message },
      { status: 500 },
    );
  }
}

// ================= CREATE VARIANTS =================

// 🔥 helper: normalize attributes
const normalizeAttributes = (attrs) =>
  attrs
    .map((a) => `${a.attribute}:${a.value}`)
    .sort()
    .join("|");

// ================= CREATE VARIANTS =================
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    console.log(body);

    const { productId, variants } = body;

    if (!productId || !variants?.length) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    // 🔥 normalize incoming variants
    const incomingMap = variants.map((v) => ({
      ...v,
      key: normalizeAttributes(v.attributes),
    }));

    // 🔥 get existing variants for product
    const existing = await ProductVariant.find({
      product: productId,
    }).select("attributes");

    const existingKeys = new Set(
      existing.map((v) => normalizeAttributes(v.attributes)),
    );

    // 🔥 filter only new combinations
    const filtered = incomingMap.filter((v) => !existingKeys.has(v.key));

    if (!filtered.length) {
      return NextResponse.json(
        { message: "All variants already exist" },
        { status: 400 },
      );
    }

    // 🔥 format for DB
    const formatted = filtered.map((v) => ({
      product: productId,
      attributes: v.attributes,
      sku: v.sku,
      price: v.price,
      special_price: v.special_price || 0,
      stock: v.stock || 0,
      in_stock: v.stock > 0,
      media: v.media || [],
      status: v.status || "active",
    }));

    const created = await ProductVariant.insertMany(formatted);

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.log("error===>", error);

    return NextResponse.json(
      {
        message: "Error creating variants",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
