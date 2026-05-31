import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

import Product from "@/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

// export async function GET() {
//   try {
//     await dbConnect();

//     const products = await Product.find({})
//       .sort({ createdAt: -1 })
//       .select("-description -short_description") // ❌ exclude these fields
//       .populate("brand_id", "name logo")
//       .populate("category", "name")
//       .populate("tag_id", "name")
//       .populate("attributes", "name values")
//       .populate("media");

//     console.log("products ===>", products);
//     return NextResponse.json(products);
//   } catch (error) {
//     console.log("GET PRODUCT ERROR:", error);

//     return NextResponse.json(
//       {
//         message: "Error fetching products",
//         error: error.message,
//       },
//       { status: 500 },
//     );
//   }
// }

import ProductVariant from "@/models/ProductVariant";

export async function GET() {
  try {
    await dbConnect();

    // ✅ 1. fetch products

    // ✅ Get session
    const session = await getServerSession(authOptions);

    console.log("👤 Session:", session);

    if (!session?.user?._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const storeId = session.user._id.toString();

    const products = await Product.find({ store_id: storeId })
      .sort({ createdAt: -1 })
      .select("-description -short_description")
      .populate("brand_id", "name logo")
      .populate("category", "name")
      .populate("tag_id", "name")
      .populate("attributes", "name values")
      .populate("media")
      .lean(); // 🔥 important for performance

    // ✅ 2. get product IDs
    const productIds = products.map((p) => p._id);

    // ✅ 3. fetch all variants for these products
    const variants = await ProductVariant.find({
      product: { $in: productIds },
    })
      .populate("attributes.attribute", "name")
      .populate("media")
      .lean();

    // ✅ 4. group variants by productId
    const variantMap = {};

    variants.forEach((v) => {
      const key = v.product.toString();

      if (!variantMap[key]) {
        variantMap[key] = [];
      }

      variantMap[key].push(v);
    });

    // ✅ 5. attach variants to products
    const finalProducts = products.map((p) => ({
      ...p,
      variants: variantMap[p._id.toString()] || [],
    }));

    console.log(" vendors  finalProducts==>", finalProducts);
    return NextResponse.json(finalProducts);
  } catch (error) {
    console.log("GET PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        message: "Error fetching products",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// ================= CREATE PRODUCT =================
export async function POST(req) {
  try {
    await dbConnect();
    // ✅ Get session
    const session = await getServerSession(authOptions);

    console.log("👤 Session:", session);

    if (!session?.user?._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const storeId = session.user._id.toString();

    const body = await req.json();

    // ================= VALIDATION =================
    if (!body.name) {
      return NextResponse.json(
        { message: "Product name is required" },
        { status: 400 },
      );
    }

    // ================= SLUG CLEAN =================
    const slugify = (text = "") =>
      text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    const baseSlug = body.slug || slugify(body.name);

    let finalSlug = baseSlug;
    let count = 1;

    while (await Product.findOne({ slug: finalSlug })) {
      finalSlug = `${baseSlug}-${count++}`;
    }

    // ================= SANITIZE DATA =================
    const price = Number(body.price) || 0;
    const specialPrice = Number(body.special_price) || 0;
    const qty = Number(body.qty) || 0;

    // ================= CREATE PRODUCT =================
    const product = await Product.create({
      name: body.name,
      slug: finalSlug,

      price,
      special_price: specialPrice,

      sku: body.sku || "",

      description: body.description || "",
      short_description: body.short_description || "",

      qty,
      manage_stock: body.manage_stock ?? true,
      in_stock: qty > 0,

      status: body.status || "draft", // 🔥 added

      store_id: storeId || null,
      brand_id: body.brand_id || null,

      tag_id: Array.isArray(body.tag_id) ? body.tag_id : [],
      category: Array.isArray(body.category) ? body.category : [],

      attributes: Array.isArray(body.attributes) ? body.attributes : [],
      customAttributes: body.customAttributes || {},
      // 🔥 SELECT / COLOR (NEW FIX)
      attributeValues: body.attributeValues || {},
      media: Array.isArray(body.media) ? body.media : [],
    });

    console.log("product==>--------------", product);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.log("CREATE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        message: "Error creating product",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
