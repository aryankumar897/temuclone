import dbConnect from "@/utils/dbConnect";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
import  mongoose from "mongoose"
// Helper function to get category depth (0 = root, 1 = subcategory, 2 = child, 3+ = blocked)
async function getCategoryDepth(categoryId, depth = 0) {
  if (!categoryId) return depth;

  const category = await Category.findById(categoryId);
  if (!category) return depth;

  // If no parent, return current depth
  if (!category.parent_id) {
    return depth;
  }

  // Recursively check parent
  return getCategoryDepth(category.parent_id, depth + 1);
}

// GET all categories
export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find()
      .sort({ position: 1 })
      .populate("filterAttributes");
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// POST create new category
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    // ================= VALIDATE + REMOVE DUPLICATES =================
    if (body.filterAttributes?.length) {
      const validIds = body.filterAttributes.filter((id) =>
        mongoose.Types.ObjectId.isValid(id),
      );

      body.filterAttributes = [...new Set(validIds)];
    }

    // Check if slug already exists
    const existingCategory = await Category.findOne({ slug: body.slug });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: "Slug already exists" },
        { status: 400 },
      );
    }

    // Enforce 3-level nesting restriction (Category → Subcategory → Child)
    if (body.parent_id) {
      const parentDepth = await getCategoryDepth(body.parent_id);
      console.log(
        "Parent Depth:",
        parentDepth,
        "For Parent ID:",
        body.parent_id,
      );

      // Allow:
      // - Depth 0 (Root Category) -> Can create Subcategory (Level 1)
      // - Depth 1 (Subcategory) -> Can create Child (Level 2)
      // - Depth 2 (Child) -> Cannot create more (Blocked)
      if (parentDepth >= 2) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Cannot create category under a child category. Maximum nesting is 3 levels (Category → Subcategory → Child).",
          },
          { status: 400 },
        );
      }
    }

    // Get position for new category
    let position = body.position;
    if (!position && position !== 0) {
      const siblings = await Category.find({
        parent_id: body.parent_id || null,
      });
      position = siblings.length;
    }

    const category = await Category.create({
      ...body,
      position,
      parent_id: body.parent_id || null,
    });


 // ================= POPULATE =================
    const populatedCategory = await Category.findById(
      category._id
    ).populate("filterAttributes");

    return NextResponse.json(
      {
        success: true,
        data: populatedCategory,
      },
      { status: 201 }
    );


    // return NextResponse.json(
    //   { success: true, data: category },
    //   { status: 201 },
    // );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
