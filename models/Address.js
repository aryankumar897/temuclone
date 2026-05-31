// models/Address.js

import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    // User Reference
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Full Name
    full_name: {
      type: String,
      required: true,
      trim: true,
    },

    // Mobile Number
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // Alternative Phone (optional)
    alternate_phone: {
      type: String,
      trim: true,
      default: "",
    },

    // Pincode / ZIP
    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    // House / Flat / Building
    address_line_1: {
      type: String,
      required: true,
      trim: true,
    },

    // Area / Street / Landmark
    address_line_2: {
      type: String,
      trim: true,
      default: "",
    },

    // Landmark
    landmark: {
      type: String,
      trim: true,
      default: "",
    },

    // City
    city: {
      type: String,
      required: true,
      trim: true,
    },

    // State
    state: {
      type: String,
      required: true,
      trim: true,
    },

    // Country
    country: {
      type: String,
      required: true,
      default: "India",
    },

    // Address Type
    address_type: {
      type: String,
      enum: ["home", "work", "other"],
      default: "home",
    },

    // Default Address
    is_default: {
      type: Boolean,
      default: false,
    },

    // Delivery Instructions
    delivery_note: {
      type: String,
      trim: true,
      default: "",
    },

    // Active / Deleted
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Address ||
  mongoose.model("Address", addressSchema);
