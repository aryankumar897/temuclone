import mongoose from "mongoose";

const productRatingSchema = new mongoose.Schema(
  {
    // USER
    user_id: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    // PRODUCT
    product_id: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Product",

      required: true,
    },

    // ORDER
    order_id: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Order",
    },

    // RATING
    rating: {
      type: Number,

      required: true,

      min: 1,

      max: 5,
    },

    // TITLE
    title: {
      type: String,

      trim: true,

      maxlength: 120,
    },

    // REVIEW
    review: {
      type: String,

      trim: true,

      maxlength: 2000,
    },

    // MEDIA
    media: [
      {
        type: String,
      },
    ],

    // VERIFIED PURCHASE
    verified_purchase: {
      type: Boolean,

      default: true,
    },

    // STATUS
    status: {
      type: String,

      enum: ["pending", "approved", "rejected"],

      default: "approved",
    },

    // HELPFUL COUNT
    helpful_count: {
      type: Number,

      default: 0,
    },

    // HELPFUL USERS
    helpful_by: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "User",
      },
    ],

    // SELLER REPLY
    seller_reply: {
      message: String,

      replied_at: Date,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.models.ProductRating ||
  mongoose.model("ProductRating", productRatingSchema);
