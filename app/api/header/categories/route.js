import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/Category";
import Product from "@/models/Product";

export async function GET() {
  try {
    await dbConnect();

    // 🔥 Get all active categories
    const allCategories = await Category.find({
      is_active: true,
    })
      .sort({ position: 1 })
      .lean();

    // 🔥 Build parent → children structure
    const parents = allCategories.filter(
      (cat) => !cat.parent_id
    );

    const categories = parents.map((parent) => {
      const children = allCategories.filter(
        (cat) =>
          String(cat.parent_id) === String(parent._id)
      );

      return {
        ...parent,
        children: children.map((child) => ({
          _id: child._id,
          name: child.name,
          slug: child.slug,
          image: child.image || "",
        })),
      };
    });

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.log("CATEGORY API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}