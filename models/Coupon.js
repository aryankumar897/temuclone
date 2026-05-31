
// models/Coupon.js

import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    // Coupon Code
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    // Discount Type
    // percentage or fixed
    discount_type: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },

    // Discount Value
    // Example:
    // 20 => 20% OR ₹20
    discount_value: {
      type: Number,
      required: true,
    },

    // Max Discount
    // Example:
    // 20% off upto ₹100
    max_discount: {
      type: Number,
      default: 0,
    },

    // Minimum Order Amount
    minimum_order_amount: {
      type: Number,
      default: 0,
    },

    // Expiry Date
    expires_at: {
      type: Date,
      required: true,
    },

    // Usage Limit
    usage_limit: {
      type: Number,
      default: 1,
    },

    // Current Usage Count
    used_count: {
      type: Number,
      default: 0,
    },

    // One User Usage Limit
    per_user_limit: {
      type: Number,
      default: 1,
    },

    // Users who used coupon
    used_by: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        count: {
          type: Number,
          default: 1,
        },
      },
    ],

    // Active or Not
    is_active: {
      type: Boolean,
      default: true,
    },

    // Optional Description
    description: {
      type: String,
      trim: true,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.models.Coupon ||
  mongoose.model("Coupon", couponSchema);

