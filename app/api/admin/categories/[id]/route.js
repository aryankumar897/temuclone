import dbConnect from "@/utils/dbConnect";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
import  mongoose from "mongoose"
// Helper function to get category depth
async function getCategoryDepth(categoryId, depth = 0) {
  if (!categoryId) return depth;

  const category = await Category.findById(categoryId);
  if (!category) return depth;

  if (!category.parent_id) {
    return depth;
  }

  return getCategoryDepth(category.parent_id, depth + 1);
}

// GET single category
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const category = await Category.findById(id).populate("filterAttributes");

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// PUT update category
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id } = await params;

    // ================= VALIDATE + REMOVE DUPLICATES =================
    if (body.filterAttributes?.length) {
      const validIds = body.filterAttributes.filter((id) =>
        mongoose.Types.ObjectId.isValid(id),
      );

      body.filterAttributes = [...new Set(validIds)];
    }

    // Check if slug exists for other categories
    if (body.slug) {
      const existingCategory = await Category.findOne({
        slug: body.slug,
        _id: { $ne: id },
      });
      if (existingCategory) {
        return NextResponse.json(
          { success: false, error: "Slug already exists" },
          { status: 400 },
        );
      }
    }

    // Enforce 3-level nesting restriction on update
    if (body.parent_id) {
      const parentDepth = await getCategoryDepth(body.parent_id);

      // Allow depth 0 and 1 as parents, block depth 2 and above
      if (parentDepth >= 2) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Cannot move category under a child category. Maximum nesting is 3 levels (Category → Subcategory → Child).",
          },
          { status: 400 },
        );
      }
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { ...body, parent_id: body.parent_id || null },
      { new: true, runValidators: true },
    ).populate("filterAttributes");

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// DELETE category and its children
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    // Delete all children recursively
    const deleteChildren = async (parentId) => {
      const children = await Category.find({ parent_id: parentId });
      for (const child of children) {
        await deleteChildren(child._id);
        await Category.findByIdAndDelete(child._id);
      }
    };

    await deleteChildren(id);
    await Category.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
