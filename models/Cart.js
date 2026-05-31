import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    // 🔥 PRODUCT
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // 🔥 VARIANT
    variant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: true,
    },

    // 🔥 QUANTITY
    quantity: {
      type: Number,
      default: 1,
    },

    // 🔥 PRICE SNAPSHOT
    price: Number,

    special_price: Number,
  },
  { _id: false },
);

const cartSchema = new mongoose.Schema(
  {
    // 🔥 USER
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // 🔥 ITEMS
    items: [cartItemSchema],

    // 🔥 COUPON
    coupon: {
      code: {
        type: String,
        default: "",
      },

      discount_amount: {
        type: Number,
        default: 0,
      },

      final_total: {
        type: Number,
        default: 0,
      },
    },

    // 🔥 SELECTED ADDRESS
    address: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Address",

      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
