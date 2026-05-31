// // app/api/products/[slug]/route.js

// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import Product from "@/models/Product";

// export async function GET(req, { params }) {
//   try {
//     await dbConnect();

//     const { slug } =  await params

//     // 🔥 Find product by slug
//     const product = await Product.findOne({
//       slug,
//       status: "active",
//     })
//       .populate("media")
//       .populate("brand_id")
//       .populate("category")
//       .populate("store_id")
//       .lean();

//     // ❌ Product not found
//     if (!product) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Product not found",
//         },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       product,
//     });
//   } catch (error) {
//     console.log(error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Server error",
//       },
//       { status: 500 },
//     );
//   }
// }


import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Product from "@/models/Product";

import ProductVariant from "@/models/ProductVariant";

import "@/models/Media";
import "@/models/Brand";
import "@/models/Store";
import "@/models/Category";
import "@/models/Attribute";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { slug } = await params;

    // 🔥 PRODUCT
    const product = await Product.findOne({
      slug,
     // status: "active",
    })
      .populate("media")
      .populate("brand_id")
      .populate("category")
      .populate("store_id")
      .lean();

    // ❌ PRODUCT NOT FOUND
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    // 🔥 VARIANTS
    const variants = await ProductVariant.find({
      product: product._id,
     // status: "active",
    })
      .populate("media")
      .populate("attributes.attribute")
      .lean();

    
     console.log({
      success: true,
      product,
      variants,
    })
    
    return NextResponse.json({
      success: true,
      product,
      variants,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}