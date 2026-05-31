import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    // 🔗 Parent Product
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    // 🔥 Attribute + Selected Value
    attributes: [
      {
        attribute: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Attribute",
          required: true,
        },
        value: {
          type: String, // "m", "red", "xl"
          required: true,
        },
      },
    ],

    // 🔑 Unique SKU per variant
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // 💰 Pricing
    price: {
      type: Number,
      required: true,
    },
    special_price: {
      type: Number,
      default: 0,
    },

    // 📦 Inventory
    stock: {
      type: Number,
      default: 0,
    },
    in_stock: {
      type: Boolean,
      default: true,
    },

    // 🖼 Media (optional per variant)
    media: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
      },
    ],

    // ⭐ Default variant
    // isDefault: {
    //   type: Boolean,
    //   default: false,
    // },

    // 🔄 Status
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true },
);

// 🔥 Prevent duplicate combinations (IMPORTANT)
variantSchema.index(
  {
    product: 1,
    attributes: 1,
  },
  { unique: true },
);

export default mongoose.models.ProductVariant ||
  mongoose.model("ProductVariant", variantSchema);
