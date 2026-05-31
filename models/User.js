import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    user_type: {
      type: String,
      enum: ["customer", "vendor", "admin"],
      default: "customer",
    },

    phone: {
      type: String,
      default: "",
    },

    kyc_status: {
      type: String,
      enum: ["not_submitted", "pending", "approved", "rejected"],
      default: "not_submitted", // ✅ better UX
    },

    profile_image: {
      type: String, // Cloudinary URL
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", userSchema);
