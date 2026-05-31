import mongoose from "mongoose";
    import User from "./User"
const kycSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // ✅ better than separate index
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true, // ✅ faster filtering
    },

    rejected_reason: {
      type: String,
      default: "",
    },

    full_name: {
      type: String,
      required: true,
      trim: true,
    },

    date_of_birth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    full_address: {
      type: String,
      required: true,
    },

    document_type: {
      type: String,
      enum: ["aadhar", "pan", "passport"],
      required: true,
    },

    document_number: {
      type: String,
      required: true,
      unique: true,
    },

    document_scan_copy: {
      type: String,
      required: true,
    },

    verified_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Kyc || mongoose.model("Kyc", kycSchema);