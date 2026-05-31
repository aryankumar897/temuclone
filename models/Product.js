import mongoose from "mongoose";

import User from "./User";

import Store from "./Store";
import Brand from "./Brand";

import Category from "./Category";
import Attribute from "./Attribute";
import Media from "./Media";
import Tag from "./Tag";

const productSchema = new mongoose.Schema(
  {
    store_id: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
    brand_id: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    tag_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    product_type: {
      type: String,
      enum: ["physical", "virtual"],
      default: "physical",
    },

    name: String,
    slug: String,
    price: Number,
    special_price: Number,
    description: String,
    short_description: String,

    sku: String,
    manage_stock: Boolean,
    qty: Number,
    in_stock: Boolean,

    viewed: Number,

    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "draft",
    },

    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

    // 🔥 NON-VARIANT ATTRIBUTE VALUES
    customAttributes: {
      type: Map,
      of: String, // example: { warranty: "1 year" }
    },

    // 🔥 Global attributes used in this product
    attributes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute",
      },
    ],

    attributeValues: {
      type: Map,
      of: [String], // example: { color: ["red", "blue"] }
    },

    // 🔥 Product-level media
    media: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
      },
    ],

    average_rating: {
      type: Number,
      default: 0,
    },

    total_reviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
