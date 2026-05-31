import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Product from "@/models/Product";
import Category from "@/models/Category";
import Attribute from "@/models/Attribute";

import "@/models/Media";
import "@/models/Brand";
import "@/models/Store";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const categorySlug =
      searchParams.get("cat");

    if (!categorySlug) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Category slug is required",
        },
        { status: 400 },
      );
    }

    /* =========================
       CATEGORY
    ========================= */
    const category =
      await Category.findOne({
        slug: categorySlug,
        is_active: true,
      }).populate("filterAttributes");

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        { status: 404 },
      );
    }

    /* =========================
       ALL ATTRIBUTES
    ========================= */
    const allAttributes =
      await Attribute.find().lean();

    /* =========================
       ATTRIBUTE MAP
    ========================= */
    const attributeMap = {};

    allAttributes.forEach((attr) => {
      attributeMap[attr._id.toString()] =
        attr.slug.toLowerCase();
    });

    /* =========================
       PRODUCTS
    ========================= */
    const products = await Product.find({
      category: category._id,
      status: "active",
    })
      .populate("media")
      .populate("brand_id", "name")
      .lean();

    /* =========================
       FORMAT PRODUCTS
    ========================= */
    const formattedProducts =
      products.map((p) => {
        let formattedAttributes =
          {};

        /* =========================
           CONVERT ATTRIBUTE IDS
           TO ATTRIBUTE SLUGS
        ========================= */
        if (p.attributeValues) {
          Object.entries(
            p.attributeValues,
          ).forEach(
            ([attributeId, values]) => {
              const slug =
                attributeMap[
                  attributeId
                ];

              if (slug) {
                formattedAttributes[
                  slug
                ] = values;
              }
            },
          );
        }

        return {
          _id: p._id,

          title: p.name,

          slug: p.slug,

          description:
            p.short_description ||
            p.description ||
            "",

          price: `$${
            p.special_price ||
            p.price
          }`,

          old: p.special_price
            ? `$${p.price}`
            : null,

          sold: `${
            p.viewed || 0
          }+ sold`,

          brand:
            p.brand_id?.name || "",

          rating:
            p.average_rating || 0,

          img:
            p.media?.[0]?.url ||
            p.media?.[0]?.path ||
            "/placeholder.png",

          gallery: p.media || [],

          /* =========================
             FINAL ATTRIBUTES
          ========================= */
          attributes:
            formattedAttributes,

          in_stock: p.in_stock,

          badge1: "Easter Deal",

          badge2: p.in_stock
            ? "Local"
            : "",

          timer: "01:41:13",

          saved: "$0.11",
        };
      });

    /* =========================
       DYNAMIC FILTERS
    ========================= */
    const dynamicFilters = {};

    category.filterAttributes.forEach(
      (attr) => {
        dynamicFilters[
          attr.slug.toLowerCase()
        ] =
          attr.values?.map(
            (v) => v.value,
          ) || [];
      },
    );

    /* =========================
       RESPONSE
    ========================= */
//  console.log(JSON.stringify({
//       success: true,

//       category,

//       filters: dynamicFilters,

//       products: formattedProducts,
//     } , null ,4))

    return NextResponse.json({
      success: true,

      category,

      filters: dynamicFilters,

      products: formattedProducts,
    });
  } catch (error) {
    console.log(
      "CATEGORY PRODUCTS ERROR",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

