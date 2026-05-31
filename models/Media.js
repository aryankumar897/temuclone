// models/Media.js
import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },

    public_id: {
      type: String, // cloudinary / s3 id
    },

    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },

    format: String, // jpg, png, mp4

    size: Number, // file size in bytes
  },
  { timestamps: true },
);

export default mongoose.models.Media || mongoose.model("Media", mediaSchema);
