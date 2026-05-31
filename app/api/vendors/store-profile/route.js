import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Store from "@/models/Store";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

// ================= GET STORE PROFILE =================
export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const store = await Store.findOne({
      seller_id: session.user._id,
    });

    return NextResponse.json(store || {});
  } catch (error) {
    console.log("GET STORE PROFILE ERROR:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

// ================= UPDATE STORE PROFILE =================
export async function PUT(req) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      name,
      email,
      phone,
      logo,
      banner,
      short_description,
      long_description,
    } = body;

    // ✅ Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and Email are required" },
        { status: 400 }
      );
    }

    let store = await Store.findOne({
      seller_id: session.user._id,
    });

    // ✅ Create store if not exists
    if (!store) {
      store = new Store({
        seller_id: session.user._id,
      });
    }

    // ✅ Update fields
    store.name = name;
    store.email = email;
    store.phone = phone;
    store.logo = logo;
    store.banner = banner;
    store.short_description = short_description;
    store.long_description = long_description;

    await store.save();

    return NextResponse.json({
      success: true,
      message: "Store profile updated successfully",
      data: store,
    });

  } catch (error) {
    console.log("UPDATE STORE PROFILE ERROR:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}