import { NextResponse } from "next/server";
import mongoose from "mongoose";

import dbConnect from "@/utils/dbConnect";
import Store from "@/models/Store";

// ================= GET SINGLE STORE =================
export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid store ID" },
        { status: 400 }
      );
    }

    const store = await Store.findById(id).populate("seller_id");

    if (!store) {
      return NextResponse.json(
        { message: "Store not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(store);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching store", error: error.message },
      { status: 500 }
    );
  }
}

// ================= UPDATE STORE =================
export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid store ID" },
        { status: 400 }
      );
    }

    // 🔥 Prevent duplicate name/email
    if (body.name || body.email) {
      const existing = await Store.findOne({
        $or: [
          { name: body.name },
          { email: body.email }
        ],
        _id: { $ne: id },
      });

      if (existing) {
        return NextResponse.json(
          { message: "Store name or email already in use" },
          { status: 400 }
        );
      }
    }

    const updatedStore = await Store.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json(updatedStore);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating store", error: error.message },
      { status: 500 }
    );
  }
}

// ================= DELETE STORE =================
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid store ID" },
        { status: 400 }
      );
    }

    await Store.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Store deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting store", error: error.message },
      { status: 500 }
    );
  }
}