import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    position: {
      type: Number,
      default: 0,
    },
    image: {
      type: String, // store URL (cloudinary / s3)
      default: "",
    },

    filterAttributes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute",
      },
    ],
    is_active: {
      type: Boolean,
      default: true,
    },
  },

  { timestamps: true },
);

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
