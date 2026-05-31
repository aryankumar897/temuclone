// models/Attribute.js
import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema(
  {
    name: {
      type: String, // Color, Size, RAM
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      enum: ["text", "number", "color", "select"],
      default: "text",
    },

    values: [
      {
        value: { type: String }, // Red
        label: { type: String }, // Red (display)
      },
    ],

    isVariant: {
      type: Boolean,
      default: true, // used in variant or not
    },
  },
  { timestamps: true },
);

export default mongoose.models.Attribute ||
  mongoose.model("Attribute", attributeSchema);
