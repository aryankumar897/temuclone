import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // 🔥 USER
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔥 ADDRESS
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    // 🔥 ORDER ITEMS
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        variant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductVariant",
        },

        quantity: Number,

        price: Number,

        special_price: Number,

        total: Number,
      },
    ],

    // 🔥 TOTALS
    subtotal: Number,

    discount: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    shipping_charge: {
      type: Number,
      default: 0,
    },

    total_amount: Number,

    // 🔥 COUPON
    coupon: {
      code: String,

      discount_amount: Number,
    },

    // 🔥 PAYMENT
    payment_method: {
      type: String,

      enum: ["paypal", "stripe", "razorpay"],
    },

    payment_status: {
      type: String,

      enum: ["pending", "paid", "failed"],

      default: "pending",
    },

    payment_id: String,

    transaction_id: String,

    // 🔥 ORDER STATUS
    order_status: {
      type: String,

      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],

      default: "pending",
    },

    // 🔥 ORDER NUMBER
    order_number: {
      type: String,

      unique: true,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
